import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import Header from './pages/shared/Header';
import StudentPanel from './pages/StudentPanel/StudentPanel';
import StudentPanelHome from './pages/StudentPanel/StudentPanelHome';
import UserProfile from './pages/StudentPanel/UserProfile';
import Enrollment from './pages/StudentPanel/Enrollment';
import Result from './pages/StudentPanel/Result';
import ForbiddenAccess from './pages/Errors/ForbiddenAccess';
import NotFound from './pages/Errors/NotFound';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import AdminPanelHome from './pages/AdminPanel/AdminPanelHome';
import AdminProfile from './pages/AdminPanel/AdminProfile';
import PendingUsers from './pages/AdminPanel/PendingUsers';
import Students from './pages/AdminPanel/Students';
import UpdateResult from './pages/AdminPanel/UpdateResult';
import UpdateStudent from './pages/AdminPanel/UpdateStudent';
import RequireToken from './pages/Login/RequireToken';

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
          <RequireToken>
            <StudentPanel />
          </RequireToken>
        }>
          <Route path='home' element={<StudentPanelHome />} />
          <Route path='' element={<StudentPanelHome />} />
          <Route path='userProfile' element={<UserProfile />} />
          <Route path='enrollment' element={<Enrollment />} />
          <Route path='result' element={<Result />} />
        </Route>

        <Route path='/adminPanel' element={
          <RequireToken>
            <AdminPanel />
          </RequireToken>
        }>
          <Route path='home' element={<AdminPanelHome />} />
          <Route path='' element={<AdminPanelHome />} />
          <Route path='adminProfile' element={<AdminProfile />} />
          <Route path='pendingUsers' element={<PendingUsers />} />
          <Route path='students' element={<Students />} />
          <Route path='updateResult' element={<UpdateResult />} />
          <Route path='updateStudent' element={<UpdateStudent />} />
        </Route>

        <Route path='/forbiddenAccess' element={<ForbiddenAccess />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
