import React, { useState, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Table, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Scrollbar from "react-scrollbars-custom";
import { FaStar, FaRegFileAlt } from "react-icons/fa"; 

const PerviousAppointments = () => {
    // --- GIỮ NGUYÊN TOÀN BỘ STATE CỦA BẠN ---
    const [history, setHistory] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(0);   

    const toggle = () => {
        setModal(!modal);
        if (!modal) { setRating(0); setFeedback(""); } 
    };

    // --- GIỮ NGUYÊN LOGIC GET DATA ---
    useEffect(() => {
        const data1 = localStorage.getItem("myAppointments");
        const data2 = localStorage.getItem("historyData");
        const data3 = sessionStorage.getItem("historyData"); 
        
        let combinedData = [];
        if (data1) combinedData = [...combinedData, ...JSON.parse(data1)];
        if (data2) combinedData = [...combinedData, ...JSON.parse(data2)];
        if (data3) combinedData = [...combinedData, ...JSON.parse(data3)];

        const finalData = combinedData.filter(app => 
            app.status === "Finished" || app.status?.includes("Paid")
        );

        const uniqueData = finalData.filter((v, i, a) => 
            a.findIndex(t => (t.date === v.date && t.doctorName === v.doctorName)) === i
        );

        setHistory(uniqueData);
    }, []);

    // --- GIỮ NGUYÊN LOGIC DELETE ---
    const deleteRecord = (index) => {
        const updatedHistory = [...history];
        updatedHistory.splice(index, 1);
        setHistory(updatedHistory);
        localStorage.setItem("historyData", JSON.stringify(updatedHistory));
        localStorage.setItem("myAppointments", JSON.stringify(updatedHistory));
        sessionStorage.removeItem("historyData");
    };

    const handleFeedbackOpen = (app) => {
        setSelectedApp(app);
        toggle();
    };

    // --- GIỮ NGUYÊN LOGIC SUBMIT FEEDBACK ---
    const submitFeedback = () => {
        if (rating === 0) {
            alert("Vui lòng chọn số sao đánh giá!");
            return;
        }
        const patientNameActive = window.localStorage.getItem("patientName") || "Bệnh nhân ẩn danh";
        const updatedHistory = history.map(app => {
            if (app.date === selectedApp.date && app.doctorName === selectedApp.doctorName) {
                return { 
                    ...app, 
                    patientName: patientNameActive, 
                    rating: rating,
                    feedbackContent: feedback,
                    status: "Finished",
                    hasFeedback: true 
                };
            }
            return app;
        });
        setHistory(updatedHistory);
        localStorage.setItem("historyData", JSON.stringify(updatedHistory));
        localStorage.setItem("myAppointments", JSON.stringify(updatedHistory));
        alert(`Cảm ơn bạn đã đánh giá ${rating} sao!`);
        toggle();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000", fontFamily: "'Inter', sans-serif" }}>
            <Navbar />
            
            <div className="container-fluid py-4" style={{ flex: 1 }}>
                <div className="row justify-content-center m-0">
                    
                    {/* CỘT TRÁI - MENU (Sửa lại height thành 82vh) */}
                    <div className="col-md-3 px-2">
                        <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}>
                            <Leftside />
                        </div>
                    </div>

                    {/* CỘT PHẢI - NỘI DUNG (Sửa lại height thành 82vh và viền vàng) */}
                    <div className="col-md-9 px-2">
                        <div className="bg-white shadow-lg p-0" style={{ 
                            borderRadius: "20px", 
                            height: "82vh", 
                            borderLeft: "15px solid #ffc107", 
                            display: "flex", 
                            flexDirection: "column",
                            overflow: "hidden"
                        }}>
                            
                            <div className="p-4 bg-white border-bottom d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="mb-0 font-weight-bold text-dark text-uppercase">📜 LỊCH SỬ KHÁM</h4>
                                    <p className="text-muted small mb-0">Danh sách các ca khám đã hoàn tất</p>
                                </div>
                                <Badge color="warning" className="p-2 text-dark px-3 font-weight-bold rounded-pill">
                                    TỔNG SỐ: {history.length}
                                </Badge>
                            </div>
                            
                            <div style={{ flex: 1, overflow: "hidden" }} className="p-4">
                                <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}
                                    trackYProps={{ style: { backgroundColor: 'transparent', width: '6px' } }}
                                    thumbYProps={{ style: { backgroundColor: '#ffc107', borderRadius: '10px' } }}>
                                    
                                    <Table hover borderless className="align-middle">
                                        <thead className="bg-light">
                                            <tr className="text-muted small text-uppercase">
                                                <th className="py-3">Thông tin bác sĩ</th>
                                                <th className="py-3 text-center">Thời gian khám</th>
                                                <th className="py-3 text-center">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.length > 0 ? history.map((app, index) => (
                                                <tr key={index} className="border-bottom">
                                                    <td className="py-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-warning rounded-circle d-flex justify-content-center align-items-center mr-3" style={{width: "40px", height: "40px", flexShrink: 0}}>
                                                                <FaRegFileAlt className="text-dark" />
                                                            </div>
                                                            <div>
                                                                <div className="font-weight-bold text-dark">BS. {app.doctorName}</div>
                                                                <div className="text-muted small">{app.specialization || "Chuyên khoa"}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <div className="font-weight-bold text-dark">{app.date}</div>
                                                        <Badge color="light" className="text-primary border rounded-pill mt-1 px-2">
                                                            {app.time || "08:30 AM"}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <Button color="warning" size="sm" className="font-weight-bold rounded-pill px-3 shadow-sm mr-2"
                                                                onClick={() => handleFeedbackOpen(app)}>
                                                            {app.hasFeedback ? "ĐÃ ĐÁNH GIÁ ✓" : "ĐÁNH GIÁ ⭐"}
                                                        </Button>
                                                        <Button color="link" className="text-danger small font-weight-bold" 
                                                                style={{ textDecoration: "none" }}
                                                                onClick={() => deleteRecord(index)}>XÓA</Button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-5">
                                                        <p className="text-muted">Chưa tìm thấy lịch sử khám bệnh.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* MODAL CỦA BẠN - GIỮ NGUYÊN STYLE */}
            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle} className="border-0 pb-0">
                    <span className="font-weight-bold text-uppercase">Đánh giá bác sĩ</span>
                </ModalHeader>
                <ModalBody className="text-center py-4">
                    <h5 className="mb-1">BS. {selectedApp?.doctorName}</h5>
                    <div className="mb-4 mt-3">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i} className="mb-0" style={{ cursor: 'pointer' }}>
                                    <input type="radio" name="rating" style={{ display: 'none' }} value={ratingValue} onClick={() => setRating(ratingValue)} />
                                    <FaStar 
                                        size={35} 
                                        className="mx-1" 
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <Input type="textarea" rows="4" className="border-0 bg-light rounded shadow-sm"
                           placeholder="Cảm nhận của bạn về buổi khám..." 
                           value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </ModalBody>
                <ModalFooter className="border-0 pt-0 justify-content-center">
                    <Button color="dark" onClick={toggle} className="rounded-pill px-4 mr-2">Đóng</Button>
                    <Button color="warning" className="rounded-pill px-4 font-weight-bold" onClick={submitFeedback}>
                        Gửi phản hồi
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default PerviousAppointments;