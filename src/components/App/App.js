import React from 'react';
import { Route, Routes, Redirect, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import Home from '../Home/Home';
import SavedArticles from '../SavedArticles/SavedArticles';
import Footer from '../Footer/Footer.js';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import SignupSuccess from '../SignupSuccess/SignupSuccess';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedArticlesContext } from "../../contexts/SavedArticlesContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import newsApi from '../../utils/NewsApi';
// import * as mainApi from '../../utils/MainApi';
import mainApi from '../../utils/MainApi';

import './App.css';

function App() {
  const history = useNavigate();
  //useStates
  const [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isSignupSuccessOpen, setSignupSuccessOpen] = React.useState(false);
  const [isNewsCardBtnHover, setNewsCardBtnHover] = React.useState(false);
  const [isNavMobileOpen, setIsNavMobileOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  // const [cards, setCards] = React.useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  const [cards, setCards] = React.useState([]);
  // const [keyWord, setKeyWord] = React.useState('');
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [isArticlesOpen, setIsArticlesOpen] = React.useState(false);
  const [isLoaderOpen, setIsLoaderOpen] = React.useState(false);
  const [isNothingFoundOpen, setIsNothingFoundOpen] = React.useState(false);
  const [isErrMessageOpen, setIsErrMessageOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("jwt"));
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isloggedIn, setIsloggedIn] = React.useState(localStorage.getItem("isloggedIn"));

  //useEffects
  React.useEffect(() => {
    if (token) {
      mainApi.getUserInfo(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  //handlers
  function handleSignInClick() {
    setIsSignInPopupOpen(true);
    setIsSignUpPopupOpen(false);
    setSignupSuccessOpen(false);
    setIsNavMobileOpen(false);
  }

  function handleSignUpClick() {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(true);
  }

  function handleSignupSuccessClick(e) {
    // e.preventDefault();
    setIsSignUpPopupOpen(false);
    setSignupSuccessOpen(true);
  }

  // function handleSignInSubmit(e) {
  //   e.preventDefault();
  //   setIsSignInPopupOpen(false);
  // }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    setIsSignUpPopupOpen(false);
  }

  function handleNewsCardBtnHover(e) {
    e.preventDefault();
    setNewsCardBtnHover(true);
  }

  function handleOpenNavClick(e) {
    // e.preventDefault();
    setIsNavMobileOpen(!isNavMobileOpen);
  }

  function handleNavClose(e) {
    setIsNavMobileOpen(false);
  }

  function handleSearchSubmit(keyword, e) {
    // e.preventDefault();
    setKeyword(keyword);
    localStorage.setItem("keyword", keyword);
    setIsLoaderOpen(true);
    setIsArticlesOpen(true);

    newsApi
      .getInitialNews(keyword)
      .then((cards) => {

        if (cards.articles.length > 0) {

          mainApi.getAllArticles('')
            .then((res) => {
              res.forEach(article => {
                cards.articles.forEach(cardTmp => {
                  if (article.title == cardTmp.title) {
                    cardTmp.saved = true;
                    article.saved = true;
                    cardTmp._id = article._id;
                  }
                });
              });
              setSavedArticles(res);
            })

          setCards(cards.articles);
          localStorage.setItem("cards", JSON.stringify(cards));
          setIsLoaderOpen(false);
        } else {
          setIsLoaderOpen(false);
          setIsNothingFoundOpen(true);
        }
      }
      )
      .catch((err) => {
        setIsErrMessageOpen(true);
      });
  }

  function deleteArticle(card) {
    console.log(card);
    mainApi.deleteArticle(card._id)
      .then(() => {
        setSavedArticles((state) => state.filter((c) => c._id !== card._id));
        setCards((state) =>
          state.map((c) =>
            c.title === card.title ? { ...c, saved: "false" } : c,
          ),
        );
      })
      .catch((err) => console.log(err));
  }
  // function handleAddArticle(card) {
  //   mainApi.addArticle(card, keyWord)
  //         .then((newCard) => {
  //           setSavedNews([...savedNews, newCard.data]);
  //           setCards((state) =>
  //             state.map((c) =>
  //               c.title === card.title ? { ...c, saved: "true" } : c,
  //             ),
  //           );
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } else {
  //     setIsLoginPopupOpen(true);
  //   }
  // }
  function handleAddArticle(card) {
    if (loggedIn) {

      mainApi.addArticle(card, keyword, token)
        .then((newArticle) => {
          // setSavedArticles([...savedArticles, newArticle.card]);
          // setCards((state) =>
          //   state.map((c) =>
          //     c.title === card.title ? { ...c, saved: "true" } : c,
          //   ),
          // );
          card.saved = true;
          card._id = newArticle._id;
        })
        .catch((err) => console.log(err));

    } else {
      setIsSignInPopupOpen(true);
    }
  }

  function handleSavedArticlesClick() {
    setIsNavMobileOpen(false);
    getSavedArticles();
  }

  function handleSaveCardClick(card) {
    if (card.saved) {
      deleteArticle(card);
    } else {
      handleAddArticle(card);
    }
  }

  function getSavedArticles() {
    mainApi.getAllArticles('')
      .then((res) => {
        res.forEach(article => {
          article.saved = true;
        });
        setSavedArticles(res);
        // setLoggedInSavedNews(true);
        // setHomeActive(false);
        closeAllPopups();
        // history.push("/saved-news");
      })
      .catch((err) => console.log(err));
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  };

  function handleSubmitRegister(username, email, password, resetForm) {
    mainApi.register(email, password, username)
      .then((res) => {
        if (res) {
          handleSignupSuccessClick();
          console.log("Register success");
          // resetForm();
          // setEmailConflict(false);
        }
      })
      .catch((err) => {
        // if (err.includes(409)) {
        //   // setEmailConflict(true);
        // }
        console.log("Something went wrong.");
      });
  }

  function handleSubmitLogin(email, password, resetForm) {
    mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          // setLoggedIn(true);
          setIsloggedIn(localStorage.setItem("isloggedIn", true));
          closeAllPopups();
          // history.push("/");
          // resetForm();
          document.location.reload(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogOutClick() {
    localStorage.removeItem("jwt");
    setIsloggedIn(localStorage.removeItem("isloggedIn"));
    closeAllPopups();
    document.location.reload(true);
  }

  function closeAllPopups() {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setSignupSuccessOpen(false);
    // setIsNavMobileOpen(false);
  }

  function closeCardHoverPopup() {
    setNewsCardBtnHover(false);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("keyword")) {
      setKeyword(localStorage.getItem("keyword"));
    }
  }, []);

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app__container">
          <Header
            onSignInClick={handleSignInClick}
            onLogOutClick={handleLogOutClick}
            onOpenNavClick={handleOpenNavClick}
            isNavOpen={isNavMobileOpen}
            loggedIn={loggedIn}
            onNavClose={handleSavedArticlesClick}

          />
          <Routes>
            <Route path='/' element={<Home
              isHover={isNewsCardBtnHover}
              onNewsCardBtnHover={handleNewsCardBtnHover}
              onNewsCardBtnClose={closeCardHoverPopup}
              onSearchSubmit={handleSearchSubmit}
              keyword={keyword}
              handleChange={handleKeywordChange}
              cards={cards}
              isArticlesOpen={isArticlesOpen}
              isLoaderOpen={isLoaderOpen}
              isNothingFoundOpen={isNothingFoundOpen}
              isErrMessageOpen={isErrMessageOpen}
              addArticle={handleAddArticle}
              handleSaveCardClick={handleSaveCardClick}
              openSignInPopup ={handleSignInClick}
              loggedIn={isloggedIn}
            />} />
            {/* <Route  path='/'>
            <Home />
          </Route> */}
            <Route path='/saved-articles' element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedArticlesContext.Provider value={savedArticles}>
                  <SavedArticles
                    loggedIn={loggedIn}
                    isHover={isNewsCardBtnHover}
                    onNewsCardBtnHover={handleNewsCardBtnHover}
                    onNewsCardBtnClose={closeCardHoverPopup}
                    cards={savedArticles}
                    handleSaveCardClick={handleSaveCardClick}
                  />
                </SavedArticlesContext.Provider>
              </ProtectedRoute>
            }>
            </Route>

          </Routes>
          <Footer />
        </div>
        <SignInPopup
          isOpen={isSignInPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleSubmitLogin}
          onSignUpClick={handleSignUpClick}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeAllPopups}
          // onSubmit={handleSignupSuccessClick}
          onSubmit={handleSubmitRegister}
          onSignInClick={handleSignInClick}

        />
        <SignupSuccess
          isOpen={isSignupSuccessOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
        />
      </CurrentUserContext.Provider>
    </div>


  );
}

export default App;
