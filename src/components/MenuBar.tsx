import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/components/MenuBar.module.scss';

export function MenuBar() {
  const router = useRouter();

  return (
    <>
      <nav className={styles.menuBarContainer}>
        <div>
          <img src="/menu-logo.svg" alt="Move it" />
        </div>

        <ul>
          <li>
            <Link href="/home">
              <a
                className={router.pathname === '/home' ? '--active' : ''}
                title="Ir para página principal"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M4 12L16 2.66663L28 12V26.6666C28 27.3739 27.719 28.0522 27.219 28.5522C26.7189 29.0523 26.0406 29.3333 25.3333 29.3333H6.66667C5.95942 29.3333 5.28115 29.0523 4.78105 28.5522C4.28095 28.0522 4 27.3739 4 26.6666V12Z"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 29.3333V16H20V29.3333"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard">
              <a
                className={router.pathname === '/leaderboard' ? '--active' : ''}
                title="Ir para página de ranqueamento"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M16.0001 20C21.1547 20 25.3334 15.8214 25.3334 10.6667C25.3334 5.51205 21.1547 1.33337 16.0001 1.33337C10.8454 1.33337 6.66675 5.51205 6.66675 10.6667C6.66675 15.8214 10.8454 20 16.0001 20Z"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.9466 18.52L9.33325 30.6667L15.9999 26.6667L22.6666 30.6667L21.0533 18.5067"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.virtualMenuBar} />
    </>
  );
}
