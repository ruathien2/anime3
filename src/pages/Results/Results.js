import { useEffect, useContext, useState } from 'react';
import { AnimeList } from '../../components';
import { SearchContext } from '../../context/search';
import styles from './Results.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Results() {
  const search = useContext(SearchContext);

  useEffect(() => {
    if (search.animeData === undefined || search.animeData.length === 0) {
      try {
        search.setData(JSON.parse(localStorage.getItem('myData')));
      } catch (error) {
        console.log(error);
      }
    }
    console.log(search.animeData);
  }, [search]);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Results</h1>
      {search.animeData.length === 0 ? (
        <div>
          <h1>No Data Exists</h1>
        </div>
      ) : (
        <AnimeList data={search.animeData} />
      )}
    </div>
  );
}

export default Results;
