import './SavedArticles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsCards from '../SavedNewsCards/SavedNewsCards';

function SavedArticles(props) {
    return (
        <main className='saved-articles'>
            <SavedNewsHeader />
            {/* <NewsCardList
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
            /> */}
            <SavedNewsCards
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
                cards={props.cards}
            />
        </main>
    );
};

export default SavedArticles;

