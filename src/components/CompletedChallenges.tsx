import * as React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/CompletedChallenges.module.scss';

export function CompletedChallenges() {
  const { challengesCompleted } = React.useContext(ChallengesContext);

  const challengesCompletedPadded = React.useMemo(
    () => String(challengesCompleted).padStart(2, '0'),
    [challengesCompleted]
  );

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompletedPadded}</span>
    </div>
  );
}
