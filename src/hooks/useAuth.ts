import auth from '@react-native-firebase/auth';

// Sign up a new user
export const signUp = async (
  email: string,
  password: string,
): Promise<void> => {
  await auth().createUserWithEmailAndPassword(email, password);
};

// Sign in an existing user
export const signIn = async (
  email: string,
  password: string,
): Promise<void> => {
  await auth().signInWithEmailAndPassword(email, password);
};

// Sign out the current user
export const logOut = async (): Promise<void> => {
  await auth().signOut();
};
