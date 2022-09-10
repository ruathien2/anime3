import { useState } from 'react';
import { SignIn, SignUp } from '../../components';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Auth() {
  const [index, setIndex] = useState(false);

  const toggleIndex = () => {
    setIndex((preState) => !preState);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper2')}>
        {!index ? <SignIn className={cx('signIn')} /> : <SignUp />}
        <a onClick={toggleIndex} className={cx('forgot')}>
          {!index ? 'New User? Click here' : 'Already have account'}
        </a>
      </div>
    </div>
  );
}

export default Auth;
