import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import "./AddStudent.css";
import Cookies from "js-cookie";
import { SERVER_URL } from "../constants.js";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AddStudent() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value);
    else setEmail(event.target.value);
  };

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
      <Button
        id="AddStudent"
        component={Link}
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add Student
      </Button>
      <Button
        component={Link}
        to={{ pathname: "/" }}
        variant="outlined"
        color="secondary"
        style={{ margin: 10 }}
      >
        Return
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id="Add" color="primary" onClick={addStudent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
