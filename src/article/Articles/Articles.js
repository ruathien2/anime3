import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import DeleteArticle from '../Delete/DeleteArticle';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikeArticle from '../LikeArticle';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Articles.module.scss';
import AddArticle from '../AddArticle/AddArticle';
import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const articleRef = collection(db, 'Articles');
    const q = query(articleRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div>
      <div className={cx('post-article')} onClick={() => setShow(!show)}>
        Post Article
      </div>
      {show && <AddArticle />}
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            linkVideo,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className={cx('container')} key={id}>
              <div>
                <div className={cx('user')}>
                  <img
                    className={cx('inner-avatar')}
                    src="https://th.bing.com/th/id/OIP.3t6zmgnBT5A6VYYyJ-SYsAAAAA?pid=ImgDet&w=420&h=429&rs=1"
                    alt="avatar"
                  />
                  <div className={cx('info-user-post')}>
                    {createdBy && (
                      <span className={cx('user-post')}>{createdBy}</span>
                    )}
                    <span>{createdAt.toDate().toDateString()}</span>
                  </div>
                </div>
                <Link to={`/anime3/articles/article/${id}`}>
                  <div className={cx('img-des')}>
                    {imageUrl.length === 0 ? null : (
                      <img src={imageUrl} alt="" />
                    )}
                  </div>
                  <div className={cx('img-des')}>
                    {linkVideo.length === 0 ? null : (
                      <ReactPlayer url={linkVideo} controls />
                    )}
                  </div>
                  <div className={cx('des-group')}>
                    <div className={cx('title')}>
                      <span>{title}</span>
                    </div>
                    <div className={cx('des')}>
                      <span>{description}</span>
                    </div>
                  </div>
                </Link>

                <div className={cx('feature')}>
                  <div className={cx('heart')}>
                    {user && <LikeArticle id={id} likes={likes} />}
                  </div>
                  <div className={cx('likes')}>
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                  </div>
                  <div className={cx('comments')}>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                  <div className={cx('delete')}>
                    {user && user.uid === userId && (
                      <DeleteArticle id={id} imageUrl={imageUrl} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )
      )}
    </div>
  );
}
