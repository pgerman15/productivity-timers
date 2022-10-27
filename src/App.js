import useSound from 'use-sound';
import goodJob from './sounds/good-job.mp3';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [play] = useSound(goodJob);
  const [seconds, setSeconds] = useState(0);
  const [timers, setTimers] = useState({});
  const [currentTime, setCurrentTime] = useState(moment());
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(timers).length > 0) {
        setSeconds((value) => value + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    setCurrentTime(moment());
  }, [seconds]);

  const createTimer = (timerId, timerMinutes, message) => {
    setTimers((currentTimers) => ({
      ...currentTimers,
      [timerId]: {
        startTime: moment(),
        durationMinutes: timerMinutes
      }
    }));
    setTimeout(() => {
      play();
      setTimers({
        ...timers,
        [timerId]: null,
      });
    }, timerMinutes * 60 * 1000);
  };

  const startStandupTimer = () => {
    createTimer('standUp', 60, 'Time to take a break')
  };

  const startPomodoroTimer = () => {
    createTimer('pomodoro', 25, 'Take a 5 minute break');
  };

  const remainingTimes = Object.keys(timers).reduce((reducedTimers, timerId) => {
    const { startTime, durationMinutes } = timers[timerId] || {};

    const timeElapsed = startTime && currentTime.diff(startTime, 'minutes')
    const timeRemaining = durationMinutes - timeElapsed;

    return { ...reducedTimers, [timerId]: Math.ceil(timeRemaining) };
  }, {});

  return (
    <div className="App">
      <header className="App-header">
        <div className="button-row">
          <div className="button-container">
              <label>
                {
                  remainingTimes.standUp ? 
                    `Stand up time remaining: ${remainingTimes.standUp} min` :
                    'Stand up timer'
                }
            </label>
            <button onClick={startStandupTimer}>Test</button>
          </div>
          <div className="button-container">
          <label>
                {
                  remainingTimes.pomodoro ? 
                    `Pomodoro time remaining: ${remainingTimes.pomodoro} min` :
                    'Pomodoro timer'
                }
            </label>
            <button onClick={startPomodoroTimer}>Test</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
