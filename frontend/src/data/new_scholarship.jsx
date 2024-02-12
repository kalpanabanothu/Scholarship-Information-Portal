import { useContext, useEffect, useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/auth_context";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './new_scholarship.css'
import add from '../assets/add.svg'

const New = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [gender, setGender] = useState("")
  const [year, setYear] = useState("")
  const [caste, setCaste] = useState("")
  const naviage = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const uploadFile = () => {
      const img_unique_id = uuid();
      const storageRef = ref(storage, img_unique_id);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });

    console.log(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const unique_id = uuid();
    await setDoc(doc(db, "scholarships", unique_id), {
      ...data,
      timestamp: serverTimestamp(),
      gender: gender,
      year: year,
      caste: caste,
      id: unique_id,
    });
    toast('🦄 Upload success!', {
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
  };
  return (
    <>
      <NavBar />
      <div className="addbg">
        <img src={add} alt="" />
      </div>

      <div className="formcenter">
        <Form onSubmit={handleAdd}>
          <input type={"file"} className="form-control" onChange={(e) => setFile(e.target.files[0])} />

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
              />
            </Form.Group>

          ))
          }
          <DropdownButton alignRight id="dropdown-menu-align-right" defaultValue={caste ? caste : "caste"} title={caste ? caste : "caste"} onToggle={() => { }} onSelect={e => { setCaste(e); console.log(caste) }}>
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
            <Dropdown.Divider />
          </DropdownButton>

          <div className='radiobtn' onChange={e => { setGender(e.target.value); console.log(gender) }}>
            <input type="radio" value="male" name="gender" /> Male
            <input type="radio" value="female" name="gender" /> Female
            <input type="radio" value="any" name="gender" /> Any
          </div>

          <div className='radiobtn' onChange={e => { setYear(e.target.value); console.log(year) }}>
            <input type="radio" value="ug" name="year" /> UG
            <input type="radio" value="pg" name="year" /> PG
            <input type="radio" value="any" name="year" /> Any
          </div>





          <Button
            id="add-scholarship"
            disabled={percentage != null && percentage < 100}
            variant="primary"
            type="submit"
          >
            Add scholarship
          </Button>
        </Form>
      </div>
    </>
  );
};

export default New;
