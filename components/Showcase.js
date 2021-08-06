import { FaWineBottle } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';

import styles from '@/styles/Showcase.module.css';

const Showcase = () => {
  return (
    <div className={styles.showcase}>
      <h1>
        Welcome To The Party{' '}
        <FaWineBottle
          style={{
            color: 'red',
            display: 'inline-block',
            margipaddTop: '13px',
          }}
        />
      </h1>
      <h2>
        Find the hottest DJ Events{' '}
        <ImFire
          style={{
            color: 'red',
            display: 'inline-block',
            margipaddTop: '13px',
          }}
        />
      </h2>
    </div>
  );
};

export default Showcase;
