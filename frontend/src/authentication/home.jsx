import React, { useContext, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import NavBar from '../components/navbar'
import { AdminContext } from '../context/admin_context';
import { AuthContext } from '../context/auth_context';
import { db } from '../firebase';
import './home.css'
import savings from '../assets/savings.svg'
export default function Home() {

  const { dispatcher } = useContext(AdminContext);
  const { currentUser } = useContext(AuthContext);
  const docRef = doc(db, "users", currentUser.uid);
  useEffect(() => {
    const handleLogin = async (e) => {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().role)
      if (docSnap.exists()) {
        if (docSnap.data().role === 'admin') {
          console.log("admin dispatch")
          dispatcher({ type: "ADMIN" });
        } else {
          console.log("user dispatch")
          dispatcher({ type: "NOTADMIN" });
        }
        // console.log(docSnap.data().Role)
      }
    };
    handleLogin();
  }, []);


  return (
    <div id='bodybg'>
      <NavBar />
      <div className='mainpagetext'>
        {/* <h1><b>COLLEGE SCHOLARSHIP PORTAL</b></h1>           */}
        <div className='savingshome'>
          <img src={savings}></img>
        </div>
        <pre>
          “Education is the most powerful weapon <br></br>
          you can use to change the world.” —B.B. King
        </pre>
      </div>
    </div>

  )
}
