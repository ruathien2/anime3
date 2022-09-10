import { useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import classNames from 'classnames/bind';
import styles from './SignUp.scss';
import logo from '../../access/img/logo.PNG';

const cx = classNames.bind(styles);

function SignUp() {
  const [file, setFile] = useState('');
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  const userInputs = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Anh_Pham',
    },
    {
      id: 'displayName',
      label: 'Name and surname',
      type: 'text',
      placeholder: 'Anh Pham ',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'mail',
      placeholder: 'anhp8505@gmail.com@gmail.com',
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: '+84393171757',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password for 6 to 8 character',
    },
    {
      id: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'War 8, Dalat city',
    },
    {
      id: 'country',
      label: 'Country',
      type: 'text',
      placeholder: 'VietNam',
    },
  ];

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

  console.log(data);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await setDoc(doc(db, 'users', res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('new')}>
      <div className={cx('newContainer')}>
        <div className={cx('top')}>
          <img className={cx('logo')} src={logo} alt="logo" />
        </div>
        <div className={cx('bottom')}>
          <div className={cx('left')}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className={cx('right')}>
            <form onSubmit={handleAdd}>
              <div className={cx('formInput')}>
                <label htmlFor="file">Image:logo</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {userInputs.map((input) => (
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
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
