import * as React from 'react';

import { Level } from './icons/Level';

import styles from '../styles/components/Leaderboard.module.scss';

interface User {
  name: string;
  avatar_url: string;
  level: number;
  experience: number;
  challenges_completed: number;
}

interface LeaderboardProps {
  users: Array<User>;
}

export function Leaderboard({ users }: LeaderboardProps) {
  const [windowWidth, setWindowWidth] = React.useState(() =>
    process.browser ? window.innerWidth : 900
  );

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isSmartphoneWidth = React.useMemo(() => windowWidth <= 600, [
    windowWidth,
  ]);

  return isSmartphoneWidth ? (
    <div className={styles.leaderboardContainer}>
      {users.map((user, index) => (
        <div className="user" key={user.avatar_url}>
          <p className="user__position">
            Posição <strong>{index + 1}</strong>
          </p>
          <div className="user__info">
            <p>Usuário</p>
            <div>
              <img src={user.avatar_url} alt={user.name} />
              <div>
                <strong>{user.name}</strong>
                <p>
                  <Level />
                  Level {user.level}
                </p>
              </div>
            </div>
          </div>
          <p>
            Desafios{' '}
            <strong>
              <span className="highlight">{user.challenges_completed}</span>{' '}
              {user.challenges_completed === 1 ? 'completado' : 'completados'}
            </strong>
          </p>
          <p>
            Experiência{' '}
            <strong>
              <span className="highlight">{user.experience}</span> xp
            </strong>
          </p>
        </div>
      ))}
    </div>
  ) : (
    <table className={styles.leaderboardTable}>
      <thead>
        <tr>
          <th>Posição</th>
          <th className="profile">Usuário</th>
          <th>Desafios</th>
          <th>Experiência</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.avatar_url}>
            <td className="position">{index + 1}</td>
            <td className="profile">
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <p>
                    <Level />
                    Level {user.level}
                  </p>
                </div>
              </div>
            </td>
            <td className="info">
              <span className="highlight">{user.challenges_completed}</span>{' '}
              {user.challenges_completed === 1 ? 'completado' : 'completados'}
            </td>
            <td className="info">
              <span className="highlight">{user.experience}</span> xp
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
