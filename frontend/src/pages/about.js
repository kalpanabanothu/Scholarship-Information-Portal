import { doc, Firestore, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { setDoc, serverTimestamp } from "firebase/firestore";
import NavBar from "../components/navbar";
import { AdminContext } from "../context/admin_context";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatRoom from "./chatroom";


function Contact() {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const naviage = useNavigate();

  const { isAdmin } = useContext(AdminContext);
  const [user] = useAuthState(auth)
  console.log(user)
  const { name, email, subject, message } = state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Provide value in all input field");
    } else {
      await setDoc(doc(db, "feedbacks", email), {
        ...state,
        timestamp: serverTimestamp(),
      });
      toast.success("We'll get back to you soon");
    }
    naviage("/");
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <NavBar></NavBar>

      <>
        {user && <ChatRoom />}

      </>
      {!isAdmin && <section className="contact-section">
        <div className="container">
          {/* <ToastContainer position="top-center" /> */}
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <div className="contact-wrap w-100 p-lg-5 p-4">
                      <h3 className="mb-4">Send us a message</h3>
                      <form
                        id="contactForm"
                        className="contactForm"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input

                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                onChange={handleInputChange}
                                value={name}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                onChange={handleInputChange}
                                value={email}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                placeholder="Subject"
                                onChange={handleInputChange}
                                value={subject}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                type="text"
                                className="form-control"
                                name="message"
                                placeholder="Message"
                                cols="30"
                                rows="6"
                                onChange={handleInputChange}
                                value={message}
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Send Message"
                                className="btn btn-primary"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch">
                    <div className="info-wrap w-100 p-lg-5 p-4 img">
                      <h3>Contact us</h3>
                      <p className="mb-4">
                        We're open for any suggestion or just to have a chat
                      </p>
                      <div className="dbox w-100 d-flex align-items-start">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-map-marker"></span>
                        </div>
                        <div className="text pl-3">
                          <p>
                            <span>Address:</span>RGUKT Basar
                          </p>
                        </div>
                      </div>
                      <div className="dbox w-100 d-flex align-items-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-phone"></span>
                        </div>
                        <div className="text pl-3">
                          <p>
                            <span>Phone:</span>
                            <a href="tel://123456789"> 9492 XXXX XX</a>
                          </p>
                        </div>
                      </div>
                      <div className="dbox w-100 d-flex align-items-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-paper-plane"></span>
                        </div>
                        <div className="text pl-3">

                        </div>
                      </div>
                      <div className="dbox w-100 d-flex align-items-center">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-globe"></span>
                        </div>
                        <div className="text pl-3">
                          <p>
                            {/* <span>Website:</span>
                            <a href="https://www.google.com/" target={"_blank"}>click here</a> */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </>

  );
}


function chatRoom() {
  const messageRef = Firestore.collection('feedbacks').doc()
}


export default Contact
