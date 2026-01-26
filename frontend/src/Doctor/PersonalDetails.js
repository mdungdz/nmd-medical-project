// thông tin cá nhân của BSI
import React, { useContext, useMemo } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor";
import jwt_decode from "jwt-decode";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";

const PersonalDetails = () => {
  const { token } = useContext(AuthContext);
  const doctor = useMemo(() => jwt_decode(token), [token]);

  return (
    <div className="bg-light" style={{ minHeight: "100vh", backgroundColor: "#f4f7fe" }}>
      <Navbar />
      <div className="container-fluid py-4">
        <div className="row mx-md-4">
          
          {/* SIDEBAR */}
          <div className="col-md-3 p-0">
            <div className="shadow-sm bg-white" style={{ borderRadius: "24px", height: "85vh", border: "1px solid rgba(0,0,0,0.05)" }}>
              <Leftside />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-9 px-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "24px", backgroundColor: "transparent" }}>
              
              {/* HEADER SECTION */}
              <div className="d-flex align-items-center justify-content-between mb-4 px-2">
                <div>
                  <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: "28px" }}>Hồ Sơ Chuyên Gia</h2>
                  <p className="text-muted mb-0">Quản lý và cập nhật thông tin cá nhân của bạn</p>
                </div>
                <div className="d-flex align-items-center">
                   <div className="mr-3 text-right">
                      <span className="d-block font-weight-bold text-success">● Đang hoạt động</span>
                      <small className="text-muted">Hệ thống NMD v4.0.1</small>
                   </div>
                </div>
              </div>

              <div className="row">
                {/* LEFT CARD: IDENTITY */}
                <div className="col-lg-5 mb-4">
                  <div className="card border-0 text-white shadow-lg position-relative overflow-hidden" 
                       style={{ 
                         background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", 
                         borderRadius: "30px",
                         minHeight: "500px"
                       }}>
                    
                    {/* Abstract Background Decor */}
                    <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "50%" }}></div>
                    
                    <div className="card-body d-flex flex-column align-items-center justify-content-center p-5">
                      <div className="position-relative mb-4">
                        <div style={{ 
                          width: "180px", height: "180px", borderRadius: "50%", 
                          padding: "8px", background: "linear-gradient(45deg, #fdbb2d, #22c55e)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.5)"
                        }}>
                          <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" 
                               alt="Doctor" 
                               style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "4px solid #1e293b" }} />
                        </div>
                        <span className="position-absolute border border-white" 
                              style={{ bottom: "15px", right: "15px", width: "25px", height: "25px", backgroundColor: "#22c55e", borderRadius: "50%" }}></span>
                      </div>

                      <h3 className="font-weight-bold text-center mb-1" style={{ letterSpacing: "-0.5px" }}>{doctor.name}</h3>
                      <p className="text-info font-weight-bold mb-4" style={{ letterSpacing: "2px", fontSize: "14px" }}>GS.TS - BÁC SĨ CAO CẤP</p>
                      
                      <div className="w-100 py-3 px-4 mb-4" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "20px", backdropFilter: "blur(10px)" }}>
                        <div className="d-flex justify-content-between mb-2">
                          <small className="opacity-50 text-uppercase">Danh hiệu</small>
                          <small className="font-weight-bold text-warning">Anh hùng lao động</small>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="opacity-50 text-uppercase">Xác minh</small>
                          <small className="font-weight-bold text-success">Đã chứng thực ✓</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT CARD: DETAILS */}
                <div className="col-lg-7 mb-4">
                  <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "30px", backgroundColor: "#fff" }}>
                    <h5 className="font-weight-bold text-dark mb-4 d-flex align-items-center">
                      <span className="mr-2" style={{ width: "8px", height: "25px", background: "#3b82f6", borderRadius: "4px", display: "inline-block" }}></span>
                      Thông tin năng lực chuyên môn
                    </h5>

                    <div className="mb-4">
                      <label className="text-muted small font-weight-bold text-uppercase mb-2">🧬 Chuyên khoa mũi nhọn</label>
                      <div className="p-4" style={{ 
                        background: "#f8fafc", 
                        borderRadius: "20px", 
                        border: "1px solid #e2e8f0",
                        borderLeft: "8px solid #3b82f6"
                      }}>
                        <h5 className="mb-0 font-weight-bold text-primary">{doctor.specialization}</h5>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-sm-6 mb-3">
                        <div className="p-3 border-0 bg-light rounded-lg" style={{ borderRadius: "15px" }}>
                          <small className="text-muted d-block mb-1">📞 LIÊN HỆ</small>
                          <span className="font-weight-bold h6">{doctor.phoneNumber}</span>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="p-3 border-0 bg-light rounded-lg" style={{ borderRadius: "15px" }}>
                          <small className="text-muted d-block mb-1">💰 CHI PHÍ KHÁM</small>
                          <span className="font-weight-bold h6 text-success">{doctor.feesPerSession?.toLocaleString()} VND</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-top">
                       <p className="text-muted small">
                         <i className="fas fa-info-circle mr-2"></i> 
                         Thông tin hồ sơ được bảo mật bởi tiêu chuẩn mã hóa AES-256. Mọi thay đổi cần được phê duyệt bởi Ban Giám Đốc.
                       </p>
                       <button className="btn btn-primary btn-block py-3 font-weight-bold" style={{ borderRadius: "15px", boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)" }}>
                         CHỈNH SỬA HỒ SƠ
                       </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;