import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

const FirebaseApp = initializeApp(firebaseConfig);
initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const storage = getStorage(FirebaseApp);
export const auth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);