import styles from '../styles/components/ChallengeBox.module.scss';

export function ChallengeBox() {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <section>
            <img src="icons/body.svg" alt="Novo desafio" />
            <strong>Exercite-se</strong>
            <p>
              É agora Jão, bora lá meu parça. <br /> Caminhe por 3 minutos e
              estique suas pernas pra você ficar saudável.
            </p>
          </section>

          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
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
