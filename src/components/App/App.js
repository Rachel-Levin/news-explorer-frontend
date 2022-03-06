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

import './App.css';

function App() {

  //useStates
  const [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isSignupSuccessOpen, setSignupSuccessOpen] = React.useState(false);
  const [isNewsCardBtnHover, setNewsCardBtnHover] = React.useState(false);
  const [isNavMobileOpen, setIsNavMobileOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

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
    newsApi
      .getInitialNews(keyword)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className='app'>
      <div className="app__container">
        <Header
          onSignInClick={handleSignInClick}
          onOpenNavClick={handleOpenNavClick}
          isNavOpen={isNavMobileOpen}
          onNavClose={handleNavClose}

        />
        <Routes>
          <Route path='/' element={<Home
            isHover={isNewsCardBtnHover}
            onNewsCardBtnHover={handleNewsCardBtnHover}
            onNewsCardBtnClose={closeAllPopups}
            onSearchSubmit={handleSearchSubmit}
            keyword={keyword}
            handleChange={handleKeywordChange}
          />} />
          {/* <Route  path='/'>
            <Home />
          </Route> */}
          <Route path='/saved-articles' element={<SavedArticles
            isHover={isNewsCardBtnHover}
            onNewsCardBtnHover={handleNewsCardBtnHover}
            onNewsCardBtnClose={closeAllPopups}
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
