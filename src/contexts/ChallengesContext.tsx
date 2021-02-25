import * as React from 'react';

import challenges from '../../challenges.json';

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
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
}

interface ChallengesProviderProps {
  children: React.ReactNode;
}

export const ChallengesContext = React.createContext<ChallengesContextData>(
  {} as ChallengesContextData
);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = React.useState(1);
  const [currentExperience, setCurrentExperience] = React.useState(0);
  const [challengesCompleted, setChallengesCompleted] = React.useState(0);

  const [activeChallenge, setActiveChallenge] = React.useState<Challenge>(null);

  const experienceToNextLevel = React.useMemo(
    () => Math.pow((level + 1) * 4, 2),
    [level]
  );

  const levelUp = React.useCallback(() => {
    setLevel(level + 1);
  }, []);

  const startNewChallenge = React.useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge);
  }, []);

  const resetChallenge = React.useCallback(() => {
    setActiveChallenge(null);
  }, []);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
