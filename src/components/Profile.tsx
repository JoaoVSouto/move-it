import styles from '../styles/components/Profile.module.scss';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/JoaoVSouto.png" alt="João Vítor" />

      <div>
        <strong>João Vítor</strong>
        <p>
          <img src="icons/level.svg" alt="Nível atual" />
          Level 1
        </p>
      </div>
    </div>
  );
}
