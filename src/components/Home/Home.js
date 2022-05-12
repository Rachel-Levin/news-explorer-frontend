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
                isHover={props.isHover}
                onNewsCardBtnHover={props.onNewsCardBtnHover}
                onNewsCardBtnClose={props.onNewsCardBtnClose}
            />
        </main>
    );
};

export default Home;