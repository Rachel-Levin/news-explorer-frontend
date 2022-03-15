import './Home.css';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';

function Home(props) {
    return (
        <main className='home'>
            <SearchForm
                onSearchSubmit={props.onSearchSubmit}
                keyword={props.keyword}
                handleChange={props.handleChange}
            />
            <Main
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
        </main>
    );
};

export default Home;