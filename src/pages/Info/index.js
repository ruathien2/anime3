import styles from './Info.module.scss';
import classNames from 'classnames/bind';
import imgLink from '../../access/img/share.PNG';
import link from '../../access/img/link.PNG';

const cx = classNames.bind(styles);

function Info() {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>
        <h1>Tutorial Post Article</h1>
      </div>
      <ul>
        <li>You must be logged in before posting the article</li>

        <li>
          Youtube link you can get from the share section of the video you want
          to get
          <ul className={cx('img-des')}>
            <li>
              <img src={imgLink} alt="" />
            </li>
            <li>
              <img src={link} alt="" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Info;
