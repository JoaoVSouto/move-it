import * as React from 'react';
import { useSession } from 'next-auth/client';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  const { level, isLevelUpModalOpen } = React.useContext(ChallengesContext);

  const [session, isLoading] = useSession();

  // TODO: loading appears here...
  if (isLoading) {
    return <p>Carregando dados de usuário...</p>;
  }

  return (
    <div
      className={`${styles.profileContainer} ${
        isLevelUpModalOpen ? 'blur' : ''
      }`}
    >
      <img src={session.user.image} alt={session.user.name} />

      <div>
        <strong>{session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Nível atual" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
