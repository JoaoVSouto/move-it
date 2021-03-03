import * as React from 'react';

import api from '../services/api';

import useDidMountEffect from '../hooks/useDidMountEffect';

import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge | null;
  isLevelUpModalOpen: boolean;
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): void;
}

interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  totalExperience: number;
  challengesCompleted: number;
  userId: string;
}

const EMOJI_BY_ACTIVITY = {
  body: '🏋️',
  eye: '👀',
};

export const ChallengesContext = React.createContext<ChallengesContextData>(
  {} as ChallengesContextData
);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = React.useState(rest.level || 1);
  const [currentExperience, setCurrentExperience] = React.useState(() => {
    if (rest.level === 1) {
      return rest.totalExperience;
    }

    const pastLevelsExperience = Array(rest.level - 1)
      .fill(0)
      .reduce((totalXp, _, index) => {
        totalXp += Math.pow((index + 2) * 4, 2);
        return totalXp;
      }, 0);

    return rest.totalExperience - pastLevelsExperience;
  });
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted || 0
  );

  const [activeChallenge, setActiveChallenge] = React.useState<Challenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

  const experienceToNextLevel = React.useMemo(
    () => Math.pow((level + 1) * 4, 2),
    [level]
  );

  const totalExperience = React.useMemo(
    () =>
      level === 1
        ? currentExperience
        : Array(level - 1)
            .fill(0)
            .reduce((totalXp, _, index) => {
              totalXp += Math.pow((index + 2) * 4, 2);
              return totalXp;
            }, 0) + currentExperience,
    [level, currentExperience]
  );

  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  useDidMountEffect(() => {
    api
      .put(`/api/users/${rest.userId}`, {
        level,
        experience: totalExperience,
        challenges_completed: challengesCompleted,
      })
      .catch(err => console.error(err));
  }, [rest.userId, level, totalExperience, challengesCompleted]);

  const levelUp = React.useCallback(() => {
    setLevel(state => state + 1);
    setIsLevelUpModalOpen(true);
  }, []);

  const closeLevelUpModal = React.useCallback(() => {
    setIsLevelUpModalOpen(false);
  }, []);

  const startNewChallenge = React.useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    const isUserAwayFromApp = document.hidden;

    if (Notification.permission === 'granted' && isUserAwayFromApp) {
      new Notification(`Novo desafio ${EMOJI_BY_ACTIVITY[challenge.type]}`, {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }, []);

  const resetChallenge = React.useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = React.useCallback(() => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(state => state + 1);
  }, [activeChallenge, currentExperience, experienceToNextLevel]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        isLevelUpModalOpen,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal onClose={closeLevelUpModal} />}
    </ChallengesContext.Provider>
  );
}
