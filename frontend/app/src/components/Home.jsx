import "./Home.css";
import verifiedIcon from "../assets/verified.png";
import master from "../assets/masterpanel.png";
import video from "../assets/vedio.png";
import rect from "../assets/Rectangle.png";
import stars from "../assets/stars.png";
import code from "../assets/coding.png";
import icon from "../assets/js.png";
import icon2 from "../assets/python.png";
import icon3 from "../assets/react.png";


const Home = () => {
  return (
    <div className="wrapper">
      <div className="main">
        <div>
          <div className="all-veri">
            <div><img src={verifiedIcon} alt="Verified Icon" className="veri-icon" /></div>
            <div className="veri"><p className="veri-text">Verified by Unacademy & Coursera</p></div>
          </div>
          <h1 className="learn">Learn Code</h1>
          <h1 className="learn1">From Top Coder!</h1>
          <p className="description">Get quality courses with the best prices. Now you 
          can get the best course from us. We have top mentors 
          around the globe. </p>

          <div className="get">
            <div><button className="start">Get Started</button></div>
            <div><button className="start1"><img src={video} alt="Verified Icon" className="video" /><p>How it works</p></button></div>
          </div>
        </div>

        <div>
          <img src={master} alt="teachers" className="master" />
        </div>
      </div>

      <div className="rect-container">
        <img src={rect} alt="rectangle" className="rect" />

        <div className="white-div white-div-1">
          <p className="stud">OUR STUDENTS</p>
        <p className="train"><b className="num1">14K+</b>trainned students</p>
        </div>

        <div className="white-div white-div-2">
          <p className="stud">COURSES</p>
          <div className="para">Get quality courses 
          with the best mentor</div>
          <h1 className="num">3000+</h1>

          </div>

          <div className="white-div white-div-3">
  <p className="stud">MENTORS</p>
  <div className="stars-container">
    <img src={stars} alt="rating" className="star" />
    <h1 className="mentor-count">320+</h1>
  </div>
  <p className="rate"><b>60+ Rated mentor</b></p>
</div>
      </div>
<div className="battle">
<div className="quiz">
<h1 className="adv">Being Your Coding Adventure</h1>
<p className="level">level up your coding skills through interactive challenges, battles, and quests. 
  Join thousands of developers in epic coding journey.</p>

  <div className="btn">
  <button className="quest">Start Quiz</button>
  <button className="quest1">Join Battle</button>
</div>

</div>

<div className="code">
<img src={code} alt="coding" className="code" />
</div>
</div>

<h1 className="path">Choosing Your Learning Path</h1>
<div className="flex">
<div className="learning">
  <img src={icon} alt="js" className="icon" />
  <p className="web">Web Development</p>
  <p className="web-d">Master HTML, CSS, and JavaScript to build modern websites and applications.</p>
  <div className="flex">
    <p className="lessons">38 Lessons</p>
    <p className="frnd"><b>Beginner friendly</b></p>
  </div>
  </div>
<div className="learning">
  <img src={icon2} alt="phython" className="icon" />
  <p className="web">Phython Programming</p>
  <p className="web-d">Learn Python for data science, automation, and backend development.</p>
  <div className="flex">
    <p className="lessons">35 Lessons</p>
    <p className="frnd1"><b>Intermediate</b></p>
  </div>
  </div>
<div className="learning">
  <img src={icon3} alt="react" className="icon" />
  <p className="web">React Development</p>
  <p className="web-d">Build modern user interfaces with React and its ecosystem.</p>
  <div className="flex">
    <p className="lessons">42 Lessons</p>
    <p className="frnd2"><b>Advanced</b></p>
  </div>
  </div>
</div>

<h1 className="path">Your Learning Progress</h1>
<div className="flex">
  <div className="recent">
    <p className="act">Recent Activity</p>
  </div>
  <div className="recent"></div>
  <div className="recent"></div>
</div>
    </div>
  );
};

export default Home;