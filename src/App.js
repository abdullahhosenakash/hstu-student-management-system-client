import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import NotFound from './pages/NotFound/NotFound';
import Header from './pages/shared/Header';
import StudentPanel from './pages/StudentPanel/StudentPanel';
import UpdateUser from './pages/StudentPanel/UpdateUser';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/studentPanel' element={<StudentPanel />}>
          <Route path='updateUser' element={<UpdateUser />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
