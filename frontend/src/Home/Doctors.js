import React, { useState, useEffect } from "react";

const Doctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const doctorList = [
    {
      id: 1,
      name: "GS. TS. NGUYỄN MẠNH DŨNG",
      specialization: "Nội Tổng Quát",
      exp: "35 năm kinh nghiệm",
      img: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      highlight: "Giám đốc chuyên môn tại NMD Medical với hơn 35 năm cống hiến trong ngành Y. Nguyên là giảng viên cao cấp tại Đại học Y Hà Nội, Giáo sư Dũng đã đào tạo hàng ngàn thế hệ bác sĩ và trực tiếp tham gia xử lý các ca bệnh nội khoa phức tạp, mang lại hy vọng cho rất nhiều bệnh nhân trên khắp cả nước."
    },
    {
      id: 2,
      name: "PROF. ALEXANDER PIERCE",
      specialization: "Tim Mạch",
      exp: "25 năm kinh nghiệm",
      img: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
      highlight: "Chuyên gia đầu ngành về phẫu thuật tim mạch từ Hoa Kỳ. Ông sở hữu hơn 20 bằng sáng chế về thiết bị hỗ trợ tim và là tác giả của hàng loạt công trình nghiên cứu được đăng tải trên tạp chí The Lancet. Tại NMD, ông trực tiếp điều hành trung tâm can thiệp tim mạch kỹ thuật cao theo tiêu chuẩn quốc tế."
    },
    {
      id: 3,
      name: "DR. TAKASHI MURAKAMI",
      specialization: "Tiêu Hóa",
      exp: "20 năm kinh nghiệm",
      img: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
      highlight: "Bậc thầy nội soi tiêu hóa đến từ Nhật Bản. Bác sĩ Murakami nổi tiếng với kỹ thuật nội soi không đau và tầm soát sớm ung thư đường tiêu hóa bằng công nghệ AI hiện đại nhất. Với sự tỉ mỉ đặc trưng của người Nhật, ông đảm bảo mỗi quy trình thăm khám đều đạt độ chính xác tuyệt đối và an toàn cho bệnh nhân."
    },
    {
      id: 4,
      name: "GS. TS. TRẦN THỊ THANH",
      specialization: "Sản Phụ Khoa",
      exp: "30 năm kinh nghiệm",
      img: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
      highlight: "Chuyên gia đầu ngành Phụ sản và Hiếm muộn với trái tim nhân hậu. Bà đã hỗ trợ thành công cho hơn 5.000 cặp vợ chồng đón thiên thần nhỏ nhờ ứng dụng các phương pháp hỗ trợ sinh sản tiên tiến nhất. GS. Thanh không chỉ giỏi chuyên môn mà còn luôn đồng hành, thấu hiểu tâm lý bệnh nhân trong suốt hành trình điều trị."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === doctorList.length - 1 ? 0 : prev + 1));
    }, 5000); // Tăng lên 5 giây để người dùng kịp đọc nội dung dài
    return () => clearInterval(timer);
  }, [doctorList.length]);

  return (
    <section id="bac-si" className="doctors-carousel-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="premium-tag">BOARD OF DIRECTORS</span>
          <h2 className="premium-title">Hội Đồng <span className="gold-text">Chuyên Gia</span></h2>
          <div className="premium-accent-line"></div>
        </div>

        <div className="carousel-wrapper">
          {doctorList.map((doc, index) => (
            <div 
              key={doc.id} 
              className={`doctor-slide ${index === currentIndex ? "active" : ""}`}
            >
              <div className="row align-items-center">
                {/* Phần ảnh bên trái - Giữ nguyên Portrait Frame */}
                <div className="col-lg-5 text-center">
                  <div className="expert-portrait-frame">
                    <img src={doc.img} alt={doc.name} className="expert-img" />
                    <div className="exp-badge-float">{doc.exp}</div>
                  </div>
                </div>

                {/* Phần thông tin bên phải - Kéo dài và tinh chỉnh */}
                <div className="col-lg-7">
                  <div className="expert-bio-box">
                    <span className="bio-spec">{doc.specialization}</span>
                    <h3 className="bio-name">{doc.name}</h3>
                    <div className="bio-divider"></div>
                    {/* Nội dung feedback dài hơn để trông đầy đặn */}
                    <p className="bio-text">{doc.highlight}</p>
                    
                    <div className="carousel-nav">
                      {doctorList.map((_, i) => (
                        <button 
                          key={i} 
                          className={`nav-dot ${i === currentIndex ? "active" : ""}`}
                          onClick={() => setCurrentIndex(i)}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .doctors-carousel-section {
          padding: 100px 0;
          background-color: #002d52; /* Màu xanh Navy đậm */
          min-height: 800px; /* Tăng nhẹ chiều cao để chứa nội dung dài */
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .premium-tag {
          color: #b8965d;
          letter-spacing: 5px;
          font-size: 12px;
          font-weight: 700;
          display: block;
          margin-bottom: 10px;
        }

        .premium-title {
          color: #ffffff;
          font-size: 3rem;
          font-weight: 900;
          margin: 0;
        }

        .gold-text { color: #b8965d; }

        .premium-accent-line {
          width: 60px;
          height: 3px;
          background: #b8965d;
          margin: 20px auto 0;
        }

        .carousel-wrapper {
          position: relative;
          height: 480px; /* Tăng chiều cao để không bị tràn chữ */
          margin-top: 60px;
        }

        .doctor-slide {
          position: absolute;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(20px);
        }

        .doctor-slide.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .expert-portrait-frame {
          position: relative;
          width: 350px; /* Tăng nhẹ kích thước ảnh */
          height: 350px;
          margin: 0 auto;
          border: 3px solid #b8965d;
          border-radius: 50%;
          padding: 15px;
          box-shadow: 0 0 50px rgba(184, 150, 93, 0.1);
        }

        .expert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .exp-badge-float {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: #b8965d;
          color: white;
          padding: 10px 25px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .expert-bio-box {
          padding-left: 60px;
          color: white;
        }

        .bio-spec {
          color: #b8965d;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .bio-name {
          font-size: 2.8rem;
          font-weight: 900;
          margin: 15px 0;
          line-height: 1.2;
        }

        .bio-divider {
          width: 80px;
          height: 4px;
          background: #b8965d;
          margin-bottom: 30px;
        }

        .bio-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #e2e8f0;
          max-width: 650px;
          margin-bottom: 45px;
          font-weight: 300;
        }

        .carousel-nav {
          display: flex;
          gap: 15px;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .nav-dot.active {
          background: #b8965d;
          width: 50px;
          border-radius: 10px;
        }

        @media (max-width: 991px) {
          .expert-bio-box { padding-left: 0; text-align: center; margin-top: 50px; }
          .expert-portrait-frame { width: 280px; height: 280px; }
          .bio-name { font-size: 2rem; }
          .carousel-wrapper { height: auto; }
          .doctor-slide { position: relative; display: none; transform: none; }
          .doctor-slide.active { display: block; }
          .bio-divider { margin: 0 auto 30px; }
          .carousel-nav { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Doctors;