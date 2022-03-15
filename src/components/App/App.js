import React from 'react';
import { Route, Routes, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Home from '../Home/Home';
import SavedArticles from '../SavedArticles/SavedArticles';
import Footer from '../Footer/Footer.js';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import SignupSuccess from '../SignupSuccess/SignupSuccess';
import newsApi from '../../utils/NewsApi';
// import * as mainApi from '../../utils/MainApi';
import mainApi from '../../utils/MainApi';

import './App.css';

function App() {
//  const history = useHistory();
  //useStates
  const [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isSignupSuccessOpen, setSignupSuccessOpen] = React.useState(false);
  const [isNewsCardBtnHover, setNewsCardBtnHover] = React.useState(false);
  const [isNavMobileOpen, setIsNavMobileOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  // const [cards, setCards] = React.useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  const [cards, setCards] = React.useState([]);
  const [keyWord, setKeyWord] = React.useState("");
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [isArticlesOpen, setIsArticlesOpen] = React.useState(false);
  const [isLoaderOpen, setIsLoaderOpen] = React.useState(false);
  const [isNothingFoundOpen, setIsNothingFoundOpen] = React.useState(false);
  const [isErrMessageOpen, setIsErrMessageOpen] = React.useState(false);

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
    e.preventDefault();
    setIsSignUpPopupOpen(false);
    setSignupSuccessOpen(true);
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    setIsSignInPopupOpen(false);
  }

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
                if(article.title == cardTmp.title) {
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
    // if (loggedIn) {

        mainApi.addArticle(card, keyWord)
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
      
    // } else {
    //   setIsLoginPopupOpen(true);
    // }
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

  function closeAllPopups() {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setSignupSuccessOpen(false);
    setNewsCardBtnHover(false);
    // setIsNavMobileOpen(false);
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
      setKeyWord(localStorage.getItem("keyword"));
    }
  }, []);

  return (
    <div className='app'>
      <div className="app__container">
        <Header
          onSignInClick={handleSignInClick}
          onOpenNavClick={handleOpenNavClick}
          isNavOpen={isNavMobileOpen}
          onNavClose={handleSavedArticlesClick}

        />
        <Routes>
          <Route path='/' element={<Home
            isHover={isNewsCardBtnHover}
            onNewsCardBtnHover={handleNewsCardBtnHover}
            onNewsCardBtnClose={closeAllPopups}
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
          />} />
          {/* <Route  path='/'>
            <Home />
          </Route> */}
          <Route path='/saved-articles' element={<SavedArticles
            isHover={isNewsCardBtnHover}
            onNewsCardBtnHover={handleNewsCardBtnHover}
            onNewsCardBtnClose={closeAllPopups}
            cards={savedArticles}
            handleSaveCardClick={handleSaveCardClick}
          />}>
            {/* <SavedArticles /> */}
          </Route>
        </Routes>
        <Footer />
      </div>
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSignInSubmit}
        onSignUpClick={handleSignUpClick}
      />
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSignupSuccessClick}
        onSignInClick={handleSignInClick}

      />
      <SignupSuccess
        isOpen={isSignupSuccessOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
      />
    </div>


  );
}

export default App;
