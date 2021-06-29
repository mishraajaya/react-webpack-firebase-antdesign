import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR AUTH DOMAIN',
  projectId: 'YOUR PROJECT ID',
  storageBucket: 'YOUR STORAGE BUCKET',
  messagingSenderId: 'YOUR MESSAGING SENDER ID',
  appId: 'YOUR APP ID'
}
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(config)

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
