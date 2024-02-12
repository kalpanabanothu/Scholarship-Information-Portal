import React, { useState, useEffect } from "react";
import { setDoc, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
function ChatRoom() {
    // const db = firebase.firestore();
    const [user] = useAuthState(auth)
    console.log(user.email)
    const collectionRef = collection(db, "feedbacks","x","y");
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getScholarships = async () => {
            const unsub = onSnapshot(collection(db, "feedbacks", "dennythomas1234@gmail.com","msgs"), (doc) => {
                console.log("==================",doc.docs.map(doc=>doc.data()))
              })
            //   setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
        };
        getScholarships();
      }, []);
    return(
        <div>
            {messages.map((user) => {
                return (
                    <div>
                    {user.message}
                    </div>
                );
            })}
        </div>
    );
}

export default ChatRoom