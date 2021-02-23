import * as React from 'react';

import styles from '../styles/components/Countdown.module.scss';

export function Countdown() {
  const [time, setTime] = React.useState(25 * 60);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

  const minutes = React.useMemo(() => Math.floor(time / 60), [time]);
  const seconds = React.useMemo(() => time % 60, [time]);

  const [minuteLeft, minuteRight] = React.useMemo(
    () => String(minutes).padStart(2, '0').split(''),
    [minutes]
  );
  const [secondLeft, secondRight] = React.useMemo(
    () => String(seconds).padStart(2, '0').split(''),
    [seconds]
  );

  const startCountdown = React.useCallback(() => {
    setActive(true);
  }, []);

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </>
  );
}
