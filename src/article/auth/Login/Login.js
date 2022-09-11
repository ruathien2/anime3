import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/anime3/articles');
    } catch (error) {
      toast(error.code, { type: 'error' });
    }
  };
  return (
    <div className={cx('container')}>
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password / 6 characters or more"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className={cx('btn')} onClick={handleLogin}>
        Login
      </button>
      <div className={cx('back')}>
        <span className={cx('none')}>
          Don't Have Accout?{' '}
          <Link to="/anime3/register">
            <span className={cx('register')}>Register</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
