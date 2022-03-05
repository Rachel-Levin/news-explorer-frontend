import './SavedNewsHeader.css';
// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
// import Main from '../Main/Main';

function SavedNewsHeader() {
    return (
        <div className='saved-news-header'>
            <h3 className='saved-news-header__title'>
            Saved articles
            </h3>
            <h2 className='saved-news-header__counter'>
            Elise, you have 5 saved articles
            </h2>
            <section className='saved-news-header__by-keywords'>
            By keywords: 
            </section>
            <section className='saved-news-header__keywords'>
            Nature, Yellowstone, and 2 other
            </section>
        </div>
    );
};

export default SavedNewsHeader;