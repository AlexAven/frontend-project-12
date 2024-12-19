const resources = {
  ru: {
    translation: {
      header: {
        title: 'Hexlet Chat',
        logOutBtn: 'Выйти',
      },
      loginPage: {
        title: 'Войти',
        hasAccount: 'Нет аккаунта?',
        regLink: 'Регистрация',
        form: {
          login: 'Ваш ник',
          password: 'Пароль',
          loginBtn: 'Войти',
        },
      },
      signupPage: {
        title: 'Регистрация',
        form: {
          name: 'Имя пользователя',
          password: 'Пароль',
          passwordConfirm: 'Подтвердите пароль',
          sendBtn: 'Зарегистрироваться',
        },
      },
      notFoundPage: {
        title: 'Страница не найдена',
        description: 'Но вы можете перейти',
        link: 'на главную страницу',
      },
      chat: {
        channels: {
          title: 'Каналы',
          noChannels: 'Канал не выбран',
          dropdown: {
            renameBtn: 'Переименовать',
            deleteBtn: 'Удалить',
          },
          addBtn: '+',
          properties: 'Управление каналом',
        },
        messagesCount: 'сообщений',
        form: {
          placeholder: 'Введите сообщение...',
          sendBtn: 'Отправить',
        },
        renameModal: {
          notification: 'Канал переименован',
          title: 'Переименовать канал',
          cancelBtn: 'Отменить',
          sendBtn: 'Отправить',
          formLabel: 'Имя канала',
        },
        deleteModal: {
          notification: 'Канал удалён',
          title: 'Удалить канал',
          desription: 'Уверены?',
          cancelBtn: 'Отменить',
          sendBtn: 'Удалить',
        },
        addModal: {
          notification: 'Канал создан',
          title: 'Добавить канал',
          desription: 'Имя канала',
          cancelBtn: 'Отменить',
          sendBtn: 'Отправить',
        },
      },
      validation: {
        loginError: 'Неверные имя пользователя или пароль',
        connectionError: 'Ошибка соединения',
        unknownError: 'Произошла ошибка',
        existingUser: 'Такой пользователь уже существует',
        passwordConfirmation: 'Пароли должны совпадать',
        min: 'Не менее 6 символов',
        length: 'От 3 до 20 символов',
        emptyField: 'Обязательное поле',
        uniqName: 'Должно быть уникальным',
      },
    },
  },
};

export default resources;
