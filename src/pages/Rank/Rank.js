import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import { AnimeCardRank } from '../../components';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import classNames from 'classnames/bind';
import styles from './Rank.module.scss';

const cx = classNames.bind(styles);

function Rank() {
  const search = useContext(SearchContext);
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Ranking of the 50 best anime series</h1>
      <Row>
        {search.topAnime &&
          search.topAnime.map((anime) => (
            <Col span={4} key={anime.mal_id}>
              <AnimeCardRank anime={anime} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Rank;
