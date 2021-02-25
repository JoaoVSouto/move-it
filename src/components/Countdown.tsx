import * as React from 'react';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.scss';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
  } = React.useContext(CountdownContext);

  const [minuteLeft, minuteRight] = React.useMemo(
    () => String(minutes).padStart(2, '0').split(''),
    [minutes]
  );
  const [secondLeft, secondRight] = React.useMemo(
    () => String(seconds).padStart(2, '0').split(''),
    [seconds]
  );

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
          <img src="icons/check.svg" alt="Ciclo encerrado" />
        </button>
      ) : isActive ? (
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
        >
          Abandonar ciclo
          <img src="icons/close.svg" alt="Abandonar ciclo" />
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
          <img src="icons/play.svg" alt="Iniciar ciclo" />
        </button>
      )}
    </>
  );
}
