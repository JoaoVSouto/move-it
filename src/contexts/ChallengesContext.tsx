import * as React from 'react';

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp(): void;
  startNewChallenge(): void;
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

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('new challenge!');
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
