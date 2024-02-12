import React, { useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { signOut } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import { auth } from "../firebase";
import { AdminContext } from "../context/admin_context";
import "./navbar.css";
import { AuthContext } from "../context/auth_context";


function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin)
  const naviagte = useNavigate();

  function signout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        window.location.reload();
        // naviagte("/login");
      })
      .catch((error) => { });
  }
  return (
    <div id="navheader">
      <nav id="headernav">
        <div id="logotext">SCHOLARSHIPS</div>
        <ul className="nav_links">
          <li>
            <a>
              <Link to="/">Home</Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/viewScholarships">Scholarships</Link>
            </a>
          </li>
          {!isAdmin && <li>
            <a href="#">
              <Link to="/onlineScholarships"> oneline Scholarships</Link>
            </a>
          </li>}
          {isAdmin && <li>
            <a href="#">
              {isAdmin && <Link to="/newScholarship">Add Scholarship</Link>}

            </a>
          </li>}
          {isAdmin && <li>
            <a href="#">
              {isAdmin && <Link to="/feedbacks">Feedbacks</Link>}

            </a>
          </li>}
          {!isAdmin && <li>
            <a href="#">
              {<Link to="/about">Contact us</Link>}
            </a>
          </li>}


        </ul>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          rootClose
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              {/* <Popover.Header as="h3">{`Popover bottom`}</Popover.Header> */}
              <Popover.Body>
                {!isAdmin &&
                  <>{
                    currentUser && (
                      <Link to="/profile">
                        <strong>Profile</strong>
                      </Link>
                    )}
                    <br />
                    <hr />
                  </>
                }

                <>
                  {currentUser && (
                    <a onClick={signout}>
                      {" "}
                      <strong>Log out</strong>
                    </a>
                  )}
                </>
              </Popover.Body>
            </Popover>
          }
        >

          {currentUser ? (
            <a variant="secondary">Account</a>
          ) : (
            <a>
              <Link to="/login">Login</Link>
            </a>
          )}
        </OverlayTrigger>
      </nav>
    </div>
  );
}

export default NavBar;
