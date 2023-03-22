import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import arrayData from "./arrayData";
import WebSocket, {WebSocketServer} from "ws";

let user1_hr = 0;
let user1_rp = 0;
let user1_tp = 0;
const str = 'user5';

const PADDING = 20;
const MAX_VALUE = 360;
const Y_TICK = 4;
const DURATION = 1000 * 30; // 30s
const EX_TIME = "00:00";

function LineChart1({ id }) {
  
  let post1 = user1_hr;
  const [data, setData] = useState([[Date.now(), post1]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING - 3, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
        } else {
          ctx.lineTo(xPoint, yPoint);
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post1]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="600px" height="400px"></canvas>
  );
}

function LineChart2({ id }) {
  let post2 = user1_rp;
  const [data, setData] = useState([[Date.now(), post2]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING - 3, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
        } else {
          ctx.lineTo(xPoint, yPoint);
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post2]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="600px" height="400px"></canvas>
  );
}

function LineChart3({ id }) {
  let post3 = user1_tp;
  const [data, setData] = useState([[Date.now(), post3]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING - 3, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
        } else {
          ctx.lineTo(xPoint, yPoint);
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post3]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="600px" height="400px"></canvas>
  );
}

// 심박수 : 60 ~ 100 beats
// 호흡수 : 1분에 12 ~ 20회
function Getdata() {
  // console.log("arrayData: ", typeof arrayData);
  // console.log(arrayData);
  // console.log("objectData: ", typeof objectData);
  // console.log(objectData);
  
  const newArrayData = arrayData.map((item, index) => {

    return (
      <li key={index}>
        {item.type} : {item.measure}{item.unit} per {item.time}
      </li>
    );
  });
  // return (
  //   <li key={index}>
  //     View Vital Signs
  //     {item.user}'s Vital Signs
  //     Heart Rate : {item.heartrate} beats/1m
  //     Respiration Rate : {item.resp} times/1m
  //     Body Temperature : {item.temp} 
  //   </li>
  // );

  // console.log(user['user'], user['timestamp'], user['heartrate'], user['resp'], user['temp']);

  return (
    <div className="Getdata">
      <ul className="container">{newArrayData}</ul>
      {/* <h1>{objectData.welcomeMessage}</h1>
      <h2>you connected to {objectData.localAddress}</h2>
      {objectData.isDevEnv ? (
        <span>data from arrayData.json</span>
      ) : null} */}
    </div>
  );
}

const Detail = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    const WebSocket = require('ws');

    const socket = new window.WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      setMessage(event.data);
      
      let parse_data = JSON.parse(event.data)
      let ur = parse_data.user
      let hr = parse_data.heartrate
      let rp = parse_data.resp
      let tp = parse_data.temp
      
      if (ur===str){
        console.log('ur: '+ur)
        console.log('hr: '+hr)
        console.log('rp: '+rp)
        console.log('tp: '+tp)
        user1_hr=hr;
        user1_rp=rp;
        user1_tp=tp;
        // console.log(message + "수신");
      }
    };

    return () => {
      if(socket.readyState===1){
        socket.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMessage(getData());

  // }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  
  return (
    <div className="detail">
      <p>{message}</p>
      <p className="signal">Heart Rate</p>
\      {<LineChart1 className="chart" id="HR_lineChart" />}
      <p className="signal">Respiration Rate</p>
      {<LineChart2 className="chart" id="RR_lineChart" />}
      <p className="signal">Body Temperature</p>
      {<LineChart3 className="chart" id="BT_lineChart" />}
      {/* {<Getdata className="json" id="data" />}  */}
    </div>
  );
}

export default Detail;