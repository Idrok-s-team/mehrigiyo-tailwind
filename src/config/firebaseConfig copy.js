import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDHvyLMQglvN-jDEtGKTiujJwEoT70NdME',
  authDomain: 'doctor-ali.firebaseapp.com',
  projectId: 'doctor-ali',
  storageBucket: 'doctor-ali.appspot.com',
  messagingSenderId: '199612669159',
  appId: '1:199612669159:web:fdc3affd65ce96f43f9642',
  measurementId: 'G-L960K55V1G',
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export default firestore
