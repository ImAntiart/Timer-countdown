# Блок 1: Таймер / Обратный отсчёт

### В этом разделе вы познакомитесь с библиотекой React
[Документация на русском](https://ru.reactjs.org/docs/getting-started.html)

## Подготовка окружения
1. Установка [node.js](https://nodejs.org/en) и [npm](https://www.npmjs.com/)
    1. Переходим на [node.js](https://nodejs.org/en)
    2. Устанавливаем "Recommended For Most Users" версию
    3. Откроем консоль и выполним команды:
    ```
        node -v
    ```
    ```
        npm -v
    ```
   Если команды отработали правильно, то вы увидите версии node.js и npm соответственно

## Создание и настройка react приложения

1. Чтобы создать react приложение будем пользоваться [Create React App](https://create-react-app.dev/) но с использованием кастомного темплейта [cra-template-typescript-styled](https://www.npmjs.com/package/cra-template-typescript-styled)
    1. Для этого установим темплейт
   ```
   npm i cra-template-typescript-styled
   ```
    2. И используем его
   ```
   npx create-react-app ./ --template typescript-styled
   ```
2. Темплейт содержит зависимости на [Styled Components](https://styled-components.com/) и [Prettier](https://prettier.io/). Не забудьте поставить дополнительные плагины в вашей среде разработки, чтобы комфортно с ними работать.
3. Добавьте зависимости на [MUI](https://mui.com/material-ui/getting-started/installation/) самостоятельно (должны быть сохранены в `package.json`. Используйте `--save` при установке через `npm`)

## Требования
- Старт с create-react-app, styled-components, prettier, MUI
- Делаем 2 команды `npm run lint` и `npm run lint:fix`, которые запускают линтер (без автофиксов и с ними), у итогового решения не должно быть ошибок линтера (в дальнейших заданиях по-умолчанию).
- Все props компонентов описаны через [PropTypes](https://ru.reactjs.org/docs/typechecking-with-proptypes.html)
- Все зависимости подключаем через npm
