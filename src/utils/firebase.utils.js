// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,
signOut,onAuthStateChanged } from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbHckNpGuHqJlJgVcdcg6AakFMvA4DX6g",
  authDomain: "crwn-clothing-110b0.firebaseapp.com",
  projectId: "crwn-clothing-110b0",
  storageBucket: "crwn-clothing-110b0.appspot.com",
  messagingSenderId: "126557427858",
  appId: "1:126557427858:web:d5c14adbf3d76de3382e4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters(
    {
        prompt : 'select_account'
    }
)

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) =>{
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef,object.title.toLowerCase())
        batch.set(docRef,object)
    })
        await batch.commit()
        console.log('Done')
}

export const getCategoriesAndDocuments = async() =>{
    const collectionRef = collection( db, 'categories' )
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const { title,items } = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }
    ,{})
    return categoryMap
}

export const createUserDocumentFromAuth = async(userAuth,additionalInformation={}) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,email,createdAt,...additionalInformation
            })
        }
        catch(error){
            console.log('Error creating user',error.message)
        }
        return userDocRef;
        
    }
}

export const createAuthUserWithUserAndPassword = async (email,password) =>{
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);
