import './SearchForm.css';
import React from 'react';

function SearchForm(props) {

    const onSearchSubmit = props;

    const [keyword, setKeyword] = React.useState('');

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearchClick = (keyword) => {
        // e.preventDefault();
        onSearchSubmit(keyword);
    }
    //---РАЗМЕТКА JSX---
    return (
        <div className='search-form'>
            <div className='search-form__conteiner'>
                <h1 className='search-form__title'>What's going on in the world?</h1>
                <h2 className='search-form__text'>Find the latest news on any topic and save them in your personal account.</h2>
                {/* <input className='search-form__input' type="text"/>
            <input className='search-form__btn' type="submit"/> */}
                <form className='search-form__form'
                    onSubmit={handleSearchClick}
                >
                    <input className='search-form__input' type="text"
                        value={keyword}
                        onChange={handleChange}
                    />
                    <button className='search-form__btn' type="submit"
                        disabled={!keyword}
                    >Search</button>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;
