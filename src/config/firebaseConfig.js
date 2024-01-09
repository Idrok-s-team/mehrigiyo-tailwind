import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDeDiGFHYjSvj2-ukVYVHAcO3ZLX6tYYrU',
  authDomain: 'mehrigiyo-ee13d.firebaseapp.com',
  projectId: 'mehrigiyo-ee13d',
  storageBucket: 'mehrigiyo-ee13d.appspot.com',
  messagingSenderId: '812676552551',
  appId: '1:812676552551:web:d46d1ba0e84b44f1f201c2',
  measurementId: 'G-9R0EWNTF9Z',
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export default firestore
