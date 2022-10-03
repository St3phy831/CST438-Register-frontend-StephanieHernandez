import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./AddStudent.css";
import Cookies from "js-cookie";
import { SERVER_URL } from "../constants.js";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => setName(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const addStudent = () => {
    const token = Cookies.get("XSRF-TOKEN");

    fetch(`${SERVER_URL}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token },
      body: JSON.stringify({
        name: name,
        email: email,
        status_code: 0,
        status: "",
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Student successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Can't add student", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .catch((err) => {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });

    // Clears input
    setName("");
    setEmail("");
  };

  return (
    <div>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {"Add Student "}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div align="left" className="student-info">
        <form>
          <label>
            Name:
            <input
              type="text"
              className="input-text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Email Address:
            <input
              type="text"
              className="input-text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br></br>
          <div>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={addStudent}
            >
              Add Student
            </Button>
            <Button
              component={Link}
              to={{ pathname: "/" }}
              variant="outlined"
              color="secondary"
              style={{ marginTop: 20, marginLeft: 20 }}
            >
              Return
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
}
