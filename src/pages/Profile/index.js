import { useUserContext } from '../../context/userContext';
import { getAuth } from 'firebase/auth';

function Profile() {
  const { user } = useUserContext();
  const auth = getAuth();
  // const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <h1>Email User: {user.email}</h1>
    </div>
  );
}

export default Profile;
