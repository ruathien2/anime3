import { useRef, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import logo from '../../access/img/logo.PNG';
import Forgot from '../Forgot';

const cx = classNames.bind(styles);

function SignIn() {
  const { signInUser } = useUserContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [index, setIndex] = useState(false);

  const toggleIndex = () => {
    setIndex((preState) => !preState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) signInUser(email, password);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <img src={logo} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email..." ref={emailRef} />
        <input
          type="password"
          placeholder="6 characters or more ..."
          ref={passwordRef}
        />
        <button type="submit" className={cx('btn-signin')}>
          Sign In
        </button>
        {!index ? null : <Forgot />}
        <a onClick={toggleIndex} className={cx('forgot')}>
          {!index ? 'Forgot Password?' : <h4>Cancel</h4>}
        </a>
      </form>
    </div>
  );
}

export default SignIn;
