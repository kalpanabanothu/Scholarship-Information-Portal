import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { db } from "../firebase";
import './feedbacks.css'
import { AdminContext } from "../context/admin_context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import search from '../assets/search.svg'
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../context/auth_context';

function Feedbacks() {
    const [scholarships, setScholarships] = useState([]);
    const collectionRef = collection(db, "feedbacks");
    const { isAdmin } = useContext(AdminContext);

    const { dispatcher } = useContext(AdminContext);
    const { currentUser } = useContext(AuthContext);
    const docRef = doc(db, "users", currentUser.uid);
    console.log(isAdmin)
    const navigate = useNavigate()




    useEffect(() => {
        const getScholarships = async () => {

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

            const data = await getDocs(collectionRef);
            console.log(data)
            setScholarships(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getScholarships();
    }, []);
    return (
        <>
            <NavBar />
            {scholarships.map((user) => {
                var x = user.timestamp.seconds * 1000;
                // console.log(new Date(x).getTime())
                // console.log(new Date().getTime())
                var y = new Date().getTime() - new Date(x).getTime()
                console.log(y / (1000 * 3600 * 24))
                return (
                    <div class="container_scholarship">
                        <div class="blog-post">

                            <div class="blog-post_info">
                                <div class="blog-post_date">
                                    <span className="scholarshipName">{user.email}</span>
                                    <span>{Math.floor(y / (1000 * 3600 * 24))} days ago</span>
                                </div>
                                <h1 class="blog-post_title">{user.name}</h1>
                                <p class="blog-post_text">
                                    {user.subject}
                                </p>
                                <h5>{user.message}</h5>

                            </div>
                        </div>

                    </div>
                );
            })}


        </>
    );
}

export default Feedbacks;

// function UpdateScholarship(props) {

//   const location = useLocation();
//   console.log("========================",location.state.id)