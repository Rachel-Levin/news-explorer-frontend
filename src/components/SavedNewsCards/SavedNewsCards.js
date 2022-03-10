import './SavedNewsCards.css';
import NewsCard from '../NewsCard/NewsCard';

function SavedNewsCards(props) {

    return (
        <section className='saved-news-cards'>
            <NewsCard 
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
                cards={props.cards}
            />
        </section>
    );
};

export default SavedNewsCards;
