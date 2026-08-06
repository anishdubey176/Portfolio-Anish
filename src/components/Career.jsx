import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>10th Standard</h4>
                <h5>CBSE Board</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed my 10th standard education from the Central Board of Secondary Education (CBSE).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in Computer Science</h4>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed a Diploma in Computer Science with a strong focus on software engineering, web development, and database management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MERN Stack Developer</h4>
                <h5>Fresher</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Highly motivated and ready to begin my professional journey. Currently building personal projects and eager to apply my skills in a dynamic environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
