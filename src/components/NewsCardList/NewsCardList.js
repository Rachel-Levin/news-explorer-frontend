import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useLocation } from 'react-router-dom';
// import NewsCardListBtn from '../NewsCardListBtn/NewsCardListBtn';

function NewsCardList(props) {
    const [count, setCount] = React.useState(3);
    const [btnAble, setBtnAble] = React.useState(true);
  
    function handleClickMoreArticles() {
      if (count < props.cards.length) {
        setCount(count + 3);
      } else {
        setBtnAble(false);
      }
    }

    const location = useLocation();
    return (
        <section className={`${location.pathname === "/"
            ? ""
            : "newscard-list__save"
            }`}>
            <ul className="newscard-list">
                {props.cards.slice(0, count).map((cardItem, i) => (
                    <NewsCard
                        key={i}
                        card={cardItem}
                        isHover={props.isHover}
                        onNewsCardBtnHover={props.onNewsCardBtnHover}
                        onNewsCardBtnClose={props.onNewsCardBtnClose}
                        addArticle={props.addArticle}
                        handleSaveCardClick={props.handleSaveCardClick}
                        openSignInPopup ={props.openSignInPopup}
                        loggedIn ={props.loggedIn}
                    />))}

                {/* <NewsCard 
                    isHover = {props.isHover}
                    onNewsCardBtnHover = {props.onNewsCardBtnHover}
                    onNewsCardBtnClose={props.onNewsCardBtnClose}
                />                
                <NewsCard 
                    isHover = {props.isHover}
                    onNewsCardBtnHover = {props.onNewsCardBtnHover}
                    onNewsCardBtnClose={props.onNewsCardBtnClose}
            /> */}
            </ul>
            {
                location.pathname === "/" && (
                    <button className="newscard-list__btn"
                    // className={`newscard-list__btn ${
                    //     btnAble ? "" : "newscard-list__btn-disabled"
                    //   }`}
                    onClick={handleClickMoreArticles}
                    disabled={!btnAble}
                    >Show more</button>
                    )
            }
        </section>
    );
};

export default NewsCardList;
