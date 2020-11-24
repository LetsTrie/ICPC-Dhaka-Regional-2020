import React, { useRef, useEffect, useState } from 'react';

function CountDown() {
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');

  let interval = useRef();

  const startTime = () => {
    // 28 February 2021
    let eventTime = new Date(2021, 1, 28).getTime();

    interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let remTime = eventTime - currentTime;

      if (remTime < 0) {
        clearInterval(interval.current);
      } else {
        let s = Math.floor(remTime / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        let d = Math.floor(h / 24);

        h %= 24;
        m %= 60;
        s %= 60;

        setDay(d.toString().padStart(2, '0'));
        setHour(h.toString().padStart(2, '0'));
        setMinute(m.toString().padStart(2, '0'));
        setSecond(s.toString().padStart(2, '0'));
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval.current)
    }
  })

  return (
    <div className='Home__banner_countdown'>
      <div className='Home__banner_countdown-day'>
        <p>{day}</p>
        <p>Days</p>
      </div>
      <div className='Home__banner_countdown-hour'>
        <p>{hour}</p>
        <p>Hours</p>
      </div>
      <div className='Home__banner_countdown-minute'>
        <p>{minute}</p>
        <p>Minutes</p>
      </div>
      <div className='Home__banner_countdown-second'>
        <p>{second}</p>
        <p>Seconds</p>
      </div>
    </div>
  );
}

export default CountDown;
