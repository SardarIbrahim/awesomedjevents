import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';

import { FaUser } from 'react-icons/fa';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUserName] = useState('');

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords Do Not Match');
    }
    register({ username, email, password });
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Enter Name</label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Enter Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Enter Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='confirmpassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmpassword'
              id='confirmpassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='btn'>
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link href='/account/login'>Log In</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
