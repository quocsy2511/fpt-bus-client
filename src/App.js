import "./resources/global.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminBuses from "./pages/Admin/AdminBuses";
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div >
      {loading && (<Loader></Loader>)}
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/home'
              element={
                <Protected>
                  <Home />
                </Protected>
              } />
            <Route path='/' element={
              <ProtectedRoute>
              </ProtectedRoute>}>
            </Route>
            <Route path='/admin' element={
              <ProtectedRoute>
                <AdminHome></AdminHome>
              </ProtectedRoute>}>
            </Route>
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <AdminUsers></AdminUsers>
              </ProtectedRoute>}>
            </Route>
            <Route path='/admin/buses' element={
              <ProtectedRoute>
                <AdminBuses></AdminBuses>
              </ProtectedRoute>}>
            </Route>
            <Route path='/login' element={
              <PublicRoute>
                <Login></Login>
              </PublicRoute>
            }>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
