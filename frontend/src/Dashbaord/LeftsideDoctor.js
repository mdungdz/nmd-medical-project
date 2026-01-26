// CỘT BÊN TRÁI PHẦN BÁC SĨ
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftsideDoctor = () => {
  const location = useLocation();
  const path = location.pathname;

  // HÀM RENDER DÒNG MENU THANH MẢNH (KIỂU OFFICE)
  const renderMenuItem = (icon, text, routePath) => {
    const isActive = path.includes(routePath);

    return (
      <div style={{
        backgroundColor: isActive ? "rgba(26, 42, 108, 0.1)" : "transparent", // Màu nền mờ khi chọn
        color: isActive ? "#1a2a6c" : "#555", // Chữ xanh Navy khi active
        borderLeft: isActive ? "4px solid #1a2a6c" : "4px solid transparent", // Vạch kẻ mảnh bên trái
        padding: "12px 25px",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: isActive ? "700" : "500",
        transition: "0.2s all ease",
        cursor: "pointer",
        width: "100%"
      }}>
        <span style={{ 
            marginRight: "15px", 
            fontSize: "18px", 
            filter: isActive ? "none" : "grayscale(100%) opacity(0.7)" 
        }}>
            {icon}
        </span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column h-100 shadow-sm" style={{ backgroundColor: "#ffffff", borderRight: "1px solid #eee" }}>
      
      {/* KHỐI NHẬN DIỆN THƯƠNG HIỆU - GIỮ NGUYÊN ĐẲNG CẤP */}
      <div className="p-4 mb-3" style={{ background: "linear-gradient(180deg, #1a2a6c 0%, #000 100%)" }}>
        <div style={{ color: "#fdbb2d", fontSize: "10px", fontWeight: "900", letterSpacing: "1px", marginBottom: "5px" }}>
          CHUYÊN GIA CAO CẤP
        </div>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>
          GS. TS. MẠNH DŨNG
        </div>
        <div className="mt-2" style={{ height: "2px", background: "#fdbb2d", width: "30%", borderRadius: "10px" }}></div>
      </div>

      {/* DANH SÁCH MENU DẠNG DÒNG (LIST STYLE) */}
      <nav className="d-flex flex-column" style={{ flex: 1 }}>
        
        {/* GIỮ NGUYÊN 100% CÁC LINK CỦA BẠN */}
        <Link to="/doctor/dashboard" style={{ textDecoration: "none" }}>
          {renderMenuItem("📅", "Lịch trực hôm nay", "dashboard")}
        </Link>

        <Link to="/doctor/perosnaldetails" style={{ textDecoration: "none" }}>
          {renderMenuItem("👤", "Hồ sơ cá nhân", "perosnaldetails")}
        </Link>

        <Link to="/doctor/payment-history" style={{ textDecoration: "none" }}>
          {renderMenuItem("📜", "Lịch sử ca khám", "payment-history")}
        </Link>

        {/* ĐƯỜNG KẺ PHÂN TÁCH TINH TẾ */}
        <div style={{ height: "1px", backgroundColor: "#f0f0f0", margin: "20px 25px" }}></div>
        
        {/* NÚT THOÁT HỆ THỐNG - ĐÃ SỬA VỀ TRANG CHỦ / */}
        <div style={{ marginTop: "auto" }}>
          <Link to="/" 
                onClick={() => window.localStorage.clear()} 
                style={{ textDecoration: "none" }}>
            <div style={{
              padding: "15px 25px",
              color: "#d93025",
              fontSize: "13px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "rgba(217, 48, 37, 0.05)"
            }}>
              <span style={{ marginRight: "15px" }}>🚪</span> THOÁT HỆ THỐNG
            </div>
          </Link>
          
          <div className="p-3 text-center" style={{ fontSize: "9px", color: "#bbb", letterSpacing: "1px" }}>
            SYSTEM VERSION 4.0.1
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftsideDoctor;