import "./resources/global.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Users from "./pages/Users";
import Buses from "./pages/Buses";
import BusRoutes from "./pages/BusRoutes";
import Trips from "./pages/Trips"
import Stations from "./pages/Stations"
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import Drivers from "./pages/Drivers";

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div>
      {loading && (<Loader></Loader>)}
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route
              path='/home'
              element={
                <Protected>
                  <Home />
                </Protected>
              } /> */}
            <Route path='/' element={
              <Protected></Protected>}>
            </Route>
            <Route path='/users' element={
              <Protected>
                <Users></Users>
              </Protected>
            }>
            </Route>
            <Route path='/drivers' element={
              <Protected>
                <Drivers></Drivers>
              </Protected>
            }>
            </Route>
            <Route path='/buses' element={
              <Protected>
                <Buses></Buses>
              </Protected>}>
            </Route>
            <Route path='/trips' element={
              <Protected>
                <Trips>
                </Trips>
              </Protected>}>
            </Route>
            <Route path='/stations' element={
              <Protected>
                <Stations></Stations>
              </Protected>}>
            </Route>
            <Route path='/routes' element={
              <Protected>
                <BusRoutes></BusRoutes>
              </Protected>}>
            </Route>
            <Route path='/login' element={
              <PublicRoute>
                <Login></Login>
              </PublicRoute>
              // <Login></Login>
            }>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}
export default App;
