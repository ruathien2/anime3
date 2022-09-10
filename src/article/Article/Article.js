import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import LikeArticle from '../LikeArticle';
import Comment from '../Comment/Comment';
import classNames from 'classnames/bind';
import styles from './Article.module.scss';
import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, 'Articles', id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div className={cx('container')}>
      {article && (
        <div className={cx('inner')}>
          <div className={cx('user')}>
            <img
              className={cx('inner-avatar')}
              src="https://th.bing.com/th/id/OIP.3t6zmgnBT5A6VYYyJ-SYsAAAAA?pid=ImgDet&w=420&h=429&rs=1"
              alt="avatar"
            />
            <div className={cx('info-user-post')}>
              <span>{article.createdBy}</span>
              <span>{article.createdAt.toDate().toDateString()}</span>
            </div>
          </div>
          <div className={cx('img-des')}>
            {article.imageUrl.length === 0 ? null : (
              <img src={article.imageUrl} alt="" />
            )}
            {article.linkVideo.length === 0 ? null : (
              <ReactPlayer url={article.linkVideo} controls />
            )}
          </div>

          <div className={cx('des-group')}>
            <div className={cx('group')}>
              <div className={cx('title')}>
                <span>{article.title}</span>
              </div>
              <div className={cx('des')}>
                <span>{article.description}</span>
              </div>
            </div>

            <div className={cx('likes')}>
              <div className={cx('heart-lenght')}>
                <span>{article.likes.length}</span>
              </div>
              {user && <LikeArticle id={id} likes={article.likes} />}
            </div>
            {/* comment  */}
            <Comment id={article.id} />
          </div>
          <div className={cx('home')}>
            <Link to="/anime3/articles">
              <span>Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
