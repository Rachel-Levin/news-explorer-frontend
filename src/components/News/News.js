import './News.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import NewsCardListBtn from '../NewsCardListBtn/NewsCardListBtn';
import Loader from '../Loader/Loader';
import NothingFound from '../NothingFound/NothingFound';
import ErrMessage from '../ErrMessage/ErrMessage';

function News({
    cards,
    isLoaderOpen,
    isArticlesOpen,
    isHover,
    onNewsCardBtnHover,
    onNewsCardBtnClose,
    isNothingFoundOpen,
    isErrMessageOpen,
    addArticle,
    handleSaveCardClick,
    openSignInPopup,
    loggedIn,
}) { 

    return (
        <div to='/' className='news'>
            {cards.length !== 0 && isArticlesOpen && (
                <>
                    <h2 className='main__title'>Search results</h2>
                    <NewsCardList
                        cards={cards}
                        isHover={isHover}
                        onNewsCardBtnHover={onNewsCardBtnHover}
                        onNewsCardBtnClose={onNewsCardBtnClose}
                        addArticle={addArticle}
                        handleSaveCardClick={handleSaveCardClick}
                        openSignInPopup ={openSignInPopup}
                        loggedIn = {loggedIn}
                    />
                </>
            )}
            {/* <NewsCardListBtn /> */}
            {isLoaderOpen && (
                <Loader />
            )}
            {/* {cards.length == 0 || isNothingFoundOpen && isArticlesOpen && ( */}
            {isNothingFoundOpen && isArticlesOpen && (

                <NothingFound />
            )}
            {isErrMessageOpen && isArticlesOpen && (
            <ErrMessage />
            )}
        </div>
    );
};

export default News;
