import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import FirebaseConfig from './FirebaseConfig'
const firebaseApp = firebase.initializeApp(FirebaseConfig)

const settings = {timestampInSnapshot:true}
firebaseApp.firestore().settings(settings)

const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const auth = firebaseApp.auth()

export default { firestore, storage , auth}
