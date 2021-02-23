import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedChallenges() {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>00</span>
    </div>
  );
}
