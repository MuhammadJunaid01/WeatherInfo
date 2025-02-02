import auth from '@react-native-firebase/auth';
import {Dispatch} from 'redux';
import {
  removeUser,
  setError,
  setLoading,
  setUser,
} from '../services/features/authSlice';

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const signUp = async (
  email: string,
  password: string,
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(setLoading(true)); // Set loading to true before starting the signup
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
    ); // Set user data in Redux store
  } catch (error: any) {
    dispatch(setError(error.message)); // Handle error if signup fails
  }
};

export const signIn = async (
  email: string,
  password: string,
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(setLoading(true)); // Set loading to true before starting the login
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
    ); // Set user data in Redux store
  } catch (error: any) {
    dispatch(setError(error.message)); // Handle error if login fails
  }
};

export const logOut = async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(setLoading(true)); // Set loading to true before logging out
    await auth().signOut();
    dispatch(removeUser()); // Remove user data from Redux store
  } catch (error: any) {
    dispatch(setError(error.message)); // Handle error if logout fails
  }
};

// Get the current user
export const getCurrentUser = (): FirebaseUser | null => {
  const user = auth().currentUser;

  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  return null;
};
