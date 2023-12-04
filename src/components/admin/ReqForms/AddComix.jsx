import React, {useState} from 'react';
import classes from '../admin.module.css';
import config from "../../config";

const AddComix = () => {
    const [password, setPassword] = useState('');
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [validationError, setValidationError] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const descriptionRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-,.!?]+$/;
        const tagNameRegex = /^[a-z]+$/;

        if (!password.match(passwordRegex)) {
            setValidationError('Пароль должен содержать только буквы латинского алфавита и цифры.');
            return;
        } else if ((!description.match(descriptionRegex)) || (description === '')) {
            setValidationError('Описание должно содержать только буквы, цифры.');
            return;
        } else if (!name.match(nameRegex)) {
            setValidationError('Тэг должен содержать только буквы, цифры и пробелы.');
            return;
        } else if (!tagName.match(tagNameRegex)) {
            setValidationError('Имя тега должно содержать только строчные буквы латинского алфавита.');
            return;
        }

        try {
            const mainDataResponse = await fetch(config.url + '/newcomix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Password: password,
                    TagName: tagName,
                    Name: name,
                    Description: description,
                }),
            });

            const mainData = await mainDataResponse.json();
            setServerResponse(JSON.stringify(mainData));
            setValidationError('');
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setServerResponse('Произошла ошибка при отправке запроса.');
        }
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setImages([...selectedFiles]);
    };

    const handleImageSubmit = async () => {
        try {
            if (images.length > 0) {
                const formData = new FormData();

                images.forEach((image, index) => {
                    formData.append(`photo`, image);
                });

                formData.append('password', password);
                formData.append('tag', tagName);
                formData.append('name', name);
                formData.append('description', description);

                const imagesResponse = await fetch(config.url + '/insertphoto', {
                    method: 'POST',
                    body: formData,
                });
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса для изображений:', error);
            setServerResponse('Произошла ошибка при отправке запроса для изображений.');
        }
    };
    return (
        <div>
            <h1 className={classes.formName}>Добавить комикс</h1>
            <form className={classes.reqFormComix} onSubmit={handleSubmit}>
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
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*" // Принимаем только изображения
                />
                <button type="submit">Добавить комикс</button>
                <button type="button" onClick={handleImageSubmit}>Отправить изображения</button>
                {validationError && <p className={classes.errorMessage}>{validationError}</p>}
                <div>
                    {serverResponse && <p className={classes.serverResponse}>Ответ сервера: {serverResponse}</p>}
                </div>
            </form>
        </div>
    );
};

export default AddComix;
