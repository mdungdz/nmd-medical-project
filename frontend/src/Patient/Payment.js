import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Table, Row, Col } from "reactstrap";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Scrollbar from "react-scrollbars-custom";
import Footer from "../Basic/Footer"; 

const Payment = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const currentPatientName = window.localStorage.getItem("patientName") || "Bệnh nhân";

  const [lastBooking, setLastBooking] = useState({ 
    doctorName: "Bác sĩ", 
    doctorFees: 0,
    selectedServices: [],
    date: "", 
    totalAmount: 0,
    status: "Pending Payment" 
  });
  
  const toggle = () => {
    setModal(!modal);
    setShowQR(false);
  };

  useEffect(() => {
    const appointmentData = location.state?.appointment;
    if (appointmentData) {
      setLastBooking(appointmentData);
    } else {
      // SỬA KỸ THUẬT: Đọc từ localStorage thay vì sessionStorage để tránh bị "Trống"
      const appointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
      if (appointments.length > 0) {
        const currentApp = appointments.findLast(app => app.status === "Pending Payment");
        if (currentApp) setLastBooking(currentApp);
      }
    }
  }, [location]);

  const formatCurrency = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);

  const handleConfirm = (method) => {
    // SỬA KỸ THUẬT: Chuyển toàn bộ sang localStorage
    let appointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    const index = appointments.findLastIndex(app => 
      app.doctorName === lastBooking.doctorName && app.date === lastBooking.date
    );
    
    if (index !== -1) {
      appointments[index].status = "Finished";
      appointments[index].paymentMethod = method;
      appointments[index].patientName = currentPatientName; 
      localStorage.setItem("myAppointments", JSON.stringify(appointments));
    }

    let historyData = JSON.parse(localStorage.getItem("historyData") || "[]");
    const newHistoryRecord = {
      ...lastBooking,
      patientName: currentPatientName, 
      status: "Finished",
      paymentMethod: method,
      finishDate: new Date().toLocaleDateString('vi-VN')
    };
    historyData.push(newHistoryRecord);
    localStorage.setItem("historyData", JSON.stringify(historyData));

    alert("Thanh toán thành công! Ca khám đã được chuyển tới bác sĩ.");
    setModal(false);
    // Về trang Trạng thái lịch hẹn để kiểm tra kết quả ngay
    history.push("/patient/appointment-status"); 
  };

  const isPaid = lastBooking.status === "Finished" || lastBooking.status?.includes("Paid");
  const qrUrl = `https://img.vietqr.io/image/970436-123456789-compact2.jpg?amount=${lastBooking.totalAmount}&addInfo=THANH%20TOAN%20HOA%20DON%20${lastBooking.doctorName.replace(/\s/g, '')}&accountName=HE%20THONG%20Y%20TE%20NMD`;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      <div style={{ flex: 1 }}>
        <div className="container-fluid py-4">
          <div className="row justify-content-center m-0">
            {/* CỘT TRÁI: SIDEBAR - ÉP ĐÚNG 82VH VÀ 20PX RADIUS */}
            <div className="col-md-3 px-2">
              <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}>
                <LeftsidePatient />
              </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT THANH TOÁN - ĐỒNG BỘ 82VH VÀ VẠCH VÀNG 15PX */}
            <div className="col-md-9 px-2">
              <div className="bg-white shadow-lg p-4" style={{ 
                borderRadius: "20px", 
                height: "82vh", 
                borderLeft: "15px solid #ffc107", 
                display: "flex", 
                flexDirection: "column" 
              }}>
                <div className="mb-2">
                  <h4 className="font-weight-bold text-dark text-uppercase">💳 CHI TIẾT THANH TOÁN HÓA ĐƠN</h4>
                  <hr className="my-3" />
                </div>

                <div style={{ flex: 1, overflow: "hidden" }}>
                  <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}
                    thumbYProps={{ style: { backgroundColor: '#ffc107', borderRadius: '10px' } }}>
                    <div className="p-3">
                      <div className="bg-light text-dark p-4 p-md-5 rounded shadow-sm w-100 mx-auto" 
                           style={{ maxWidth: "750px", borderTop: "10px solid #2c3e50", position: 'relative' }}>
                        
                        {isPaid && (
                          <div style={{
                            position: 'absolute', top: '30px', right: '10px', border: '5px solid #28a745', color: '#28a745',
                            padding: '10px 30px', borderRadius: '10px', transform: 'rotate(15deg)', fontWeight: 'bold',
                            fontSize: '30px', opacity: '0.4', zIndex: '10', pointerEvents: 'none'
                          }}> ĐÃ CHI TRẢ </div>
                        )}

                        <div className="text-center mb-5">
                          <h3 className="font-weight-bold mb-0 text-dark">HÓA ĐƠN Y TẾ CHI TIẾT</h3>
                          <small className="text-muted text-uppercase tracking-widest">Hệ thống bệnh viện quốc tế NMD</small>
                        </div>

                        <Row className="mb-4 border-bottom pb-3">
                          <Col xs="6" className="text-left">
                            <p className="mb-1 text-muted small">Bệnh nhân:</p>
                            <h5 className="font-weight-bold text-primary text-uppercase">{currentPatientName}</h5>
                          </Col>
                          <Col xs="6" className="text-right">
                            <p className="mb-1 text-muted small">Ngày khám:</p>
                            <h6 className="font-weight-bold text-dark">{lastBooking.date}</h6>
                          </Col>
                        </Row>

                        <Table borderless className="mt-2 text-dark">
                          <thead>
                            <tr className="border-bottom small text-muted">
                              <th className="text-left">DANH MỤC DỊCH VỤ / BÁC SĨ</th>
                              <th className="text-right">THÀNH TIỀN</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-left">
                                <div className="font-weight-bold">Phí khám chuyên gia</div>
                                <small className="text-muted">Bác sĩ: {lastBooking.doctorName}</small>
                              </td>
                              <td className="text-right align-middle font-weight-bold">
                                {formatCurrency(lastBooking.doctorFees || (lastBooking.totalAmount - (lastBooking.selectedServices?.reduce((s, a) => s + a.price, 0) || 0)))} 
                              </td>
                            </tr>

                            {lastBooking.selectedServices && lastBooking.selectedServices.map((service, index) => (
                              <tr key={index}>
                                <td className="text-left">
                                  <div className="font-weight-bold">{service.name}</div>
                                  <small className="text-muted">Dịch vụ kỹ thuật cao</small>
                                </td>
                                <td className="text-right align-middle text-success font-weight-bold">
                                  +{formatCurrency(service.price)}
                                </td>
                              </tr>
                            ))}

                            <tr className="h4 font-weight-bold border-top" style={{ backgroundColor: "#fdf7e3" }}>
                              <td className="pt-4 text-primary text-left">TỔNG THANH TOÁN</td>
                              <td className="pt-4 text-right text-danger">
                                {formatCurrency(lastBooking.totalAmount)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>

                        <div className="mt-5 pt-3 d-flex flex-column gap-3">
                          {!isPaid ? (
                            <Button color="warning" block className="py-3 font-weight-bold rounded-pill shadow text-dark" onClick={toggle}>
                                 XÁC NHẬN & THANH TOÁN NGAY
                            </Button>
                          ) : (
                            <Button color="success" block className="py-3 font-weight-bold rounded-pill shadow" disabled>
                               ✓ GIAO DỊCH ĐÃ HOÀN TẤT
                            </Button>
                          )}
                          
                          <Button color="secondary" outline block className="py-2 font-weight-bold rounded-pill mt-2" 
                                  onClick={() => history.push("/patient/appointment-status")}>
                              QUAY LẠI QUẢN LÝ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Scrollbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="border-0 font-weight-bold text-dark">Phương thức thanh toán</ModalHeader>
        <ModalBody className="p-4 text-center">
          {!showQR ? (
            <>
              <div className="p-3 mb-3 border rounded shadow-sm text-dark" onClick={() => setShowQR(true)} style={{cursor: 'pointer', backgroundColor: '#f8f9fa'}}>
                <h6 className="mb-0 font-weight-bold">🏦 Chuyển khoản VietQR (Nhanh)</h6>
              </div>
              <div className="p-3 border rounded shadow-sm text-dark" onClick={() => handleConfirm("CASH")} style={{cursor: 'pointer', backgroundColor: '#f8f9fa'}}>
                <h6 className="mb-0 font-weight-bold">💵 Thanh toán tại quầy</h6>
              </div>
            </>
          ) : (
            <div>
              <img src={qrUrl} alt="QR Code" className="img-fluid mb-3 shadow" style={{maxWidth: '220px'}} />
              <h5 className="text-danger font-weight-bold mb-3">{formatCurrency(lastBooking.totalAmount)}</h5>
              <Button color="success" block className="rounded-pill font-weight-bold" onClick={() => handleConfirm("QR")}>TÔI ĐÃ CHUYỂN KHOẢN XONG</Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Payment;