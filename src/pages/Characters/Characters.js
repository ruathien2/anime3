import { useContext } from 'react';
import { AnimeCardCharacters } from '../../components';
import { SearchContext } from '../../context/search';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import classNames from 'classnames/bind';
import styles from './Characters.module.scss';

const cx = classNames.bind(styles);

function Characters() {
  const search = useContext(SearchContext);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Characters Pages</h1>
      <Row>
        {search.characters &&
          search.characters.map((anime) => (
            <Col span={4} key={anime.mal_id}>
              <AnimeCardCharacters anime={anime} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Characters;
