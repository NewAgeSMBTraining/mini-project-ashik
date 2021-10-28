import './App.css';
import { HashRouter as Router , Switch, Route }from "react-router-dom";
import ProtectedRoute from "./config/PrivateRoute";

import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee';
import AdminRegister from './components/AdminRegister';
import AdminForgotPassword from './components/AdminForgotPassword';
import EmployeLogin from './components/EmployeLogin';
import EmployeHome from './components/EmployeHome';
import EmployeDetails from './components/EmployeDetails';
import EmployeUpdate from './components/EmployeUpdate';
import EmployeLeave from './components/EmployeeLeave';
import EmployeGetLeaves from './components/EmployeGetLeaves';
import EmployeLeaves from './components/EmployeLeaves';
import AdminResetPassword from './components/AdminResetPassword';
import EmployeResetPassword from './components/EmployeResetPassword';

function App() {
  return (
    <Router>
      <Switch>
          {/* Admin Routes */}
          <Route exact path = '/'> <Navbar/> </Route>
          <Route exact path = '/adminLogin'> <AdminLogin/> </Route>
          <Route exact path = '/adminRegister'> <AdminRegister/> </Route>
          <Route exact path = '/forgotPassword' component = {AdminForgotPassword} />
          <Route exact path = '/password/reset/:token' component = {AdminResetPassword} />
          <ProtectedRoute exact path = '/allUsers' component={AdminHome}/>
          <ProtectedRoute exact path = '/createUser'> <AddEmployee/> </ProtectedRoute>
          <ProtectedRoute exact path = '/updateUser' component = {EditEmployee} />
          <ProtectedRoute exact path = '/allLeaves' component = {EmployeLeaves} />

          {/* Employee routs */}
          <Route exact path = '/employeLogin'> <EmployeLogin/> </Route>
          <ProtectedRoute exact path = '/getAnEmployee' component = {EmployeDetails}/>
          <ProtectedRoute exact path = '/myDetails' component = {EmployeHome}/>
          <ProtectedRoute exact path = '/updateEmployee' component = {EmployeUpdate}/>
          <ProtectedRoute exact path = '/createLeave' component = {EmployeLeave}/>
          <ProtectedRoute exact path = '/getLeaves' component = {EmployeGetLeaves}/>
          <ProtectedRoute exact path = '/updatePassword' component = {EmployeResetPassword}/>
      </Switch>
    </Router>
  );
}

export default App;
