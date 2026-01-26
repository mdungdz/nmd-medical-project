//QUẢN LÝ LỊCH TRỰC
import React, { useState, useEffect } from "react";

const TodaysSchedule = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // 1. Lấy danh sách đã khám xong (để lọc bỏ khỏi danh sách chờ)
    const finishedData = JSON.parse(localStorage.getItem("historyData") || "[]");
    const finishedKeys = finishedData.map(app => (app.id || app.patientName));

    // 2. Lấy danh sách bệnh nhân thực tế đăng ký từ localStorage
    const savedAppointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    
    // 3. LẤY TÊN BÁC SĨ ĐANG ĐĂNG NHẬP
    const doctorNameRaw = window.localStorage.getItem("doctorName") || "Nguyễn Mạnh Dũng";
    
    // Hàm rút gọn tên để so sánh (Ví dụ: "GS. TS. Nguyễn Mạnh Dũng" -> "nguyenmanhdung")
    const simplify = (name) => {
      if (!name) return "";
      return name
        .toLowerCase()
        .replace(/gs\.|ts\.|bs\.|prof\.|dr\./gi, "")
        .replace(/\s+/g, "") // Xóa sạch khoảng trắng
        .trim();
    };

    const currentDoctorSimple = simplify(doctorNameRaw);
    
    // LỌC BỆNH NHÂN THẬT
    const realPatients = savedAppointments.filter(app => {
      const appDoctorSimple = simplify(app.doctorName);
      // Chỉ cần tên bác sĩ trong lịch hẹn chứa tên bác sĩ đang đăng nhập hoặc ngược lại
      return appDoctorSimple.includes(currentDoctorSimple) || currentDoctorSimple.includes(appDoctorSimple);
    });

    const targetDate = realPatients.length > 0 ? realPatients[0].date : "2025-02-04";

    // 4. GIỮ NGUYÊN DANH SÁCH BỆNH NHÂN ẢO CỦA BẠN
    const mockPatients = [
      { id: "MOCK1", date: targetDate, time: "07:30 AM", patientName: "Phạm Thu Hà" },
      { id: "MOCK2", date: targetDate, time: "08:00 AM", patientName: "Nguyễn Minh Triết" },
      { id: "MOCK3", date: targetDate, time: "08:15 AM", patientName: "Trần Thị Thanh Thảo" },
      { id: "MOCK4", date: targetDate, time: "08:45 AM", patientName: "Lê Minh Hoàng" },
      { id: "MOCK5", date: targetDate, time: "09:15 AM", patientName: "Võ Văn Thưởng" },
      { id: "MOCK6", date: targetDate, time: "09:30 AM", patientName: "Hoàng Ngọc Linh" },
      { id: "MOCK7", date: targetDate, time: "10:00 AM", patientName: "Nguyễn Thị Kim Ngân" },
      { id: "MOCK8", date: targetDate, time: "10:15 AM", patientName: "Vũ Hải Đăng" },
      { id: "MOCK9", date: targetDate, time: "11:00 AM", patientName: "Đặng Phương Nam" },
      { id: "MOCK10", date: targetDate, time: "13:30 PM", patientName: "Bùi Tuyết Mai" },
      { id: "MOCK11", date: targetDate, time: "14:15 PM", patientName: "Ngô Quang Huy" },
      { id: "MOCK12", date: targetDate, time: "15:00 PM", patientName: "Trịnh Kim Chi" },
      { id: "MOCK13", date: targetDate, time: "15:45 PM", patientName: "Lý Gia Bảo" },
      { id: "MOCK14", date: targetDate, time: "16:30 PM", patientName: "Chu Ngọc Anh" }
    ];

    // 5. GỘP DỮ LIỆU: Bệnh nhân thật sẽ luôn được đẩy lên đầu để bạn dễ thấy
    const combined = [...realPatients, ...mockPatients]
      .filter(app => !finishedKeys.includes(app.id || app.patientName))
      .sort((a, b) => {
        // Ưu tiên bệnh nhân thật (không phải MOCK) lên trước
        const isAMock = a.id?.toString().includes("MOCK");
        const isBMock = b.id?.toString().includes("MOCK");
        if (!isAMock && isBMock) return -1;
        if (isAMock && !isBMock) return 1;
        return 0;
      });

    setAppointments(combined);
  }, []);

  const handleFinishExam = (patient) => {
    const finished = JSON.parse(localStorage.getItem("historyData") || "[]");
    const newRecord = { 
      ...patient, 
      finishTime: new Date().toLocaleTimeString(), 
      status: "Finished" 
    };
    localStorage.setItem("historyData", JSON.stringify([newRecord, ...finished]));
    
    const savedAppointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    const updatedAppointments = savedAppointments.filter(app => 
      (app.id || app.patientName) !== (patient.id || patient.patientName)
    );
    localStorage.setItem("myAppointments", JSON.stringify(updatedAppointments));

    setAppointments(prev => prev.filter(item => (item.id || item.patientName) !== (patient.id || patient.patientName)));
    alert(`Hoàn thành ca khám cho: ${patient.patientName}`);
  };

  return (
    <div className="table-responsive animate__animated animate__fadeIn">
      <table className="table table-hover border shadow-sm">
        <thead className="bg-dark text-white">
          <tr>
            <th className="py-3">Ngày khám</th>
            <th className="py-3">Giờ khám</th>
            <th className="py-3">Tên Bệnh Nhân</th>
            <th className="py-3 text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app, index) => (
            <tr key={index} style={{ 
              verticalAlign: "middle",
              backgroundColor: !app.id?.toString().includes("MOCK") ? "#fff9db" : "transparent" 
            }}>
              <td className="py-3">{app.date}</td>
              <td className="py-3 font-weight-bold">{app.time}</td>
              <td className="py-3 text-primary font-weight-bold">
                {app.patientName} {!app.id?.toString().includes("MOCK") ? "⭐" : ""}
              </td>
              <td className="py-3 text-center">
                <button onClick={() => handleFinishExam(app)} className="btn btn-primary btn-sm px-4 shadow-sm">
                  Khám
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysSchedule;