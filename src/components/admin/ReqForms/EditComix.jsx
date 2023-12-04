import React, {useState} from 'react';
import classes from "../admin.module.css";
import config from "../../config";

const EditComix = () => {

    const [password, setPassword] = useState('');
    const [tagName, setTagName] = useState('');
    const [name, setName] = useState('');
    const [newValue, setNewValue] = useState('');
    const [param, setParam] = useState(''); // State для значения Param
    const [serverResponse, setServerResponse] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Валидация вводимых данных
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
        const newValueRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
        const tagNameRegex = /^[a-z]+$/;

        if (!password.match(passwordRegex)) {
            setValidationError('Пароль должен содержать только буквы латинского алфавита и цифры.');
            return;
        } else if ((!name.match(nameRegex)) || (name === '')) {
            setValidationError('Имя комикса должно содержать только буквы, цифры.');
            return;
        } else if (!tagName.match(tagNameRegex)) {
            setValidationError('Имя тега должно содержать только строчные буквы латинского алфавита.');
            return;
        } else if (!newValue.match(newValueRegex)) {
            setValidationError('Новое значение должно содержать только строчные буквы латинского алфавита и/или цифры');
            return;
        }

        try {
            // Остальной код отправки на сервер остаётся без изменений
            const response = await fetch(config.url + '/editcomix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: password,
                    TagName: tagName,
                    Name: name,
                    Param: param,
                    NewValue: newValue,
                }),
            });

            const data = await response.json();
            setServerResponse(JSON.stringify(data));
            setValidationError(''); // Сбрасываем сообщение об ошибке валидации при успешной отправке
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setServerResponse('Произошла ошибка при отправке запроса.');
        }
    };

    return (
        <div>
            <h1 className={classes.formName}>Изменить комикс</h1>
            <form className={classes.reqForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="Имя тэга"
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название комикса"
                /> <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Новое значение"
            />

                {/* Добавление выпадающего списка для выбора значения Param */}
                <select value={param} onChange={(e) => setParam(e.target.value)}>
                    <option value="">Выберите Param</option>
                    <option value="name">Название комикса</option>
                    <option value="description">Описание комикса</option>
                    <option value="comix_tag">Тэг комикса</option>
                    {/* Добавьте другие варианты значений Param по необходимости */}
                </select>

                <button type="submit">Изменить комикс</button>
                {validationError && <p className={classes.errorMessage}>{validationError}</p>}
                <div>
                    {/* Ответ сервера */}
                    {serverResponse && <p className={classes.serverResponse}>Ответ сервера: {serverResponse}</p>}
                </div>
            </form>
            {/* Отображение сообщения об ошибке валидации */}

        </div>
    );
};

export default EditComix;