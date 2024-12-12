import Form from '../../components/forms/SignupForm/SignupForm';

const SignupPage = () => {
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className='card shadow-sm"'>
          <div className="card-body row m-0 pt-4 px-0 pb-0">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="./src/assets/signup.jpg" alt="signup" />
              </div>
              <h1>Регистрация</h1>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
