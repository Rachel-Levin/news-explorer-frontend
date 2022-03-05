import './NewsCard.css';
import newsCard from '../../images/image_08-min.png';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

    const location = useLocation();
    const { isHover } = props;

    return (
        <li className="news-card">
            <button
                className={`${location.pathname === "/"
                ? "news-card__save-btn news-card__save-btn-home"
                : "news-card__save-btn news-card__save-btn-trash"
                }`}

                onMouseEnter={props.onNewsCardBtnHover}
                onMouseLeave={props.onNewsCardBtnClose}


            ></button>
            {
                location.pathname === "/" ? (
                    <div className={`${isHover ? 'news-card__popup-save' : 'news-card__popup-hidden'}`}>Sign in to save articles</div>
                ) : ( location.pathname === "/saved-articles" && (
                    <div className={`${isHover ? 'news-card__popup-save' : 'news-card__popup-hidden'}`}>Remove from saved</div>
                ))
            }
            {
                location.pathname === "/saved-articles" && (
                    <p className='news-card__keyword'>keyword</p>
                )
            }
            <img className="news-card__image" src={newsCard} alt="dog"/>
            <div className="news-card__article">
                <p className='news-card__date'>November 4, 2020</p>
                <h3 className="news-card__title">Everyone Needs a Special 'Sit Spot' in Nature</h3>
                <p className="news-card__text">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
                <p className='news-card__source'>treehugger</p>
            </div>
        </li>
    );
};

export default NewsCard;