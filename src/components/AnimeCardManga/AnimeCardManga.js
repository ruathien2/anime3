import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import styles from './AnimeCardManga.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AnimeCardManga(props) {
  const history = useNavigate();
  const search = useContext(SearchContext);
  console.log(props.anime);
  const name =
    props.anime.title.length > 15
      ? `${props.anime.title.substring(0, 15)}...`
      : props.anime.title;
  const name_kanji =
    props.anime.title_japanese.length > 8
      ? `${props.anime.title_japanese.substring(0, 8)}...`
      : props.anime.title_japanese;
  //.length > 15 ? `${props.anime.title.substring(0, 15)}...` : props.anime.title;
  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.jikan.moe/v4/manga/${props.anime.mal_id}`)
      .then((response) => response.json())
      .then((data) => {
        search.setSingle(data);
        localStorage.setItem('singleData', JSON.stringify(data));
        history('/single-view-manga');
      });
  };

  return (
    <div>
      <div className={cx('animecard__container')}>
        <div className={cx('animecard__paper')}>
          <img
            className={cx('img__anime')}
            src={props.anime.images.jpg.image_url}
            alt={name}
            style={{ maxHeight: 300 }}
          />
          <div className={cx('animecard__des')}>
            <div>
              <h3>{name}</h3>
            </div>
            <div>
              Japanese Name: <h3>{name_kanji}</h3>
            </div>

            <div className={cx('animecard__learn')}>
              {/* <a onClick={handleClick}>Learn More</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCardManga;
