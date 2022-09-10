import { useContext } from 'react';
import { SearchContext } from '../../context/search';
import { AnimeCard } from '../../components';
import { SliderShown } from '../../access/Layout/DefaultLayout';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
  const search = useContext(SearchContext);

  // useEffect(() => {
  //     search.search('Naruto').then((data) => {
  //         console.log(data);
  //     });
  // }, [search]);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Top Anime</h1>
      <SliderShown />
      <h1 className={cx('title')}>Anime Bypopularity</h1>
      <Row>
        {search.bypopularity &&
          search.bypopularity.map((anime) => (
            <Col span={4} key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Home;
