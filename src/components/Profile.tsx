import * as React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level } = React.useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/JoaoVSouto.png" alt="João Vítor" />

      <div>
        <strong>João Vítor</strong>
        <p>
          <img src="icons/level.svg" alt="Nível atual" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
