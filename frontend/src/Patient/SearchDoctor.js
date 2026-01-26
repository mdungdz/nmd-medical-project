import React, { useState } from "react";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; // Thêm Footer vào
import { 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  Card, CardBody, Row, Col, Input, Label 
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

const SearchDoctor = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterDept, setFilterDept] = useState("All"); 

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [services, setServices] = useState([
    { id: 1, name: "Siêu âm 4D ổ bụng", price: 450000, checked: false },
    { id: 2, name: "Nội soi dạ dày (gây mê)", price: 1500000, checked: false },
    { id: 3, name: "Chụp MRI cột sống/sọ não", price: 2200000, checked: false },
    { id: 4, name: "Xét nghiệm máu 22 chỉ số", price: 650000, checked: false },
    { id: 5, name: "Tầm soát ung thư sớm", price: 2800000, checked: false },
    { id: 6, name: "Chụp CT-Scanner 128 lát", price: 1800000, checked: false },
    { id: 7, name: "Nội soi đại tràng trực tràng", price: 1700000, checked: false },
    { id: 8, name: "Đo mật độ loãng xương", price: 350000, checked: false },
    { id: 9, name: "Điện tâm đồ & Siêu âm tim", price: 850000, checked: false },
    { id: 10, name: "Xét nghiệm chức năng Gan/Thận", price: 400000, checked: false }
  ]);

  const doctors = [
    { id: 1, name: "GS. TS. NGUYỄN MẠNH DŨNG", specialization: "Nội Tổng Quát", fees: 2000000, info: "Giám đốc bệnh viện.", img: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg", vip: true },
    { id: 2, name: "PROF. ALEXANDER PIERCE", specialization: "Tim Mạch", fees: 1500000, info: "Chuyên gia từ Hoa Kỳ.", img: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg", vip: true },
    { id: 3, name: "DR. TAKASHI MURAKAMI", specialization: "Tiêu Hóa", fees: 1200000, info: "Bậc thầy nội soi Nhật Bản.", img: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg", vip: true },
    { id: 4, name: "GS. TS. TRẦN THỊ THANH", specialization: "Sản Phụ Khoa", fees: 1100000, info: "Chuyên gia đầu ngành Phụ sản.", img: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg", vip: true },
    { id: 5, name: "TS. BS. LÊ HOÀNG NAM", specialization: "Thần Kinh", fees: 600000, info: "Điều trị đột quỵ.", img: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg" },
    { id: 6, name: "DR. SHAUN MURPHY", specialization: "Nhi Khoa", fees: 750000, info: "Phẫu thuật nhi tài năng.", img: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg" },
    // --- CÁC BÁC SĨ MỚI THÊM VÀO (GIÁ THẤP HƠN NMD) ---
    { id: 7, name: "BS. PHẠM MINH TUẤN", specialization: "Nội Tổng Quát", fees: 500000, info: "Bác sĩ nội trú đại học Y Hà Nội.", img: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg" },
    { id: 8, name: "DR. ALLISON CAMERON", specialization: "Tim Mạch", fees: 950000, info: "Chuyên gia tim mạch trẻ.", img: "https://xsgames.co/randomusers/assets/avatars/female/8.jpg" },
    { id: 9, name: "BS. LÊ THU HÀ", specialization: "Sản Phụ Khoa", fees: 450000, info: "Tư vấn sức khỏe sinh sản.", img: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg" },
    { id: 10, name: "TS. BS. TRỊNH CÔNG SƠN", specialization: "Tiêu Hóa", fees: 800000, info: "Chuyên khoa gan mật.", img: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg" },
    { id: 11, name: "DR. ERIC FOREMAN", specialization: "Thần Kinh", fees: 900000, info: "Chẩn đoán hình ảnh thần kinh.", img: "https://xsgames.co/randomusers/assets/avatars/male/22.jpg" },
    { id: 12, name: "BS. VŨ HOÀNG YẾN", specialization: "Nhi Khoa", fees: 400000, info: "Chuyên gia nhi đồng.", img: "https://xsgames.co/randomusers/assets/avatars/female/25.jpg" }
  ];

  const handleBookClick = (doc) => {
    setSelectedDoctor(doc);
    setServices(services.map(s => ({...s, checked: false})));
    setStep(1);
    setModal(true);
  };

  const toggle = () => setModal(!modal);
  const formatCurrency = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  const calculateTotal = () => {
    const docFee = selectedDoctor ? selectedDoctor.fees : 0;
    const servFee = services.filter(s => s.checked).reduce((sum, s) => sum + s.price, 0);
    return docFee + servFee;
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Vui lòng chọn ngày và giờ khám!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      doctorFees: selectedDoctor.fees,
      specialization: selectedDoctor.specialization,
      selectedServices: services.filter(s => s.checked),
      date: selectedDate,
      time: selectedTime,
      status: "Pending", 
      patientName: "Bệnh Nhân Demo", 
      totalAmount: calculateTotal()
    };

    let appointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    appointments.push(newAppointment);
    localStorage.setItem("myAppointments", JSON.stringify(appointments));
    
    setModal(false);
    
    setTimeout(() => { 
      history.push({
        pathname: "/patient/payment",
        state: { appointment: newAppointment }
      }); 
    }, 200);
  };

  const filteredDocs = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterDept === "All" || doc.specialization === filterDept)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      <div className="container-fluid py-4" style={{ flex: 1 }}>
        <div className="row justify-content-center m-0">
          
          <div className="col-md-3 px-2">
            <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}>
              <LeftsidePatient />
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
              
              <div className="mb-2">
                <h4 className="font-weight-bold text-dark text-uppercase">🏥 Hệ thống chuyên gia y tế NMD</h4>
                <Row className="mt-3">
                  <Col md="6">
                    <Input type="text" placeholder="Tìm tên bác sĩ..." className="rounded-pill border-warning mb-2" style={{height: "45px"}} onChange={e => setSearchTerm(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <Input type="select" className="rounded-pill border-warning" style={{height: "45px"}} onChange={e => setFilterDept(e.target.value)}>
                      <option value="All">Tất cả chuyên khoa</option>
                      <option value="Nội Tổng Quát">Nội Tổng Quát</option>
                      <option value="Tim Mạch">Tim Mạch</option>
                      <option value="Tiêu Hóa">Tiêu Hóa</option>
                      <option value="Sản Phụ Khoa">Sản Phụ Khoa</option>
                      <option value="Thần Kinh">Thần Kinh</option>
                      <option value="Nhi Khoa">Nhi Khoa</option>
                    </Input>
                  </Col>
                </Row>
                <hr className="my-3" />
              </div>

              <div style={{ flex: 1, overflow: "hidden" }}>
                <Scrollbar noScrollX style={{ width: "100%", height: "100%" }} 
                  trackYProps={{ style: { backgroundColor: 'transparent', width: '6px' } }}
                  thumbYProps={{ style: { backgroundColor: '#ffc107', borderRadius: '10px' } }}>
                  <Row className="m-0">
                    {filteredDocs.map(doc => (
                      <Col md="4" key={doc.id} className="mb-4 px-2">
                        <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "15px", border: doc.vip ? "2px solid #ffc107" : "1px solid #eee" }}>
                          <img src={doc.img} alt="doc" style={{ height: "140px", objectFit: "cover", borderRadius: "15px 15px 0 0" }} />
                          <CardBody className="p-3 d-flex flex-column">
                            <small className="text-primary font-weight-bold">{doc.specialization}</small>
                            <h6 className="font-weight-bold my-1" style={{ fontSize: "14px" }}>{doc.name}</h6>
                            <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                              <span className="small font-weight-bold text-danger">{formatCurrency(doc.fees)}</span>
                              <Button color="primary" size="sm" className="rounded-pill px-3" onClick={() => handleBookClick(doc)}>ĐẶT LỊCH</Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Scrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .w-40 { width: 40%; }
        .modal-content { border-radius: 20px; border: none; }
      `}</style>

      <Modal isOpen={modal} toggle={toggle} centered size="lg" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ModalHeader toggle={toggle} className="border-0 font-weight-bold">📋 PHIẾU ĐĂNG KÝ KHÁM</ModalHeader>
          <ModalBody className="py-0">
            {step === 1 ? (
                <div className="px-2">
                    <h5 className="text-primary font-weight-bold">{selectedDoctor?.name}</h5>
                    <div className="bg-light p-3 rounded-lg mb-3 d-flex justify-content-between align-items-center" style={{borderRadius: "10px"}}>
                        <span className="font-weight-bold small">PHÍ KHÁM:</span>
                        <span className="text-primary font-weight-bold h5 mb-0">{selectedDoctor && formatCurrency(selectedDoctor.fees)}</span>
                    </div>
                    <Label className="font-weight-bold small text-muted">DỊCH VỤ ĐI KÈM:</Label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '10px' }} className="p-2 bg-white">
                        {services.map(s => (
                            <div key={s.id} className="d-flex justify-content-between align-items-center border-bottom py-2 px-2">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" style={{width:'18px', height:'18px'}} checked={s.checked} onChange={() => setServices(services.map(item => item.id === s.id ? {...item, checked: !item.checked} : item))} /> 
                                    <span className="ml-3" style={{fontSize: '14px'}}>{s.name}</span>
                                </div>
                                <span className="text-success font-weight-bold small">+{formatCurrency(s.price)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-4">
                    <Label className="font-weight-bold d-block">Chọn ngày & giờ khám:</Label>
                    <Input type="date" className="w-50 mx-auto rounded-pill mb-3" onChange={e => setSelectedDate(e.target.value)} />
                    <div className="d-flex justify-content-center flex-wrap">
                        {["08:00 AM", "09:30 AM", "14:00 PM", "15:30 PM"].map(t => (
                            <Button key={t} outline={selectedTime !== t} color="primary" className="m-2 rounded-pill" onClick={() => setSelectedTime(t)}>{t}</Button>
                        ))}
                    </div>
                </div>
            )}
            <div className="mx-2 mt-4 mb-3 p-3 bg-dark text-white d-flex justify-content-between align-items-center" style={{ borderRadius: "12px" }}>
                <span className="font-weight-bold small">TỔNG CỘNG:</span>
                <h3 className="text-warning mb-0 font-weight-bold">{formatCurrency(calculateTotal())}</h3>
            </div>
          </ModalBody>
          <ModalFooter className="border-0">
            <Button color="secondary" outline className="rounded-pill" onClick={toggle}>Hủy</Button>
            {step === 1 ? <Button color="primary" className="rounded-pill px-5" onClick={() => setStep(2)}>TIẾP THEO</Button> : <Button color="warning" className="rounded-pill px-5" onClick={confirmBooking}>XÁC NHẬN</Button>}
          </ModalFooter>
      </Modal>
    </div>
  );
};

export default SearchDoctor;