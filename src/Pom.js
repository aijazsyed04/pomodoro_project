import React, { useEffect, useState } from 'react'
import './pom.css'
import gg from "./pomodoro-technique.png"
function Pom() {
  const [workDuration, setWorkDuration] = useState();
  const [breakDuration, setBreakDuration] = useState();
  const [worksecond, setWorkSecond] = useState(60);
  const [breakSecond, setBreakSecond] = useState(60);
  const [type, setType] = useState("Work");
  const [resetFlag, setResetFlag] = useState(true)
  const [flag, setFlag] = useState(false);
  // const [vis,setvis]=useState("hidden")
  if (workDuration < 1) {
    alert("Please give the right input");
    setWorkDuration(Math.abs(workDuration + 1));
  }
  if (breakDuration < 1) {
    alert("Please give the right input");
    setBreakDuration(Math.abs(breakDuration + 1));
  }
  useEffect(() => {

    if (flag && type === "Work") {
      if (worksecond < 0) {
        alert("Negative numbers not allowed");
      }
      else if (worksecond > 0) {
        setTimeout(() => setWorkSecond(worksecond - 1), 1000)
      }
      else if (worksecond === 0) {
        alert('work duration is over')//
        setType("Break");
        setWorkSecond(workDuration * 60)
      }

    }
    if (flag && type === "Break") {
      if (breakSecond < 0) {
        alert("negative number is not allowed");
      }

      else if (breakSecond > 0) {
        setTimeout(() => setBreakSecond(breakSecond - 1), 1000)
      }
      if (breakSecond === 0) {
        alert('Break duration is over')
        setType("Work");
        setBreakSecond(breakDuration * 60)
      }

    }
  }, [type, flag, worksecond, breakDuration, breakSecond, workDuration])
  const convertor = (sec) => {
    let m = parseInt(sec / 60).toString()
    let s = parseInt(sec % 60).toString();
    if (m.length === 1) m = "0" + m
    if (s.length === 1) s = "0" + s
    return m + ":" + s
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setWorkSecond(workDuration * 60)
    setBreakSecond(breakDuration * 60)
    setType("Work")
  }
  const handleReset = () => {
    setResetFlag(true);
    setFlag(false)
    setBreakDuration();
    setWorkDuration();
    setWorkSecond(60);
    setBreakSecond(60)
  }
  return (
    <div className='main-container'>
      <div style={{ display: "flex", width: "100",justifyContent:"start",alignItems:"center",gap:"10px" }}>
        <div className='img-container'>
          <img src={gg} alt="logo" />
        </div>  
        <h2 style={{fontSize:"36px",textAlign: "center" }}>Pomodoro Timer</h2>
      </div>
      <h2 style={{ fontSize: "24px" ,textAlign: "center", marginTop: "10px" }}>WHY DON'T YOU TAKE A CHALLENGE🥱</h2>
      <div style={{
        margin: "0 auto",
        height: "50vh",
        width: "60%",
        position:"relative",  
       
        borderRadius: "15px",
        backgroundColor:"transparent",
      }} >
        <div className='bg'></div>

        <div className='zindex'>
          <h1 style={{ textAlign: "center", fontSize: "60px", marginTop: "140px", paddingTop: "40px", fontFamily: "cursive" }}>{type === "Work" ? convertor(worksecond) : convertor(breakSecond)}</h1>
          <h1 style={{ textAlign: "center", fontSize: "40px", fontFamily: "cursive", }}>{type === "Work" ? "Work" : "Break"}-Time</h1>
        </div>
        <div className='zindex' style={{ display: "flex", justifyContent: "center", marginBottom: "10px",gap:"6px" }}>
          <button className='btn1' onClick={() => { setFlag(true); setResetFlag(false) }} disabled={flag}>Start</button>
          <button className='btn1' onClick={() => { setFlag(false); setResetFlag(false) }} disabled={!flag}>Stop</button>
          <button className='btn1' onClick={handleReset} disabled={resetFlag}>Reset</button>
          <br></br>
        </div>
        <div className='zindex'>
          <form style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }} onSubmit={handleSubmit}>
            <input className='input' type="number" min="1" step="1" placeholder="work duration" value={workDuration} style={{ fontSize: "20px", marginRight: "10px" }} onChange={(e) => setWorkDuration(e.target.value)} disabled={flag} />
            <input className='input' type="number" min="1" step="1" placeholder="break duration" value={breakDuration} style={{ fontSize: "20px", marginRight: "10px" }} onChange={(e) => setBreakDuration(e.target.value)} disabled={flag} />
            <input type="submit" className='btn2' value="Set" disabled={flag} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Pom;