import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const DoctorLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        const data = sessionStorage.getItem("myAppointments");
        if (data) {
            const appointments = JSON.parse(data);
            if (appointments.length > 0) {
                const latestDoctor = appointments[appointments.length - 1].doctorName;
                setUsername(latestDoctor);
            }
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault(); 
        
        // CHỈ SỬA LOGIC KHÓA NICK TẠI ĐÂY
        const adminNick = "GS. TS. NGUYỄN MẠNH DŨNG";
        
        if (username === adminNick && password === "123456") {
            window.localStorage.setItem("doctorName", username);
            window.localStorage.setItem("role", "doctor");
            alert(`Chào bác sĩ Dũng! Đăng nhập thành công.`);
            history.push("/doctor/dashboard"); 
        } else {
            alert("Đây là tài khoản riêng của GS. TS. Nguyễn Mạnh Dũng. Vui lòng kiểm tra lại!");
        }
    };

    return (
        <div style={{ 
            display: "grid",
            gridTemplateRows: "auto 1fr auto", 
            minHeight: "100vh",
            backgroundColor: "#1a1a1a" // Nền tối sang trọng của ông
        }}>
            <Navbar />
            
            <div style={{ display: "flex", alignItems: "center", padding: "50px 0" }}>
                <Container>
                    <Row className="justify-content-center m-0">
                        <Col md="5" className="bg-white p-4 shadow-lg" style={{ borderRadius: "15px" }}>
                            <div className="text-center mb-4">
                                <h4 className="text-dark font-weight-bold">BÁC SĨ ĐĂNG NHẬP</h4>
                                <div style={{ height: "3px", width: "50px", backgroundColor: "#007bff", margin: "10px auto" }}></div>
                            </div>
                            
                            <Form onSubmit={handleLogin}>
                                <FormGroup>
                                    <Label className="text-dark font-weight-bold">Bác sĩ trực</Label>
                                    <Input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tên bác sĩ"
                                        style={{ 
                                            backgroundColor: "#f8f9fa", 
                                            border: "1px solid #ced4da",
                                            borderRadius: "8px",
                                            padding: "12px",
                                            fontWeight: "bold"
                                        }} 
                                    />
                                </FormGroup>
                                
                                <FormGroup className="mt-3">
                                    <Label className="text-dark font-weight-bold">Mật khẩu xác nhận</Label>
                                    <Input 
                                        type="password" 
                                        placeholder="Nhập 123456" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ 
                                            borderRadius: "8px",
                                            padding: "12px"
                                        }}
                                        required 
                                    />
                                </FormGroup>
                                
                                <Button 
                                    color="primary" 
                                    block 
                                    className="mt-4 py-2 font-weight-bold shadow-sm" 
                                    type="submit"
                                    style={{ borderRadius: "8px", fontSize: "16px" }}
                                >
                                    VÀO BẢNG ĐIỀU KHIỂN
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default DoctorLogin;