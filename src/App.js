import Link from './Route';
import Auth from './components/Auth/Auth';
import { useUserContext } from './context/userContext';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import GlobalLayout from './access/GlobalLayout';

const cx = classNames.bind(styles);

function App() {
  const { loading, error, user } = useUserContext();

  return (
    <div className={cx('wrapper')}>
      {/* {error && <p className="error">{error}</p>}
      {loading ? (
        <h2 style={{ color: '#fff' }}>Loading...</h2>
      ) : (
        <>
          {user ? (
            <GlobalLayout>
              <Link />
            </GlobalLayout>
          ) : (
            <div className={cx('sign')}>
              <Auth />
            </div>
          )}
        </>
      )} */}
      <Link />
    </div>
  );
}

export default App;
