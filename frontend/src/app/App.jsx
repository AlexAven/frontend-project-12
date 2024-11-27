import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import MainPage from '../pages/Mainpage/Mainpage';
import LoginPage from '../pages/Loginpage/Loginpage';
import NotFoundPage from '../pages/Notfoundpage/Notfoundpage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
