import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import các trang chính
import Home from "./Pages/Home";
import DoctorLogin from "./Pages/DoctorLogin";
import PatientLogin from "./Pages/PatientLogin";
import Registration from "./Pages/Registration"; 
import DoctorDashboard from "./Pages/DoctorDashboard";
import PaitentDashboard from "./Pages/PaitentDashboard";
import Error from "./Pages/Error";
import PhoneNumber from "./components/PhoneNumber";
import SearchDoctor from "./Patient/SearchDoctor";
import PerviousAppointments from "./Patient/PerviousAppointments";
import AppointmentStatus from "./Patient/AppointmentStatus"; 
import Payment from "./Patient/Payment"; 
import { AuthContext } from "./Auth/AuthContext";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [googleId, setGoogleId] = useState(window.localStorage.getItem("googleId"));

  return (
    <Router>
      <AuthContext.Provider value={{ token, setToken, googleId, setGoogleId }}>
        <Switch>
          {/* TRANG CHỦ */}
          <Route exact path="/" component={Home} />
          
          {/* --- KHU VỰC BÁC SĨ --- */}
          <Route exact path="/doctorlogin" component={DoctorLogin} />
          <Route exact path="/doctor/dashboard" component={DoctorDashboard} />
          <Route exact path="/doctor/perosnaldetails" component={DoctorDashboard} /> 
          <Route exact path="/doctor/payment-history" component={DoctorDashboard} />
          
          {/* --- KHU VỰC KHÁCH HÀNG --- */}
          <Route exact path="/patientlogin" component={PatientLogin} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/patient" component={PaitentDashboard} />
          <Route exact path="/patient/searchdoctor" component={SearchDoctor} />
          
          <Route exact path="/patient/history" component={PerviousAppointments} />
          <Route exact path="/patient/previousappointments" component={PerviousAppointments} />
          
          <Route exact path="/patient/update-phone" component={PhoneNumber} />
          <Route exact path="/patient/appointment-status" component={AppointmentStatus} />
          
          {/* --- THANH TOÁN --- */}
          <Route exact path="/patient/payment" component={Payment} />
          
          {/* TRANG LỖI 404 */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;


//chạy ctrinh
//cd healthcare-appointment-scheduling-app
//cd frontend
//export NODE_OPTIONS=--openssl-legacy-provider
// npm start