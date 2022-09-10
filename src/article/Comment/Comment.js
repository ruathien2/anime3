import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function Comment({ id }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, 'Articles', id);
  useEffect(() => {
    const docRef = doc(db, 'Articles', id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === 'Enter') {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment('');
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <span className={cx('title-comment')}>Comment</span>
      <div className={cx('container')}>
        <div className={cx('comment-group')}>
          {comments !== null &&
            comments.map(
              ({ commentId, user, comment, userName, createdAt }) => (
                <div key={commentId}>
                  <div>
                    <div className={cx('user-comment')}>
                      <span className={cx('user')}>{userName}</span>
                      <span className={cx('comment')}>
                        {comment}
                        {user === currentlyLoggedinUser.uid && (
                          <i
                            className={cx('delete')}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleDeleteComment({
                                commentId,
                                user,
                                comment,
                                userName,
                                createdAt,
                              })
                            }
                          >
                            <DeleteOutlined />
                          </i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
        </div>
        {currentlyLoggedinUser && (
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment"
            onKeyUp={(e) => {
              handleChangeComment(e);
            }}
          />
        )}
      </div>
    </div>
  );
}
