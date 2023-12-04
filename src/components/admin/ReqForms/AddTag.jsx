import React, {useState} from 'react';
import classes from "../admin.module.css";
import config from "../../config";

const AddTag = () => {
    const [password, setPassword] = useState('');
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Валидация вводимых данных
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const descriptionRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
        const tagNameRegex = /^[a-z]+$/;

        if (!password.match(passwordRegex)) {
            setValidationError('Пароль должен содержать только буквы латинского алфавита и цифры.');
            return;
        } else if ((!description.match(descriptionRegex)) || (description === '')) {
            setValidationError('Описание должно содержать только буквы, цифры.');
            return;
        } else if (!tagName.match(tagNameRegex)) {
            setValidationError('Имя тега должно содержать только строчные буквы латинского алфавита.');
            return;
        }

        try {
            // Остальной код отправки на сервер остаётся без изменений
            const response = await fetch(config.url + '/newtag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: password,
                    TagName: tagName,
                    Description: description,
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
            <h1 className={classes.formName}>Добавить тэг</h1>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                />
                <button type="submit">Добавить тэг</button>
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

export default AddTag;


