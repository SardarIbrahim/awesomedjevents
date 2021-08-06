import { useContext } from 'react';
import Link from 'next/link';

import Search from './Search';
import AuthContext from '@/context/AuthContext';

import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import styles from '@/styles/Header.module.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              {/* if user is logged in */}
              <li>
                <Link href='/events/add'>Add Event</Link>
              </li>
              <li>
                <Link href='/account/dashboard'>Dashboard</Link>
              </li>
              <li>
                <button
                  className='btn-secondary btn-icon'
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Log In
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
