import './SearchForm.css';
import React from 'react';

function SearchForm(props) {

    const onSearchSubmit = props;

    // const [keyword, setKeyword] = React.useState('');

    // const handleChange = (event) => {
    //     setKeyword(event.target.value);
    // };

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.onSearchSubmit(props.keyword);
    }
    //---РАЗМЕТКА JSX---
    return (
        <section className='search-form'>
            <div className='search-form__conteiner'>
                <h1 className='search-form__title'>What's going on in the world?</h1>
                <h2 className='search-form__text'>Find the latest news on any topic and save them in your personal account.</h2>
                {/* <input className='search-form__input' type="text"/>
            <input className='search-form__btn' type="submit"/> */}
                <form className='search-form__form'
                    onSubmit={handleSearchClick}
                >
                    <input className='search-form__input' type="text"
                        value={props.keyword}
                        onChange={props.handleChange}
                    />
                    <button className='search-form__btn' type="submit"
                        disabled={!props.keyword}
                    >Search</button>
                </form>
            </div>
        </section>
    );
};

export default SearchForm;
