import AnimeCard from './AnimeCard/AnimeCard';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';

function AnimeList(props) {
  return (
    <Row>
      {props.data.map((anime) => (
        <Col span={4} key={anime.mal_id}>
          <AnimeCard anime={anime} />
        </Col>
      ))}
    </Row>
  );
}

export default AnimeList;
