import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const PatientLogin = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Thêm state để quản lý lỗi
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi mỗi lần bấm lại

        // Kiểm tra mật khẩu cố định 123456
        if (password === "123456") {
            window.localStorage.setItem("patientName", name);
            window.localStorage.setItem("role", "patient");
            history.push("/patient");
        } else {
            // Thay vì dùng alert thô, mình set thông báo lỗi vào state
            setError("Tài khoản chưa tồn tại hoặc mật khẩu 123456 không đúng!");
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh", backgroundColor: "#1a1a1a" }}>
            <Navbar />
            
            <div style={{ display: "flex", alignItems: "center", padding: "60px 0" }}>
                <Container>
                    <Row className="justify-content-center m-0">
                        <Col md="5" className="bg-white p-0 shadow" style={{ borderRadius: "15px", overflow: "hidden" }}>
                            <div className="bg-primary text-white text-center py-3">
                                <h5 className="mb-0 font-weight-bold">BỆNH NHÂN ĐĂNG NHẬP</h5>
                            </div>
                            
                            <div className="p-4">
                                <Form onSubmit={handleLogin}>
                                    <FormGroup>
                                        <Label className="text-dark font-weight-bold">Họ tên người dùng</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập họ tên..." 
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                            className="py-2"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="text-dark font-weight-bold">Mật khẩu</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="Nhập 123456..." 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                            className="py-2"
                                        />
                                    </FormGroup>

                                    {/* HIỂN THỊ THÔNG BÁO LỖI CHỮ ĐỎ Ở ĐÂY */}
                                    {error && (
                                        <div style={{ color: "#e11d48", fontSize: "13px", marginTop: "10px", fontWeight: "bold", textAlign: "center" }}>
                                            <i className="fa fa-exclamation-circle mr-1"></i> {error}
                                        </div>
                                    )}
                                    
                                    <Button color="primary" block className="mt-4 py-2 font-weight-bold text-uppercase" type="submit">
                                        Xác nhận
                                    </Button>

                                    <div className="mt-3 text-center" style={{ fontSize: "14px" }}>
                                        <span className="text-muted">Chưa có tài khoản? </span>
                                        <span 
                                            onClick={() => history.push("/registration")}
                                            style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                                        >
                                            Đăng ký ngay
                                        </span>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <Footer />
        </div>
    );
};

export default PatientLogin;