import * as React from 'react';
import { useSession } from 'next-auth/client';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level, isLevelUpModalOpen } = React.useContext(ChallengesContext);

  const [session, isLoading] = useSession();

  return (
    <div
      className={`${styles.profileContainer} ${
        isLevelUpModalOpen ? 'blur' : ''
      }`}
    >
      {!isLoading ? (
        <img src={session.user.image} alt={session.user.name} />
      ) : (
        <div className={`${styles.shimmer} ${styles.imageShimmer}`} />
      )}

      <div>
        {!isLoading ? (
          <strong>{session.user.name}</strong>
        ) : (
          <div className={styles.shimmer} />
        )}
        {!isLoading ? (
          <p>
            <img src="icons/level.svg" alt="Nível atual" />
            Level {level}
          </p>
        ) : (
          <div className={`${styles.shimmer} ${styles.levelShimmer}`} />
        )}
      </div>
    </div>
  );
}
