import './NewsCard.css';
// import newsCard from '../../images/image_08-min.png';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function NewsCard(props) {

    const location = useLocation();
    const { isHover, loggedIn } = props;
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
        if (!date) {
            return '';
        }
        const myDate = date.split("T")[0];
        const day = myDate.split("-")[2];
        const month = months[parseInt(myDate.split("-")[1]) - 1];
        const year = myDate.split("-")[0];
        return `${month}  ${day}, ${year}`;
    }

    // function addOrDeleteArticle(){
    //     props.handleSaveCardClick(props.card)
    // }

    function deleteArticle(card) {
        console.log(card);
        mainApi.deleteArticle(card._id)
            .then(() => {
                // setSavedArticles((state) => state.filter((c) => c._id !== card._id));
                // setCards((state) =>
                //   state.map((c) =>
                //     c.title === card.title ? { ...c, saved: "false" } : c,
                //   ),
                // );
                card.saved = false;
            })
            .catch((err) => console.log(err));
    }

    function handleSaveCardClick() {
        if (props.card.saved) {
            // TODO remove saved article here
            // props.handleSaveCardClick(props.card);
            deleteArticle(props.card);
        } else {
            props.addArticle(props.card);
        }
    }

    //   if(!props.card.urlToImage) {
    //       return '';
    //   }

    return (
        <li className="news-card">
            <button onClick={loggedIn ? (handleSaveCardClick) : (props.openSignInPopup)}
                className={`${location.pathname === "/"
                    ? "news-card__save-btn news-card__save-btn-home"
                    : "news-card__save-btn news-card__save-btn-trash"
                    }
                ${props.card.saved == true
                        ? "news-card__saved"
                        : " "
                    }
                `}

                onMouseEnter={props.onNewsCardBtnHover}
                onMouseLeave={props.onNewsCardBtnClose}


            ></button>
            {

                !loggedIn && location.pathname === "/" && (
                    <div className={`${isHover ? 'news-card__popup-save' : 'news-card__popup-hidden'}`}>Sign in to save articles</div>
                )

            }
            {
                (loggedIn && location.pathname === "/saved-articles" && (
                    <div className={`${isHover ? 'news-card__popup-save' : 'news-card__popup-hidden'}`}>Remove from saved</div>
                ))
            }
            {
                location.pathname === "/saved-articles" && (
                    <p className='news-card__keyword'>{props.card.keyword}</p>
                )
            }
            <img className="news-card__image" src={props.card.urlToImage} alt="dog" />
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