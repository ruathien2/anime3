import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate('/anime3/articles');
    } catch (error) {
      alert(error.code, { type: 'error' });
    }
  };
  return (
    <div className={cx('container')}>
      <h1>Register</h1>
      <div className={cx('form-group')}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
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
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className={cx('btn')} onClick={handleSignup}>
        Register
      </button>
      <div className={cx('back')}>
        <Link to="/anime3/articles">
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}
