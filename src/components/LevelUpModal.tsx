import * as React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/LevelUpModal.module.scss';

interface LevelUpModalProps {
  onClose(): void;
}

export function LevelUpModal({ onClose }: LevelUpModalProps) {
  const { level } = React.useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={onClose}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}
