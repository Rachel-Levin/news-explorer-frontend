import React from 'react';
import './SavedNewsHeader.css';
// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
// import Main from '../Main/Main';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedArticlesContext } from '../../contexts/SavedArticlesContext';

function SavedNewsHeader() {

    const currentUser = React.useContext(CurrentUserContext);
    const userSavedCards = React.useContext(SavedArticlesContext);
  
    const keywords = [];
  
    userSavedCards.forEach((element) => {
      keywords.push(element.keyword);
    });
  
    const counter = keywords.reduce(function (obj, val) {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {});
  
    const keywordsArr = Object.keys(counter).sort(function (a, b) {
      return counter[b] - counter[a];
    });
  
    const keywordsStr = keywordsArr.length > 3? `${keywordsArr.slice(0,3).toString(",")} and ${keywordsArr.length - 3} more...` : keywordsArr.toString(",");
  
    return (
        <section className='saved-news-header'>
            <h3 className='saved-news-header__title'>
            Saved articles
            </h3>
            <h2 className='saved-news-header__counter'>
            {currentUser.name.toUpperCase()}, 
            you have {userSavedCards.length} saved articles
            </h2>
            <p className='saved-news-header__by-keywords'>
            By keywords: 
            </p>
            <p className='saved-news-header__keywords'>
             {keywordsStr}
            </p>
        </section>
    );
};

export default SavedNewsHeader;