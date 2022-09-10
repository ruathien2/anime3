import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import AnimeCardManga from '../../components/AnimeCardManga/AnimeCardManga';
import classNames from 'classnames/bind';
import styles from './Manga.module.scss';

const cx = classNames.bind(styles);

function Manga() {
  const search = useContext(SearchContext);

  return (
    <div className={cx('wrapper')}>
      <h1>Manga</h1>
      <Row>
        {search.manga &&
          search.manga.map((anime) => (
            <Col span={4} key={anime.mal_id}>
              <AnimeCardManga anime={anime} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Manga;
