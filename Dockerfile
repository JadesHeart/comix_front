FROM node:20.9.0

COPY package-lock.json .

# Копируем все файлы из директории comix_front на вашем компьютере внутрь контейнера
COPY . .

# Устанавливаем зависимости
RUN npm install

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
