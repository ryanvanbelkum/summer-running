import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCNl-8FL-mq_STYwgos-oe_cd6rx0GfACk",
    authDomain: "summer-running.firebaseapp.com",
    databaseURL: "https://summer-running.firebaseio.com",
    projectId: "summer-running",
    storageBucket: "summer-running.appspot.com",
    messagingSenderId: "1067090960220",
    appId: "1:1067090960220:web:b27d95c0ec93eb45"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

const auth = firebase.auth();
export {auth}
