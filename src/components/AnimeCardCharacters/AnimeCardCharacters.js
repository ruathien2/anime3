import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import styles from './AnimeCardCharacters.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AnimeCardCharacters(props) {
  const history = useNavigate();
  const search = useContext(SearchContext);
  const name =
    props.anime.name.length > 15
      ? `${props.anime.name.substring(0, 15)}...`
      : props.anime.name;
  const name_kanji = props.anime.name_kanji;
  console.log(props.anime);
  const url = props.anime.url;
  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.jikan.moe/v4/manga/${props.anime.mal_id}`)
      .then((response) => response.json())
      .then((data) => {
        search.setSingle(data);
        localStorage.setItem('singleData', JSON.stringify(data));
        history('/anime3/single-view-characters');
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
            {/* <div>
              Kanji Name: <h3>{name_kanji}</h3>
            </div> */}

            <div className={cx('animecard__learn')}>
              <a href={url}>Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCardCharacters;
