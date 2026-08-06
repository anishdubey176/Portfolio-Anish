import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1026px)", () => {
      let translateX = 0;

      function setTranslateX() {
        const box = document.getElementsByClassName("work-box");
        const rectLeft = document
          .querySelector(".work-container")
          .getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement.getBoundingClientRect().width;
        let padding =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
      }

      setTranslateX();

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`, // Use actual scroll width
          scrub: true,
          pin: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      // Clean up (optional, good practice)
      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    });
    
    return () => mm.revert();
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>TalentSync AI</h4>
                  <p>AI Interview Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, Tailwind CSS, JavaScript, Node.js, Express.js</p>
              <p style={{ marginTop: "10px" }}>An interview practice platform where users select their domain and experience to generate AI questions.</p>
            </div>
            <WorkImage image="/images/talentsync.jpg" alt="TalentSync AI" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>RaktSetu</h4>
                  <p>Blood Donation Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>HTML, CSS, JavaScript</p>
              <p style={{ marginTop: "10px" }}>A platform designed to help users find and donate blood easily to save lives.</p>
            </div>
            <WorkImage image="/images/raktsetu.jpg" alt="RaktSetu" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>3D Animated Portfolio</h4>
                  <p>Personal Website</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, Three.js, GSAP, CSS</p>
              <p style={{ marginTop: "10px" }}>An interactive 3D portfolio website featuring scroll animations and custom 3D models.</p>
            </div>
            <WorkImage image="/images/portfolio.jpg" alt="Portfolio" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
