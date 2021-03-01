import * as React from 'react';
import Cookies from 'js-cookie';

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
  currentExperience: number;
  challengesCompleted: number;
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
  const [currentExperience, setCurrentExperience] = React.useState(
    rest.currentExperience || 0
  );
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted || 0
  );

  const [activeChallenge, setActiveChallenge] = React.useState<Challenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  React.useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const experienceToNextLevel = React.useMemo(
    () => Math.pow((level + 1) * 4, 2),
    [level]
  );

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
