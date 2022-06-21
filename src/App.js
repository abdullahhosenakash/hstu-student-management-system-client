import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RequireAuth from './pages/Login/RequireAuth';
import SignUp from './pages/Login/SignUp';
import NotFound from './pages/NotFound/NotFound';
import Header from './pages/shared/Header';
import StudentPanel from './pages/StudentPanel/StudentPanel';
import StudentPanelHome from './pages/StudentPanel/StudentPanelHome';
import UserProfile from './pages/StudentPanel/UserProfile';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/studentPanel' element={
          <RequireAuth>
            <StudentPanel />
          </RequireAuth>
        }>
          <Route path='home' element={<StudentPanelHome />} />
          <Route path='' element={<StudentPanelHome />} />
          <Route path='userProfile' element={<UserProfile />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
