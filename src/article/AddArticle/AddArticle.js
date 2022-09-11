import React, { useState } from 'react';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AddArticle.module.scss';
import { useUserContext } from '../../context/userContext';

const cx = classNames.bind(styles);

export default function AddArticle() {
  const { logoutUser } = useUserContext();

  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title) {
      alert('Please fill all the fields');
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`,
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: '',
          description: '',
          image: '',
          link: '',
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, 'Articles');
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            linkVideo: formData.link,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast('Article added successfully', { type: 'success' });
              setProgress(0);
            })
            .catch((err) => {
              toast('Error adding article', { type: 'error' });
            });
        });
      },
    );
  };

  return (
    <div className={cx('container')}>
      {!user ? (
        <>
          <h2>
            <Link to="/anime3/signin">Login to create article</Link>
          </h2>
          Don't have an account? <Link to="/anime3/register">Signup</Link>
        </>
      ) : (
        <>
          <h2>Create article</h2>
          <div className={cx('form-group')}>
            <div>
              <input
                type="text"
                name="title"
                className={cx('form-control')}
                value={formData.title}
                onChange={(e) => handleChange(e)}
                placeholder="Title"
              />
            </div>

            {/* description */}
            <textarea
              name="description"
              className={cx('form-control')}
              value={formData.description}
              onChange={(e) => handleChange(e)}
              placeholder="Description"
              rows="4"
            />

            {/* image */}
            <input
              type="file"
              name="image"
              accept="image/*"
              className={cx('form-control')}
              onChange={(e) => handleImageChange(e)}
              style={{ background: '#fff' }}
            />

            <input
              type="text"
              name="link"
              className={cx('form-control')}
              value={formData.link}
              onChange={(e) => handleChange(e)}
              placeholder="Link Youtube"
            />

            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped mt-2"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}
            <div className={cx('btn')}>
              <button onClick={handlePublish}>Send</button>
            </div>
          </div>
          {/* <div className={cx('logout')}>
            <span onClick={logoutUser}>Logout</span>
          </div> */}
        </>
      )}
    </div>
  );
}
