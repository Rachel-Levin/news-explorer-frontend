// import React from 'react';
import './SavedArticles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsCards from '../SavedNewsCards/SavedNewsCards';
// import mainApi from '../../utils/MainApi';

function SavedArticles(props) {

    // const [savedCards, setSavedCards] = React.useState([]);

    // mainApi
    //   .getAllArticles('')
    //   .then((cards) => {
    //     setSavedCards(cards);
    //   }
    //   )
    //   .catch((err) => {
    //     // setIsErrMessageOpen(true);
    //   });

    return (
        <main className='saved-articles'>
            <SavedNewsHeader
                loggedIn={props.loggedIn}
            />
            {/* <NewsCardList
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
            /> */}
            <SavedNewsCards
                loggedIn={props.loggedIn}
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
                cards={props.cards}
                handleSaveCardClick={props.handleSaveCardClick}
            />
        </main>
    );
};

export default SavedArticles;

