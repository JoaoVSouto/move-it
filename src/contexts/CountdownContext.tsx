import * as React from 'react';

import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown(): void;
  resetCountdown(): void;
}

interface CountdownProviderProps {
  children: React.ReactNode;
}

const INITIAL_COUNTDOWN_SECONDS =
  process.env.NODE_ENV === 'development' ? 0.1 * 30 : 25 * 60;

export const CountdownContext = React.createContext({} as CountdownContextData);

const initialDocumentTitle = process.browser
  ? document.title
  : 'Início | Move.it';

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = React.useContext(ChallengesContext);

  const [time, setTime] = React.useState(INITIAL_COUNTDOWN_SECONDS);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);

  const minutes = React.useMemo(() => Math.floor(time / 60), [time]);
  const seconds = React.useMemo(() => time % 60, [time]);

  React.useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        // prevents counting an extra second when timer is stopped
        setIsActive(state => {
          if (state) {
            const minutesPadded = String(
              seconds - 1 < 0 ? minutes - 1 : minutes
            ).padStart(2, '0');
            const secondsPadded = String(
              seconds - 1 < 0 ? 59 : seconds - 1
            ).padStart(2, '0');

            const [, documentTitleSuffix] = document.title.split(' | ');

            document.title = `${minutesPadded}:${secondsPadded} | ${documentTitleSuffix}`;

            setTime(time - 1);
          }

          return state;
        });
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }

    if (!isActive) {
      document.title = initialDocumentTitle;
    }
  }, [isActive, time]);

  const startCountdown = React.useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = React.useCallback(() => {
    setIsActive(false);
    setTime(INITIAL_COUNTDOWN_SECONDS);
    setHasFinished(false);
  }, []);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
