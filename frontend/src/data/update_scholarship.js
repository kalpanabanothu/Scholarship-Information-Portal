import { useContext, useEffect, useState } from "react"
import { updateDoc, doc, serverTimestamp, collection } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { AuthContext } from "../context/auth_context";
import NavBar from "../components/navbar";
import { v4 as uuid } from 'uuid';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';

import { Button, Form } from "react-bootstrap";

function UpdateScholarship({ inputs, title }, props) {

  const location = useLocation();
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [gender, setGender] = useState("")
  const [year, setYear] = useState("")
  const [caste, setCaste] = useState("")
  const [percentage, setPercentage] = useState(null);
  const naviage = useNavigate();


  const { currentUser } = useContext(AuthContext)



  useEffect(() => {

    const updateFile = () => {
      const img_unique_id = uuid();
      const storageRef = ref(storage, img_unique_id);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          });
        }
      );

    };
    file && updateFile();
  }, [file])

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
    console.log(data);
  }

  const handleUpdate = async (e) => {
    const userDoc = doc(db, "scholarships", location.state.id);
    e.preventDefault();
    await updateDoc(userDoc, {
      ...data,
      gender: gender ? gender : location.state.scholarshipdata['gender'],
      year: year ? year : location.state.scholarshipdata['year'],
      caste: caste ? caste : location.state.scholarshipdata['caste'],
    });
    toast('🦄 Update success!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    naviage("/")
  }
  return (
    <>
      <NavBar />
      <div className="formcenter">
        <Form onSubmit={handleUpdate}>
          <input type={"file"} onChange={(e) => setFile(e.target.files[0])} />

          {inputs.map((input) => (
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              key={input.id}
            >
              <Form.Control
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleInput}
                defaultValue={location.state.scholarshipdata[input.id] || ''}
              />
            </Form.Group>


          ))
          }
          <div className='radiobtn' defaultValue={location.state.scholarshipdata['gender']} onChange={e => { setGender(e.target.value); console.log(gender) }}>
            <input type="radio" value="male" name="gender" defaultChecked={location.state.scholarshipdata['gender'] == 'male'} /> Male
            <input type="radio" value="female" name="gender" defaultChecked={location.state.scholarshipdata['gender'] == 'female'} /> Female
            <input type="radio" value="any" name="gender" defaultChecked={location.state.scholarshipdata['gender'] == 'any'} /> Any
          </div>

          <div className='radiobtn' defaultValue={location.state.scholarshipdata['year']} onChange={e => { setYear(e.target.value); console.log(year) }}>
            <input type="radio" value="ug" name="year" defaultChecked={location.state.scholarshipdata['year'] == 'ug'} /> UG
            <input type="radio" value="pg" name="year" defaultChecked={location.state.scholarshipdata['year'] == 'pg'} /> PG
            <input type="radio" value="any" name="year" defaultChecked={location.state.scholarshipdata['year'] == 'any'} /> Any
          </div>

          <DropdownButton alignRight id="dropdown-menu-align-right" onToggle={() => { }} defaultValue={caste ? caste : location.state.scholarshipdata['caste']} title={caste ? caste : location.state.scholarshipdata['caste']} onSelect={e => { setCaste(e); console.log(e) }}>
            <Dropdown.Item eventKey="General">General</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="SC">SC</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="ST">ST</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="OBC">OBC</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="Ezhava">Ezhava</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="any">Any</Dropdown.Item>
          </DropdownButton>


          <Button
            disabled={percentage != null && percentage < 100}
            variant="primary"
            type="submit"
          >
            Update scholarship
          </Button>
        </Form>
      </div>
    </>
  );

}

export default UpdateScholarship;