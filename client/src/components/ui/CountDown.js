import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const getCountdown = (eventTime) => {
  if (eventTime === null) return { valid: false };
  let currentTime = new Date().getTime();
  let remTime = eventTime - currentTime;

  if (remTime < 0) {
    return { valid: false };
  } else {
    let s = Math.floor(remTime / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    return { valid: true, d, m, h, s };
  }
};

function CountDown() {
  const [contestTime, setContestTime] = useState(null);
  const remainingTimes = getCountdown(contestTime);
  const [day, setDay] = useState(
    remainingTimes.valid ? remainingTimes.d.toString().padStart(2, '0') : '00'
  );
  const [hour, setHour] = useState(
    remainingTimes.valid ? remainingTimes.h.toString().padStart(2, '0') : '00'
  );
  const [minute, setMinute] = useState(
    remainingTimes.valid ? remainingTimes.m.toString().padStart(2, '0') : '00'
  );
  const [second, setSecond] = useState(
    remainingTimes.valid ? remainingTimes.s.toString().padStart(2, '0') : '00'
  );

  let interval = useRef();

  const startTime = () => {
    interval = setInterval(() => {
      const times = getCountdown(contestTime);
      if (times.valid) {
        const { d, h, m, s } = times;
        setDay(d.toString().padStart(2, '0'));
        setHour(h.toString().padStart(2, '0'));
        setMinute(m.toString().padStart(2, '0'));
        setSecond(s.toString().padStart(2, '0'));
      } else {
        clearInterval(interval.current);
      }
    }, 1000);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/admin/contest-time`)
      .then((r) => r.data)
      .then((res) => setContestTime(new Date(res.date)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div className="Home__banner_countdown">
      <div className="Home__banner_countdown-day">
        <p>{day}</p>
        <p>Days</p>
      </div>
      <div className="Home__banner_countdown-hour">
        <p>{hour}</p>
        <p>Hours</p>
      </div>
      <div className="Home__banner_countdown-minute">
        <p>{minute}</p>
        <p>Minutes</p>
      </div>
      <div className="Home__banner_countdown-second">
        <p>{second}</p>
        <p>Seconds</p>
      </div>
    </div>
  );
}

export default CountDown;
