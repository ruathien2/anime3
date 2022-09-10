import { useContext, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../img/logo.PNG';
import {
  BulbOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../../context/search';
import { useUserContext } from '../../../../context/userContext';
import useDarkMode from '../../../../components/Theme/useDarkMode';

const cx = classNames.bind(styles);

function Header() {
  const { logoutUser } = useUserContext();
  const [darkMode, toggleDarkMode] = useDarkMode();

  const history = useNavigate();
  const search = useContext(SearchContext);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  console.log(input);
  const handleSearch = (e) => {
    e.preventDefault();
    search.search(input).then((data) => {
      console.log(data);
      search.setData(data.results);
      localStorage.setItem('myData', JSON.stringify(data.results));
      history('/anime3/results');
    });
    setInput('');
    inputRef.current.focus();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link style={{ margin: 'auto 0' }} to="/anime3">
          <img className={cx('logo')} src={logo} alt="" />
        </Link>
        <div className={cx('menu')}>
          <Link to="/anime3/articles">
            <div className={cx('menu__box')}>
              <span>Article</span>
            </div>
          </Link>

          <Link to="/anime3/characters">
            <div className={cx('menu__box')}>
              <span>Characters</span>
            </div>
          </Link>
          {/* <Link to="/manga">
            <div className={cx('menu__box')}>Manga</div>
          </Link> */}
          <Link style={{ color: '#333np' }} to="/anime3/rank-anime">
            <div className={cx('menu__box')}>
              <span>Rank</span>
            </div>
          </Link>
        </div>
        <form type="submit" className={cx('search')}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for your favorite anime..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="home__input"
          />
          <button
            type="submit"
            className={cx('search-btn')}
            onClick={handleSearch}
          >
            <SearchOutlined />
          </button>
        </form>
        <ul className={cx('atrribute')}>
          <li className={cx('register-btn')}>
            <InfoCircleOutlined className={cx('logo__control')} />
          </li>
          <li className={cx('register-btn')}>
            <BulbOutlined
              className={cx('logo__control')}
              onClick={() => toggleDarkMode()}
            />
          </li>
          <li className={cx('login-btn')}>
            <UserOutlined className={cx('logo__control')} />
            <ul className={cx('menu-btn')}>
              <li className={cx('res')} onClick={logoutUser}>
                Log out
              </li>
              <li className={cx('res')}>
                <Link to="/anime3/profile-user">Profile</Link>
              </li>
              {/* <li className={cx('res')}>
                <Link to="/anime3/post-news"> Post News</Link>
              </li> */}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
