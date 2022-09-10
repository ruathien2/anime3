import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import classNames from 'classnames/bind';
import styles from './AnimeCard.module.scss';

const cx = classNames.bind(styles);

function AnimeCard(props) {
  const history = useNavigate();
  const search = useContext(SearchContext);

  const title = props.anime.title; //.length > 15 ? `${props.anime.title.substring(0, 15)}...` : props.anime.title;
  const imgUrl = props.anime.image_url;
  const episodes = props.anime.episodes; //.length > 30 ? `${props.anime.synopsis.substring(0, 30)}...` : props.anime.synopsis;
  const member = props.anime.members;
  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.jikan.moe/v3/anime/${props.anime.mal_id}`)
      .then((response) => response.json())
      .then((data) => {
        search.setSingle(data);
        localStorage.setItem('singleData', JSON.stringify(data));
        history(`/anime3/single-view`);
      });
  };

  return (
    <div>
      <div className={cx('animecard__container')}>
        <div className={cx('animecard__paper')}>
          <img className={cx('img__anime')} src={imgUrl} alt={title} />
          <div className={cx('animecard__des')}>
            <div>
              <h3>
                {title.length > 15
                  ? `${props.anime.title.substring(0, 15)}...`
                  : props.anime.title}
              </h3>
            </div>
            <div>
              <h5>Episodes: {episodes}</h5>
            </div>
            {/* <div>
                                <h1>Member: {member}</h1>
                            </div> */}
            <div className={cx('animecard__learn')}>
              <a onClick={handleClick}>Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
