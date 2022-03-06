import './SavedArticles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedArticles(props) {
    return (
        <main className='saved-articles'>
            <SavedNewsHeader />
            <NewsCardList
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
            />
        </main>
    );
};

export default SavedArticles;

