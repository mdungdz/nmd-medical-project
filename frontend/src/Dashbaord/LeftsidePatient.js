// CỘT BÊN TRÁI PHẦN BỆNH NHÂN
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftsidePatient = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderMenuItem = (icon, text, routePath, exact = false) => {
    // SỬA LỖI TẠI ĐÂY: Nếu exact là true thì so sánh bằng tuyệt đối, ngược lại mới dùng includes
    const isActive = exact ? path === routePath : path.includes(routePath);
    
    return (
      <div style={{
        backgroundColor: isActive ? "rgba(26, 42, 108, 0.1)" : "transparent",
        color: isActive ? "#1a2a6c" : "#555",
        borderLeft: isActive ? "4px solid #1a2a6c" : "4px solid transparent",
        padding: "12px 25px",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: isActive ? "700" : "500",
        transition: "0.2s all ease",
        cursor: "pointer",
        width: "100%"
      }}>
        <span style={{ marginRight: "15px", fontSize: "18px" }}>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column shadow-sm" style={{ 
        backgroundColor: "#ffffff", 
        borderRight: "1px solid #eee", 
        flex: 1, 
        height: "100%", // Đảm bảo phủ hết 82vh của thẻ div cha bên ngoài
        borderRadius: "20px", // Bo góc cho đồng bộ
        overflow: "hidden" 
    }}>
      
      <div className="p-4 mb-3" style={{ background: "linear-gradient(180deg, #1a2a6c 0%, #000 100%)" }}>
        <div style={{ color: "#fdbb2d", fontSize: "10px", fontWeight: "900", letterSpacing: "1px", marginBottom: "5px" }}>HỆ THỐNG QUẢN LÝ</div>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>HỒ SƠ BỆNH NHÂN</div>
        <div className="mt-2" style={{ height: "2px", background: "#fdbb2d", width: "30%", borderRadius: "10px" }}></div>
      </div>

      <nav className="d-flex flex-column" style={{ flex: 1 }}>
        {/* THÊM tham số true vào cuối để yêu cầu khớp chính xác URL */}
        <Link to="/patient" style={{ textDecoration: "none" }}>
            {renderMenuItem("👤", "Thông tin cá nhân", "/patient", true)}
        </Link>
        
        <Link to="/patient/searchdoctor" style={{ textDecoration: "none" }}>
            {renderMenuItem("🔍", "Tìm kiếm bác sĩ", "/patient/searchdoctor")}
        </Link>
        
        <Link to="/patient/appointment-status" style={{ textDecoration: "none" }}>
            {renderMenuItem("📅", "Trạng thái lịch hẹn", "/patient/appointment-status")}
        </Link>
        
        <Link to="/patient/history" style={{ textDecoration: "none" }}>
            {renderMenuItem("📜", "Lịch sử khám bệnh", "/patient/history")}
        </Link>

        <div style={{ marginTop: "auto" }}>
            <div style={{ height: "1px", backgroundColor: "#f0f0f0", margin: "10px 25px" }}></div>
            
            {/* ĐÃ SỬA: Đổi /login thành / để thoát về trang chủ Home */}
            <Link to="/" onClick={() => window.localStorage.clear()} style={{ textDecoration: "none" }}>
                <div style={{ padding: "15px 25px", color: "#d93025", fontSize: "13px", fontWeight: "bold", display: "flex", alignItems: "center", backgroundColor: "rgba(217, 48, 37, 0.05)" }}>
                  <span style={{ marginRight: "15px" }}>🚪</span> THOÁT HỆ THỐNG
                </div>
            </Link>
            
            <div className="p-2 text-center" style={{ fontSize: "9px", color: "#bbb", letterSpacing: "1px" }}>SYSTEM VERSION 4.0.1</div>
        </div>
      </nav>
    </div>
  );
};

export default LeftsidePatient;