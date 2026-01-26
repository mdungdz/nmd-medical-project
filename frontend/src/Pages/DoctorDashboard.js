import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsideDoctor"; 
import TodaysSchedule from "../Doctor/TodaysSchedule";
import Footer from "../Basic/Footer";
import Scrollbar from "react-scrollbars-custom";
import { Modal } from "react-bootstrap"; 

// ============================================================
// PHẦN 1: HỒ SƠ CHUYÊN GIA (TỐI ƯU KHOẢNG TRỐNG DỊCH LÊN TRÊN)
// ============================================================
const DoctorProfileContent = ({ doctorName }) => {
  const cleanName = doctorName.replace(/GS\.?\s?TS\.?/gi, '').trim();

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="card border-0 shadow-lg" style={{ 
        borderRadius: "30px", 
        overflow: "hidden", 
        background: "#ffffff",
        minHeight: "580px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.1) !important"
      }}>
        <div className="row no-gutters h-100">
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-start text-white p-4" 
               style={{ 
                 background: "linear-gradient(165deg, #0f172a 0%, #1e293b 100%)",
                 minHeight: "580px"
               }}>
            <div className="position-relative mb-4 mt-3">
              <div className="halo-ring"></div>
              <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" 
                   alt="Doctor" className="rounded-circle bg-white p-2" 
                   style={{ width: "155px", height: "155px", position: "relative", zIndex: 2 }} />
              <div className="position-absolute" style={{ bottom: "5px", right: "5px", background: "#fdbb2d", borderRadius: "50%", padding: "8px", zIndex: 3 }}>
                <span style={{ fontSize: "18px" }}>💎</span>
              </div>
            </div>
            <h3 className="font-weight-bold text-center mb-2" style={{ letterSpacing: "1px" }}>
              GS. TS. {cleanName}
            </h3>
            <div className="badge badge-warning px-4 py-2 mb-4 text-dark font-weight-bold" style={{ borderRadius: "10px" }}>
                CHUYÊN GIA TUYẾN ĐẦU
            </div>
            <div className="text-center px-3 mt-4 w-100" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
              <p className="small mb-0 font-italic opacity-75">
                 "Anh hùng lao động thời kỳ mới - Bàn tay vàng ngành Y Việt Nam"
              </p>
            </div>
          </div>

          {/* GIẢM PADDING TOP TỪ p-5 XUỐNG pt-4 ĐỂ ĐẨY NỘI DUNG LÊN */}
          <div className="col-md-8 px-5 pt-4 pb-5 bg-white">
            <div className="d-flex align-items-center mb-3">
              <div style={{ width: "6px", height: "35px", background: "#1a2a6c", borderRadius: "10px" }} className="mr-3"></div>
              <h3 className="font-weight-bold text-dark mb-0">HỒ SƠ NĂNG LỰC CHI TIẾT</h3>
            </div>
            
            <div className="row mt-2">
              <div className="col-lg-8">
                <div className="mb-4">
                  <h6 className="text-primary font-weight-bold text-uppercase mb-2" style={{ letterSpacing: "1px" }}>🏆 Vị trí & Chức vụ</h6>
                  <ul className="list-unstyled pl-1" style={{ color: "#334155", fontSize: "15px", lineHeight: "1.9" }}>
                    <li>● <b>Phó Giám đốc điều hành</b> - Trung tâm Tim mạch</li>
                    <li>● <b>Trưởng khoa</b> Phẫu thuật & Can thiệp Mạch máu</li>
                    <li>● <b>Chủ tịch Hội đồng Khoa học</b> Hệ thống Y tế NMD</li>
                    <li>● <b>Giảng viên cao cấp</b> Đại học Y Hà Nội</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-primary font-weight-bold text-uppercase mb-2" style={{ letterSpacing: "1px" }}>🌐 Tổ chức quốc tế</h6>
                  <ul className="list-unstyled pl-1" style={{ color: "#334155", fontSize: "15px", lineHeight: "1.9" }}>
                    <li>● Thành viên <b>Hiệp hội Tim mạch Hoa Kỳ (AHA)</b></li>
                    {/* KHÔNG DÙNG NOWRAP NỮA VÌ ĐÃ CÓ ĐỦ CHỖ TRỐNG */}
                    <li>● Hội viên cao cấp <b>Hội Tim mạch học Châu Âu (ESC)</b></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="p-3 mb-3 text-center border shadow-sm" style={{ background: "#f8fafc", borderRadius: "15px" }}>
                  <small className="text-muted d-block font-weight-bold">THÂM NIÊN</small>
                  <h5 className="font-weight-bold text-dark mb-0">Trên 25 năm</h5>
                </div>
                <div className="p-3 mb-3 text-center border shadow-sm" style={{ background: "#f8fafc", borderRadius: "15px" }}>
                  <small className="text-muted d-block font-weight-bold">HỌC VỊ</small>
                  <h5 className="font-weight-bold text-dark mb-0">Giáo sư - Tiến sĩ</h5>
                </div>
                <div className="p-3 text-center" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "15px" }}>
                  <small className="text-success d-block font-weight-bold">THÀNH TỰU</small>
                  <h5 className="font-weight-bold text-success mb-0">+10.000 ca thành công</h5>
                </div>
              </div>
            </div>

            {/* GIẢM KHOẢNG CÁCH HR ĐỂ TIẾT KIỆM DIỆN TÍCH PHÍA DƯỚI */}
            <hr className="my-3" />
            
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <h6 className="font-weight-bold text-dark mb-1">📅 Lịch khám chuyên gia:</h6>
                <span className="badge badge-light border p-2 px-3 text-dark">Thứ 2 & Thứ 5 (08:00 - 11:30)</span>
              </div>
              <div className="text-right">
                <div className="text-success font-weight-bold small mb-1">VERIFIED PROFILE ✓</div>
                <small className="text-muted">Xác thực bởi Hệ thống Y tế NMD</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .halo-ring {
          position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px;
          border-radius: 50%; border: 2px solid rgba(253, 187, 45, 0.3);
          animation: ring-pulse 3s infinite;
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// CÁC PHẦN SAU GIỮ NGUYÊN TUYỆT ĐỐI
const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("historyData") || "[]");
    const updatedData = data.map(app => {
      if (app.patientName === "Trần Thị Thanh Thảo") return { ...app, feedbackContent: "Bác sĩ tư vấn rất kỹ, nhẹ nhàng và chuyên nghiệp.", rating: 5 };
      if (app.patientName === "Nguyễn Minh Triết") return { ...app, feedbackContent: "Quy trình nhanh chóng, tôi không phải chờ đợi lâu.", rating: 5 };
      if (app.patientName === "Phạm Thu Hà") return { ...app, feedbackContent: "Cảm ơn bác sĩ và kíp mổ đã tận tình chăm sóc tôi.", rating: 5 };
      return app; 
    });
    setHistory(updatedData.filter(app => app.status === "Finished" || app.status?.includes("Paid")));
  }, []);

  return (
    <div style={{ height: "55vh" }}>
      <Scrollbar noScrollX>
        <div className="p-2">
          <table className="table table-hover border bg-white shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th className="py-3 px-4">Ngày & Giờ</th>
                <th className="py-3">Bệnh Nhân</th>
                <th className="py-3 text-center">Đánh giá</th>
                <th className="py-3 text-center">Phản hồi</th>
                <th className="py-3 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {history.map((app, i) => (
                <tr key={i}>
                  <td className="py-3 px-4"><b>{app.date}</b><br/><small className="text-muted">{app.time}</small></td>
                  <td className="py-3 font-weight-bold text-primary">{app.patientName}</td>
                  <td className="py-3 text-center text-warning">{"⭐".repeat(app.rating || 5)}</td>
                  <td className="py-3 text-center">
                    <button className="btn btn-sm btn-outline-dark" style={{ borderRadius: "10px" }} onClick={() => { setSelected(app); setShow(true); }}>Chi tiết</button>
                  </td>
                  <td className="py-3 text-center"><span className="badge badge-success px-3 py-2">HOÀN THÀNH</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Scrollbar>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton style={{ background: '#1a2a6c', color: '#fff' }}>
          <Modal.Title className="h6 text-uppercase">Nội dung phản hồi</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 text-center">
            <h5 className="font-weight-bold">{selected?.patientName}</h5>
            <p className="text-muted font-italic mt-3 lead">"{selected?.feedbackContent || "Bệnh nhân rất hài lòng với dịch vụ."}"</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const DoctorDashboard = () => {
  const location = useLocation();
  const doctorName = window.localStorage.getItem("doctorName") || "Nguyễn Mạnh Dũng";
  const path = location.pathname.toLowerCase();

  const renderMainContent = () => {
    if (path.includes("perosnal") || path.includes("personal")) return <DoctorProfileContent doctorName={doctorName} />;
    if (path.includes("history") || path.includes("payment")) return <PaymentHistory />;
    return <div style={{ height: "58vh" }}><Scrollbar noScrollX><TodaysSchedule /></Scrollbar></div>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar />
      <div className="container-fluid py-4" style={{ flex: 1 }}>
        <div className="row justify-content-center m-0">
          <div className="col-md-3 px-2">
            <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}><Leftside /></div>
          </div>
          <div className="col-md-9 px-2">
            <div className="bg-white shadow-lg p-4" style={{ borderRadius: "20px", height: "82vh", borderLeft: "15px solid #1a2a6c", display: "flex", flexDirection: "column" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="font-weight-bold text-dark mb-0 text-uppercase">
                    {path.includes("perosnal") || path.includes("personal") ? "🏛️ HỒ SƠ CHUYÊN GIA CAO CẤP" : "🏥 QUẢN LÝ LỊCH TRỰC"}
                </h3>
                <div className="badge badge-success p-2 px-4 shadow-sm">Online</div>
              </div>
              <hr className="mt-0" />
              <div style={{ flex: 1, overflow: "hidden" }}>{renderMainContent()}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;