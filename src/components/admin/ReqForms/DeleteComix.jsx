import React, {useState} from 'react';
import classes from "../admin.module.css";
import config from "../../config";

const DeleteComix = () => {

    const [password, setPassword] = useState('');
    const [tagName, setTagName] = useState('');
    const [name, setName] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Валидация вводимых данных
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
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
        }

        try {
            // Остальной код отправки на сервер остаётся без изменений
            const response = await fetch(config.url + '/deletecomix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: password,
                    TagName: tagName,
                    Name: name,
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
            <h1 className={classes.formName}>Удалить комикс</h1>
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
                    placeholder="Имя комикса"
                />
                <button type="submit">Удалить комикс</button>
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

export default DeleteComix;