import React, { useContext, useState, useEffect } from "react"; // Đã xóa gapi thừa
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";

const PaitentDashboard = () => {
  // KHỞI TẠO DỮ LIỆU TỪ MÁY ĐỂ HIỆN NGAY (GIỮ NGUYÊN)
  const [patient, setPatient] = useState({
    name: window.localStorage.getItem("patientName") || "",
    email: window.localStorage.getItem("patientEmail") || "",
    phoneNumber: window.localStorage.getItem("patientPhone") || "",
    _id: window.localStorage.getItem("patientId") || ""
  });
  
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [notifications, setNotifications] = useState(0);
  
  // TẮT LOADING ĐỂ TRANG HIỆN RA NGAY
  const [loading] = useState(false); // Đã xóa setLoading vì không dùng tới
  const { googleId } = useContext(AuthContext);

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const localId = window.localStorage.getItem("patientId");
        const idToUse = googleId || localId;

        if (idToUse) {
          const res = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/patients/getPatientDetails/${idToUse}`);
          if (res.status === 200) {
            setPatient(res.data);
            const appointRes = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/appointments/patient/${res.data._id}`);
            if (appointRes.status === 200) {
              const allApps = appointRes.data;
              setAppointmentCount(allApps.filter(app => ["Pending", "Confirmed"].includes(app.status)).length);
              setTotalVisits(allApps.filter(app => app.status === "Completed").length);
              setNotifications(allApps.filter(app => app.status === "Confirmed").length);
            }
          }
        }
      } catch (err) { 
        console.log("Lỗi dữ liệu"); 
      }
    };
    getPatientDetails();
  }, [googleId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="spinner-border text-warning" style={{ width: "5rem", height: "5rem" }}></div>
        </div>
      ) : (
        <div className="container-fluid py-4" style={{ flex: 1 }}>
          <div className="row justify-content-center m-0">
            
            <div className="col-md-3 px-2">
              <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}>
                <Leftside />
              </div>
            </div>

            <div className="col-md-9 px-2">
              <div className="bg-white shadow-lg p-4" style={{ 
                borderRadius: "20px", 
                height: "82vh", 
                borderLeft: "15px solid #ffc107", 
                display: "flex", 
                flexDirection: "column" 
              }}>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="font-weight-bold text-dark mb-0 text-uppercase" style={{ letterSpacing: "1px" }}>
                        📋 BẢNG ĐIỀU KHIỂN BỆNH NHÂN
                    </h3>
                    <div className="badge badge-warning p-2 px-4 shadow-sm text-dark font-weight-bold" style={{ borderRadius: "10px" }}>Bệnh nhân</div>
                </div>
                <hr className="mt-0 mb-4" />
                
                <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="custom-scrollbar pr-2">
                  
                  <div className="row mb-5"> 
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm text-white p-4" style={{ borderRadius: "20px", background: "linear-gradient(45deg, #17a2b8, #117a8b)" }}>
                        <h6 className="text-uppercase small font-weight-bold opacity-80">Lịch hẹn sắp tới</h6>
                        <h2 className="mb-0 font-weight-bold">{appointmentCount < 10 ? `0${appointmentCount}` : appointmentCount}</h2>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm text-white p-4" style={{ borderRadius: "20px", background: "linear-gradient(45deg, #28a745, #1e7e34)" }}>
                        <h6 className="text-uppercase small font-weight-bold opacity-80">Tổng lần khám</h6>
                        <h2 className="mb-0 font-weight-bold">{totalVisits < 10 ? `0${totalVisits}` : totalVisits}</h2>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm text-dark p-4" style={{ borderRadius: "20px", background: "linear-gradient(45deg, #ffc107, #e0a800)" }}>
                        <h6 className="text-uppercase small font-weight-bold opacity-80">Thông báo mới</h6>
                        <h2 className="mb-0 font-weight-bold">{notifications < 10 ? `0${notifications}` : notifications}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4 pt-2">
                    <div className="col-md-7 mb-4">
                      <div className="p-4 border-0 bg-light h-100 shadow-sm" style={{ borderRadius: "25px" }}>
                        <h5 className="font-weight-bold text-primary mb-4" style={{ borderBottom: "3px solid #ffc107", display: "inline-block", paddingBottom: "8px" }}>THÔNG TIN TÀI KHOẢN</h5>
                        
                        <div className="d-flex align-items-center mb-3 border-bottom pb-3">
                          <span className="text-muted font-weight-bold w-40 small">HỌ VÀ TÊN:</span>
                          <span className="font-weight-bold text-dark ml-3" style={{ fontSize: "1.1rem" }}>
                            {patient.name || "Chưa cập nhật"}
                          </span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-3 border-bottom pb-3">
                          <span className="text-muted font-weight-bold w-40 small">EMAIL:</span>
                          <span className="text-dark ml-3">
                            {patient.email || "Chưa cập nhật"}
                          </span>
                        </div>
                        
                        <div className="d-flex align-items-center mb-1 pb-2">
                          <span className="text-muted font-weight-bold w-40 small">SỐ ĐIỆN THOẠI:</span>
                          <span className="text-dark ml-3 font-weight-bold">
                            {patient.phoneNumber || "Chưa cập nhật"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-5 mb-4 text-center">
                      <div className="p-4 border-0 bg-white shadow-sm h-100 d-flex flex-column align-items-center justify-content-center" style={{ borderRadius: "25px", border: "1px solid #eee" }}>
                        <img 
                          src={patient.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                          style={{ width: "140px", height: "140px", borderRadius: "50%", border: "6px solid #ffc107", objectFit: "cover", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }} 
                          alt="Profile" 
                        />
                        <h5 className="mt-3 font-weight-bold mb-1 text-dark">{patient.name || "Bệnh nhân"}</h5>
                        <div className="badge badge-pill badge-light text-success border px-3 py-2 mt-2">
                           <i className="fa fa-check-circle mr-1"></i> Tài khoản xác minh
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8f9fa; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffc107; border-radius: 10px; }
        .w-40 { width: 40%; }
      `}</style>
    </div>
  );
};

export default PaitentDashboard;