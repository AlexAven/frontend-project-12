const Header = () => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        <button type="button" className="btn btn-primary">
          Выйти
        </button>
      </div>
    </nav>
  );
};

export default Header;
