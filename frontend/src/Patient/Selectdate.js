import React, { useState } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import "react-calendar/dist/Calendar.css";
import { Button, Table } from "reactstrap";
import Calendar from "react-calendar";

const Selectdate = (props) => {
  const [date, setDate] = useState(new Date());
  // "CÔNG TẮC": Nếu false thì hiện Lịch, nếu true thì hiện Bảng Giờ
  const [showSlots, setShowSlots] = useState(false);

  // Lấy thông tin bác sĩ từ trang trước hoặc dùng tên mặc định
  const selectedDoctor = props.location?.doctor?.doctor || {
    name: "NGUYEN MANH DUNG",
  };

  // Danh sách khung giờ khám
  const slots = [
    { id: 1, time: "09:00:00" },
    { id: 2, time: "12:00:00" },
    { id: 3, time: "15:00:00" },
  ];

  // Logic để chặn không cho chọn ngày quá khứ
  var previous = new Date();
  previous.setDate(previous.getDate() - 1);

  // Hàm xử lý khi nhấn "Book Now"
  const handleBooking = (slotTime) => {
    // 1. Đóng gói thông tin lịch hẹn
    const appointmentInfo = {
      date: date.toDateString(),
      time: slotTime,
      doctorName: selectedDoctor.name,
      status: "Confirmed (At Hospital)", // Trạng thái khám tại viện
    };

    // 2. Lưu vào sessionStorage (Dữ liệu sẽ MẤT khi tắt trình duyệt)
    const currentData = JSON.parse(
      sessionStorage.getItem("myAppointments") || "[]"
    );
    currentData.push(appointmentInfo);
    sessionStorage.setItem("myAppointments", JSON.stringify(currentData));

    // 3. Thông báo cho người dùng
    alert(
      `Successfully booked! Please come to the hospital at ${slotTime} on ${date.toDateString()}.`
    );

    // 4. Chuyển sang trang xem trạng thái lịch hẹn
    props.history.push("/patient/appointment-status");
  };

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="row m-5" style={{ maxWidth: "100%" }}>
        {/* Thanh bên trái */}
        <div className="col-3 col-md-3 p-4 bg-white" style={{ height: "80vh" }}>
          <Leftside />
        </div>

        {/* Khu vực chính nội dung */}
        <div
          className="col-9 col-md-9 p-4 text-white text-center"
          style={{
            border: "15px solid yellow",
            minHeight: "80vh",
            backgroundColor: "#6c757d",
          }}
        >
          {!showSlots ? (
            /* --- GIAO DIỆN CHỌN NGÀY --- */
            <div>
              <h2 className="mb-4 text-uppercase font-weight-bold">Select Appointment Date</h2>
              <div className="d-flex justify-content-center">
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    color: "black",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
                  }}
                >
                  <Calendar
                    tileDisabled={({ date }) =>
                      date.getDay() === 0 || date < previous
                    }
                    onChange={setDate}
                    value={date}
                  />
                  <p className="mt-3 font-weight-bold text-primary">
                    Selected: {date.toDateString()}
                  </p>
                </div>
              </div>
              <Button
                color="primary"
                className="mt-5 px-5 btn-lg shadow"
                onClick={() => setShowSlots(true)}
              >
                Confirm And View Slots
              </Button>
            </div>
          ) : (
            /* --- GIAO DIỆN CHỌN GIỜ --- */
            <div>
              <h2 className="mb-4 text-uppercase font-weight-bold">Available Slots</h2>
              <p className="mb-4 bg-dark py-2 rounded">
                Doctor: <span className="text-warning">{selectedDoctor.name}</span> | Date: <span className="text-warning">{date.toDateString()}</span>
              </p>
              
              <div className="mx-auto" style={{ maxWidth: "90%" }}>
                <Table dark hover bordered responsive>
                  <thead>
                    <tr className="bg-primary text-white">
                      <th>Time Slot</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot.id}>
                        <td className="align-middle font-weight-bold">{slot.time}</td>
                        <td>
                          <Button
                            color="success"
                            size="sm"
                            className="px-4"
                            onClick={() => handleBooking(slot.time)}
                          >
                            Book Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Button
                color="danger"
                className="mt-4 shadow"
                onClick={() => setShowSlots(false)}
              >
                ← Back to Calendar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Selectdate;