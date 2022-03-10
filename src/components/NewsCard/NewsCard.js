import './NewsCard.css';
import newsCard from '../../images/image_08-min.png';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

    const location = useLocation();
    const { isHover } = props;
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function dateConvert(date) {
        const myDate = date.split("T")[0];
        const day = myDate.split("-")[2];
        const month = months[parseInt(myDate.split("-")[1]) - 1];
        const year = myDate.split("-")[0];
        return `${month}  ${day}, ${year}`;
      }

    return (
        <li className="news-card">
            <button onClick={props.addArticle}
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
            <img className="news-card__image" src={props.card.urlToImage} alt="dog"/>
            <div className="news-card__article">
                <p className='news-card__date'>{dateConvert(props.card.publishedAt)}</p>
                <a className="news-card__title" href={props.card.url} target="_blank" >{props.card.title}</a>
                <p className="news-card__text">{props.card.description}</p>
                <p className='news-card__source'>{props.card.source.name}</p>
            </div>
        </li>
    );
};

export default NewsCard;