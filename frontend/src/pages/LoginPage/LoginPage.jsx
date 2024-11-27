import Form from '../../components/Form/Form';

const LoginPage = () => {
  return (
    <div className="card-body row p-5">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src="" alt="" />
        <Form className="col-12 col-md-6 mt-3 mt-md-0" />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта?</span>
          <a href="/signup">Регистрация</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
