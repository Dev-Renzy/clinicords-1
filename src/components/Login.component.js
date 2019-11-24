import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Input } from "semantic-ui-react";
//import Map from "./Map";
import Menu from "./Menu";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Card className="login-card">
        <div id="logimg">
          <h1>CliniCords</h1>
        </div>
        
        <div id="log-form">
          <Input
            className="inpLogin"
            icon="mail"
            size="large"
            placeholder="Username"
          />
          <br />
          <br />
          <Input className="inpLogin" icon="eye" size="large" placeholder="Password" />
          <br />
          <br />
          <Link to="/home">
            <Button label="Home">Login</Button>
          </Link>
        </div>
        
      </Card>
    </div>
  );
}
