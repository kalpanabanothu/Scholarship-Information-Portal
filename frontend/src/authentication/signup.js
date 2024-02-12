import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import { db, storage } from "../firebase";
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from '../firebase';
import { AuthContext } from '../context/auth_context';
import NavBar from '../components/navbar';
import { useNavigate } from "react-router-dom";
import './login.css'
import { Link } from 'react-router-dom';
const Details = ({ inputs }) => {

  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("")
  const [year, setYear] = useState("")
  const [caste, setCaste] = useState("")
  const [uid, setuid] = useState();
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()



  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });

    console.log(data);
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          email: email,
          ...data,
          gender: gender,
          year: year,
          role: "user",
          caste: caste,
          timestamp: serverTimestamp(),
        });
        toast('🦄 Successfully created account!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  return (
    <>
      <NavBar />

      <div className="parent clearfix">
        <div className="bg-illustration">
        </div>
        <div className="login">
          <div className="container">

            <div className="login-form signup-form">
              <form onSubmit={handleSignup}>
                <input type={"text"} onChange={e => setEmail(e.target.value)} placeholder="Email address"></input>
                <input type={"password"} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                {inputs.map((input) => (
                  // <div className="formInput" key={input.id}>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} />
                  // </div>
                ))}
                <div className='radiobtn' onChange={e => { setGender(e.target.value); console.log(gender) }}>
                  <input type="radio" value="male" name="gender" /> Male
                  <input type="radio" value="female" name="gender" /> Female
                </div>

                <div className='radiobtn' onChange={e => { setYear(e.target.value); console.log(year) }}>
                  <input type="radio" value="ug" name="year" /> UG
                  <input type="radio" value="pg" name="year" /> PG
                </div>

                <DropdownButton alignRight defaultValue={caste ? caste : "caste"} title={caste ? caste : "caste"} onToggle={() => { }} id="dropdown-menu-align-right" onSelect={e => { setCaste(e); console.log(caste) }}>
                  <Dropdown.Item eventKey="General">General</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="SC">SC</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="ST">ST</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="OBC">OBC</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="Ezhava">Ezhava</Dropdown.Item>
                </DropdownButton>

                <button type="submit">SIGN-UP</button>
                <div className="forget-pass login-link">
                  <a href="#"><Link to={'/login'}>Need to login ?</Link></a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // return (

  //   <>
  //   <NavBar/>
  //   <Form onSubmit={handleSignup}>
  //   <input type={"text"} onChange={e=>setEmail(e.target.value)}></input>
  //   <input type={"password"} onChange={e=>setPassword(e.target.value)}></input>
  //   {inputs.map((input) => (
  //             <div className="formInput" key={input.id}>
  //             <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
  //             </div>
  //         ))}
  //   <button type='submit'>Create account</button>
  // </Form>
  //   </>
  // )

}


export default Details