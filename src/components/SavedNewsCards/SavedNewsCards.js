import './SavedNewsCards.css';
import NewsCard from '../NewsCard/NewsCard';

function SavedNewsCards(props) {

    return (
        //    {props.cards.map.filter(cardItem.saved == true)((cardItem, i) => ( filter by cardItem.saved == true
        <section className='saved-news-cards'>
            {props.cards.filter(cardItem => cardItem.saved == true).map((cardItem, i) => (
            <NewsCard 
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
                card={cardItem}
                handleSaveCardClick={props.handleSaveCardClick}
            />
            ))}
        </section>
    );
};

export default SavedNewsCards;
