import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { collection, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar";
import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";


const UserProfile = ({ }) => {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const collectionRef = collection(db, "scholarships");
    const [editMode, setEditMode] = useState(false);
    const docRef = doc(db, "users", currentUser['uid']);
    useEffect(() => {
        const getUserData = async () => {
            const data = await getDoc(docRef);
            setUserData(data.data());
        };
        getUserData();
    }, []);

    const handleEditClick = async (updatedData) => {

        if (editMode) {
            console.log(userData)

            try {
                const userDoc = doc(db, "users", currentUser['uid']);
                await updateDoc(userDoc, {
                    department: userData.department,
                    annualIncome: userData.annualIncome,
                    plusTwo: userData.plusTwo,
                    tenth: userData.tenth,
                    year: userData.year,
                    gender: userData.gender,
                    caste: userData.caste,
                });

                setEditMode(false);
                toast('Update success!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log("User data updated successfully!");
            } catch (error) {
                toast('Update error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error("Error updating user data:", error);
            }
        }
        setEditMode(!editMode);

    };



    return (
        <div>
            <NavBar />
            <Container className="mt-4">
                <h2>User Profile</h2>
                <Form>


                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" defaultValue={userData.department} readOnly={!editMode} onChange={(e) => setUserData({ ...userData, department: e.target.value })} />
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Caste</Form.Label>
                            {editMode ? (
                                <Form.Select value={userData.caste} onChange={(e) => setUserData({ ...userData, caste: e.target.value })}>
                                    <option value="General">General</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="OBC">OBC</option>
                                    <option value="Ezhava">Ezhava</option>
                                </Form.Select>
                            ) : (
                                <Form.Control type="text" value={userData.caste} readOnly />
                            )}
                        </Col>
                        <Col>
                            <Form.Label>10th Mark</Form.Label>
                            <Form.Control type="text" defaultValue={userData.tenth} readOnly={!editMode} onChange={(e) => setUserData({ ...userData, tenth: e.target.value })} />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Annual Income</Form.Label>
                            <Form.Control type="text" defaultValue={userData.annualIncome} readOnly={!editMode} onChange={(e) => setUserData({ ...userData, annualIncome: e.target.value })} />
                        </Col>
                        <Col>
                            <Form.Label>Gender</Form.Label>
                            {editMode ? (
                                <Form.Select value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                            ) : (
                                <Form.Control type="text" value={userData.gender} readOnly />
                            )}
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Plus Two Marks</Form.Label>
                            <Form.Control type="text" value={userData.plusTwo} readOnly={!editMode} onChange={(e) => setUserData({ ...userData, plusTwo: e.target.value })} />
                        </Col>
                        <Col>
                            <Form.Label>Year</Form.Label>
                            {editMode ? (
                                <Form.Select value={userData.year} onChange={(e) => setUserData({ ...userData, year: e.target.value })}>
                                    <option value="pg">PG</option>
                                    <option value="ug">UG</option>
                                </Form.Select>
                            ) : (
                                <Form.Control type="text" value={userData.year} readOnly />
                            )}
                        </Col>
                    </Row>



                    <Button variant="primary" onClick={handleEditClick}>
                        {editMode ? "Save Changes" : "Edit Profile"}
                    </Button>
                </Form>
            </Container>
        </div>

    );
};

export default UserProfile;
