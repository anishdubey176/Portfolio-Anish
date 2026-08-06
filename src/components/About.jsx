import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          MERN Stack Developer passionate about building modern web applications.
          I'm focused on creating responsive, user-friendly, and modern web applications.
          I enjoy turning ideas into real-world products using clean code and modern technologies.
        </p>
        <p className="para" style={{ marginTop: '20px' }}>
          I continuously explore new technologies and improve my development skills by building practical projects.
        </p>
      </div>
    </div>
  );
};

export default About;
