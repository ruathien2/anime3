import { useState, useEffect } from 'react';
import styles from './News.module.scss';
import classNames from 'classnames/bind';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { FileImageOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useUserContext } from '../../context/userContext';

const cx = classNames.bind(styles);

function News() {
  const { user } = useUserContext();
  const [file, setFile] = useState('');
  const [per, setPerc] = useState(null);
  const [data, setData] = useState({});

  const post = [
    {
      id: 'name',
      lable: 'Name User Post News',
      placeholder: 'Name User Post News...',
      type: 'text',
    },
    {
      id: 'title',
      lable: 'Title News',
      placeholder: 'Title News...',
      type: 'text',
    },
    {
      id: 'introduce',
      lable: 'Introduce',
      placeholder: 'Introduce News...',
      type: 'text',
    },
    {
      id: 'description',
      lable: 'Description',
      placeholder: 'Description News...',
      type: 'text',
    },
    {
      id: 'linkImg',
      lable: 'LinkImg',
      placeholder: 'Link Image...',
      type: 'text',
    },
    {
      id: 'linkVideo',
      lable: 'LinkVideo',
      placeholder: 'Link Video...',
      type: 'text',
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        },
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  //C1
  // const addDoc = (e) => {
  //   e.preventDefault();

  //   const newPost = doc(collection(db, 'News'));
  //   const imgPost = doc(collection(db, 'img'));

  //   const date = new Date();

  //   setDoc(newPost, {
  //     title: contact.title,
  //     name: contact.name,
  //     img: contact.img,
  //     description: contact.description,
  //     linkVideo: contact.linkVideo,
  //     timeStamp: date.toLocaleString(),
  //   })
  //     .then((docRef) => {
  //       const docId = docRef.id;
  //       console.log(docId);
  //     })
  //     .catch((err) => {
  //       console.log('Error' + err.message);
  //     });
  // };

  //C2
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const date = new Date();
  //   try {
  //     const docRef = await addDoc(collection(db, 'News'), {
  //       title: contact.title,
  //       name: contact.name,
  //       description: contact.description,
  //       linkVideo: contact.linkVideo,
  //       timeStamp: date.toLocaleString(),
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAdd = async (e) => {
    e.preventDefault();
    const date = new Date();
    try {
      await addDoc(collection(db, 'News'), {
        ...data,
        timeStamp: date.toLocaleString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1>Post News</h1>
      <div className={cx('wrapper__info')}>
        <div className={cx('left')}>
          <img
            className={cx('img-none')}
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt={data.img}
          />
        </div>
        <div className={cx('right')}>
          <form onSubmit={handleAdd}>
            <div className={cx('formInput')}>
              <label className={cx('lab-img')} htmlFor="file">
                File:
                <FileImageOutlined />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>

            <div className={cx('form__info')}>
              {post.map((input) => (
                <div className={cx('formInput')} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button
                className={cx('btn-send')}
                disabled={per !== null && per < 100}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default News;
