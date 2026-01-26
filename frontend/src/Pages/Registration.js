import React, { useState } from "react"; 
import { useHistory } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Footer from "../Basic/Footer";

const Registration = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // CHỈ SỬA LOGIC Ở ĐÂY: Ép đặt mật khẩu cố định 123456
    if (password === "123456") {
      const userAccount = { name: name, password: password };
      window.localStorage.setItem("userAccount", JSON.stringify(userAccount));
      alert("Đăng ký thành công! Hãy dùng tên này và mật khẩu 123456 để đăng nhập.");
      history.push("/patientlogin");
    } else {
      alert("Lỗi: Để Demo chạy được, ông vui lòng đặt mật khẩu đúng là 123456 nhé!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg" style={{ width: "500px", borderRadius: "10px", borderTop: "5px solid #28a745" }}>
          <div className="card-header bg-white text-center py-4">
            <h4 className="mb-0 text-success font-weight-bold text-uppercase">Tạo tài khoản bệnh nhân</h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <label className="font-weight-bold text-secondary">Họ và Tên</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ví dụ: Nguyễn Văn A" 
                  required 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold text-secondary">Số điện thoại</label>
                <input type="text" className="form-control" placeholder="Nhập số điện thoại" required />
              </div>
              <div className="form-group mb-4">
                <label className="font-weight-bold text-secondary">Mật khẩu</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Nhập 123456 để Demo" 
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn btn-success w-100 py-3 shadow-sm font-weight-bold text-uppercase">
                Đăng Ký Ngay
              </button>
              <div className="text-center mt-3">
                <small className="text-muted">Đã có tài khoản? <a href="/patientlogin">Đăng nhập</a></small>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;