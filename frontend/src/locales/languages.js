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
          dropdown: {
            renameBtn: 'Переименовать',
            deleteBtn: 'Удалить',
          },
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
        },
        deleteModal: {
          notification: 'Канал удален',
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
    },
  },
};

export default resources;
