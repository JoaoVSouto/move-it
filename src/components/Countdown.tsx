import * as React from 'react';

import styles from '../styles/components/Countdown.module.scss';

const INITIAL_COUNTDOWN_SECONDS = 0.1 * 60;

export function Countdown() {
  const [time, setTime] = React.useState(INITIAL_COUNTDOWN_SECONDS);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);

  React.useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        // prevents counting an extra second when timer is stopped
        setIsActive(state => {
          if (state) {
            setTime(time - 1);
          }

          return state;
        });
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

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
    setIsActive(true);
  }, []);

  const resetCountdown = React.useCallback(() => {
    setIsActive(false);
    setTime(INITIAL_COUNTDOWN_SECONDS);
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

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : isActive ? (
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
        >
          Abandonar ciclo
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
      )}
    </>
  );
}
