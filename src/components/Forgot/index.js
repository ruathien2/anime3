import { useRef } from 'react';
import { useUserContext } from '../../context/userContext';
import classNames from 'classnames/bind';
import styles from './Forgot.module.scss';
import logo from '../../access/img/logo.PNG';

const cx = classNames.bind(styles);

function Forgot() {
  const { signInUser, forgotPassword } = useUserContext();

  const emailRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (email) signInUser(email);
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email) {
      forgotPassword(email).then(() => {
        emailRef.current.value = '';
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <hr />
      <div className={cx('title')}>
        {/* <img src={logo} /> */}
        <h2>Forgot Password</h2>
      </div>
      <div>
        <input type="email" placeholder="Email..." ref={emailRef} />
        <button className={cx('btn-signin')} onClick={forgotPasswordHandler}>
          Send Email
        </button>
      </div>
    </div>
  );
}

export default Forgot;
