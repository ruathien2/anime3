import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import classNames from 'classnames/bind';
import styles from './News.module.scss';
import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

function News() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const parkingData = await getDocs(collection(db, 'News'));
      // console.log(parkingData);
      setPost(parkingData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(parkingData);
    };

    getData();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <h1>News Post</h1>
      {post.map((data) => {
        return (
          <div key={data.id} className={cx('inner')}>
            <div>
              <div className={cx('title')}>
                <img
                  className={cx('inner-avatar')}
                  src="https://th.bing.com/th/id/OIP.3t6zmgnBT5A6VYYyJ-SYsAAAAA?pid=ImgDet&w=420&h=429&rs=1"
                  alt="avatar"
                />
                <div className={cx('des-title')}>
                  <span className={cx('inner-name')}>{data.name}</span>
                  <span className={cx('inner-time')}>{data.timeStamp}</span>
                </div>
              </div>
              <span className={cx('des-titles')}>{data.title}</span>
              <span className={cx('des')}> {data.introduce}</span>
              <span className={cx('des')}> {data.description}</span>
              <div className={cx('img-wrapper')}>
                <div className={cx('img-des')}>
                  <img src={data.img} alt="" />
                  <img src={data.linkImg} alt="" />
                </div>
                <ReactPlayer
                  width={'100%'}
                  className={cx('video')}
                  url={data.linkVideo}
                  controls
                />
                {/* <iframe
                  width={'100%'}
                  className={cx('video')}
                  src={data.linkVideo}
                  title="YouTube video player"
                ></iframe> */}
              </div>
            </div>
            {/* <hr /> */}
          </div>
        );
      })}
    </div>
  );
}

export default News;
