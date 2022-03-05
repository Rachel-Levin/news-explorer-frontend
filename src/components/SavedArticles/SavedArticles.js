import './SavedArticles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedArticles(props) {
    return (
        <div className='saved-articles'>
            <SavedNewsHeader />
            <NewsCardList
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
            />
        </div>
    );
};

export default SavedArticles;

