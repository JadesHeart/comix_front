import React, {useState} from 'react';
import classes from './SearchForm.module.css';
import config from "../../config";

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const isValidInput = /^[а-яА-Яa-zA-Z0-9\s\p{P}]+$/u.test(inputValue);
        if (isValidInput || inputValue === '') {
            setSearchTerm(inputValue);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            const newURL = config.reactUrl + `/find/${searchTerm}/1`;
            window.location.href = newURL;
        } else {
            console.log('Пожалуйста, введите корректный запрос');
        }
    };

    return (<form onSubmit={handleSubmit} className={classes.searchForm}>
        <input
            className={classes.inputInSearchForm}
            type="text"
            placeholder="Введите запрос"
            value={searchTerm}
            onChange={handleInputChange}
        />
        <button className={classes.searchButton} type="submit">
            Поиск
        </button>
    </form>);
};

export default SearchForm;
