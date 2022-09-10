import styles from './SingleManga.module.scss';
import { CaretRightOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SingleAnime(props) {
  const { image_url, rating, broadcast, score, url, synopsis, episodes } =
    props.info;

  const title = props.info.title;

  console.log(title);

  //   useEffect(() => {
  //     console.log(title, image_url);
  //   }, [title, image_url]);
  return (
    <div className={cx('singleanime__container')}>
      <div className={cx('img_anime')}>
        <img src={image_url} alt={title} />
      </div>
      <div className={cx('singleanime__title')}>
        <h1>{title}</h1>
      </div>
      <div>
        <div className={cx('singleanime__description')}>
          <div>
            <h4>Score: {score}</h4>
          </div>
          <div>
            <h4>Broadcast: {broadcast}</h4>
          </div>
          <div>
            <h4>Rating: {rating}</h4>
          </div>
          <div>
            <h4>Rating: {synopsis}</h4>
          </div>
          <div>
            <h4>Episodes: {episodes}</h4>
          </div>
          <h3 className={cx('wrapper-btn')}>
            <div
              className={cx('btn-animelist')}
              style={{ marginRight: '10px' }}
            >
              <a className={cx('a')} href={url}>
                Watched
                <CaretRightOutlined className={cx('icon')} />
              </a>
            </div>
            <div className={cx('btn-animelist1')}>
              <a className={cx('f')} href="">
                Follow me
                <HeartOutlined className={cx('icon')} />
              </a>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SingleAnime;
