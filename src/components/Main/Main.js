import './Main.css';
import News from '../News/News';
import About from '../About/About';

function Main(props) {

    return (
        <div to='/' className='main'>
            <News
                cards={props.cards}
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
                isArticlesOpen={props.isArticlesOpen}
                isLoaderOpen={props.isLoaderOpen}
                isNothingFoundOpen={props.isNothingFoundOpen}
                isErrMessageOpen={props.isErrMessageOpen}
                addArticle={props.addArticle}
                handleSaveCardClick={props.handleSaveCardClick}
            />
            <About />
        </div>
    );
};

export default Main;