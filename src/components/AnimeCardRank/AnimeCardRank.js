import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import styles from './AnimeCardRank.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AnimeCardRank(props) {
  const history = useNavigate();
  const search = useContext(SearchContext);

  const title = props.anime.title; //.length > 15 ? `${props.anime.title.substring(0, 15)}...` : props.anime.title;
  const imgUrl = props.anime.image_url;
  const episodes = props.anime.episodes; //.length > 30 ? `${props.anime.synopsis.substring(0, 30)}...` : props.anime.synopsis;
  const member = props.anime.members;
  const rank = props.anime.rank;
  const score = props.anime.score;

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.jikan.moe/v3/anime/${props.anime.mal_id}`)
      .then((response) => response.json())
      .then((data) => {
        search.setSingle(data);
        localStorage.setItem('singleData', JSON.stringify(data));
        history('/anime3/single-view');
      });
  };

  return (
    <div>
      <div className={cx('animecard__container')}>
        <div className={cx('animecard__paper')}>
          <img
            className={cx('img__anime')}
            src={imgUrl}
            alt={title}
            style={{ maxHeight: 300 }}
          />
          <div className={cx('animecard__des')}>
            <div>
              <h3>
                {title.length > 15
                  ? `${props.anime.title.substring(0, 15)}...`
                  : props.anime.title}
              </h3>
            </div>

            <div>
              <h4>Rank: {rank}</h4>
            </div>
            <div>
              <h4>Score: {score}</h4>
            </div>

            <div className={cx('animecard__learn')}>
              <a onClick={handleClick}>Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCardRank;
