import * as React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.scss';

export function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge,
  } = React.useContext(ChallengesContext);
  const { resetCountdown } = React.useContext(CountdownContext);

  const handleChallengeSucceeded = React.useCallback(() => {
    completeChallenge();
    resetCountdown();
  }, [completeChallenge, resetCountdown]);

  const handleChallengeFailed = React.useCallback(() => {
    resetChallenge();
    resetCountdown();
  }, [resetChallenge, resetCountdown]);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <section>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Novo desafio" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </section>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
