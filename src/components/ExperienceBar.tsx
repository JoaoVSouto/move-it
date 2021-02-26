import * as React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.scss';

export function ExperienceBar() {
  const {
    currentExperience,
    experienceToNextLevel,
    isLevelUpModalOpen,
  } = React.useContext(ChallengesContext);

  const percentToNextLevel = React.useMemo(
    () => Math.round(currentExperience * 100) / experienceToNextLevel,
    [currentExperience, experienceToNextLevel]
  );

  return (
    <header
      className={`${styles.experienceBar} ${isLevelUpModalOpen ? 'blur' : ''}`}
    >
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
