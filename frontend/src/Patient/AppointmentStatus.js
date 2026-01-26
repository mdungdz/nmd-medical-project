import React, { useState, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import Footer from "../Basic/Footer"; 
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

const AppointmentStatus = () => {
    const [appointments, setAppointments] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // GIỮ NGUYÊN LOGIC CỦA BẠN
        const localApps = JSON.parse(localStorage.getItem("myAppointments") || "[]");
        const historyApps = JSON.parse(localStorage.getItem("historyData") || "[]");
        
        const pending = localApps.map(app => ({ ...app, status: "Pending" })); 
        const finished = historyApps.map(app => ({ ...app, status: "Finished" }));

        const combined = [...finished, ...pending];
        const uniqueData = combined.filter((v, i, a) => 
            a.findIndex(t => (t.date === v.date && t.doctorName === v.doctorName)) === i
        );

        setAppointments(uniqueData);
    }, []);

    const formatCurrency = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

    const deleteAppointment = (index) => {
        const deletedItem = appointments[index];
        const updatedApps = [...appointments];
        updatedApps.splice(index, 1);
        
        setAppointments(updatedApps);
        
        if (deletedItem.status === "Finished") {
            const historyData = JSON.parse(localStorage.getItem("historyData") || "[]");
            const filtered = historyData.filter(app => app.date !== deletedItem.date);
            localStorage.setItem("historyData", JSON.stringify(filtered));
        } else {
            const myApps = JSON.parse(localStorage.getItem("myAppointments") || "[]");
            const filtered = myApps.filter(app => app.date !== deletedItem.date);
            localStorage.setItem("myAppointments", JSON.stringify(filtered));
        }
    };

    const goToPayment = (app) => {
        history.push({
            pathname: "/patient/payment",
            state: { appointment: app }
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#000", fontFamily: "'Inter', sans-serif" }}>
            <Navbar />
            
            <div className="container-fluid py-4" style={{ flex: 1 }}>
                <div className="row justify-content-center m-0">
                    
                    {/* CỘT TRÁI - MENU (Độ cao 82vh đồng bộ) */}
                    <div className="col-md-3 px-2">
                        <div className="bg-white p-3 shadow-sm" style={{ borderRadius: "20px", height: "82vh" }}>
                            <Leftside />
                        </div>
                    </div>

                    {/* CỘT PHẢI - NỘI DUNG (Độ cao 82vh, viền vàng đồng bộ) */}
                    <div className="col-md-9 px-2">
                        <div className="bg-white shadow-lg p-0" style={{ 
                            borderRadius: "20px", 
                            height: "82vh", 
                            borderLeft: "15px solid #ffc107", 
                            display: "flex", 
                            flexDirection: "column",
                            overflow: "hidden"
                        }}>
                            
                            {/* Header nội dung */}
                            <div className="p-4 bg-white border-bottom">
                                <h4 className="mb-0 font-weight-bold text-dark text-uppercase">🏥 TRẠNG THÁI & LỊCH SỬ KHÁM</h4>
                            </div>
                            
                            {/* Khu vực bảng có Scrollbar vàng */}
                            <div style={{ flex: 1, overflow: "hidden" }} className="p-4">
                                <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}
                                    trackYProps={{ style: { backgroundColor: 'transparent', width: '6px' } }}
                                    thumbYProps={{ style: { backgroundColor: '#ffc107', borderRadius: '10px' } }}>
                                    
                                    <Table hover borderless className="align-middle">
                                        <thead className="bg-light">
                                            <tr className="text-muted small text-uppercase">
                                                <th className="py-3">THỜI GIAN</th>
                                                <th className="py-3">BÁC SĨ</th>
                                                <th className="py-3 text-center">CHI PHÍ</th>
                                                <th className="py-3 text-center">THAO TÁC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.length > 0 ? appointments.map((app, index) => {
                                                const isPaid = app.status === "Finished" || app.status?.includes("Paid");
                                                
                                                return (
                                                    <tr key={index} className="border-bottom">
                                                        <td className="py-4">
                                                            <span className="d-block font-weight-bold text-dark">{app.date}</span>
                                                            <small className="text-primary font-weight-bold">{app.time || "09:30 AM"}</small>
                                                        </td>
                                                        <td className="py-4 font-weight-bold text-dark">BS. {app.doctorName}</td>
                                                        <td className="py-4 text-center text-danger font-weight-bold">
                                                            {formatCurrency(app.totalAmount || 2450000)}
                                                        </td>
                                                        <td className="py-4 text-center">
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                {isPaid ? (
                                                                    <>
                                                                        <span className="text-success font-weight-bold mr-3 small">✓ ĐÃ THANH TOÁN</span>
                                                                        <Button color="info" size="sm" className="rounded-pill px-3 mr-2 shadow-sm font-weight-bold" onClick={() => goToPayment(app)}>BILL</Button>
                                                                    </>
                                                                ) : (
                                                                    <Button color="primary" size="sm" className="rounded-pill px-3 mr-3 shadow-sm font-weight-bold" onClick={() => goToPayment(app)}>THANH TOÁN</Button>
                                                                )}
                                                                <Button color="link" className="text-danger p-0 font-weight-bold small" style={{textDecoration: "none"}} onClick={() => deleteAppointment(index)}>XÓA</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }) : (
                                                <tr><td colSpan="4" className="text-center py-5 text-muted">Chưa có dữ liệu lịch hẹn</td></tr>
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
        </div>
    );
};

export default AppointmentStatus;