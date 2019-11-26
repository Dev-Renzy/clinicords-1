import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Input, Icon, type } from "semantic-ui-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./Menu";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailvalid, setEmailvalid] = useState("admin");
  const [passwordvalid, setPasswordvalid] = useState("admin");
  const [login, setLogin] = useState(false);

  var [inpType, setInputType] = useState("password");
  var [lastType, setLastType] = useState(true);
  var [eyeIcon, setEyeIcon] = useState("eye slash");
  function validateForm() {
    if(email==emailvalid&&password==passwordvalid){
          setLogin(true);
    }else{
      setLogin(false)
    }
    return email.length > 0 && password.length > 0;
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if(email)
  // }
   function handleEyeClick(event){
    event.preventDefault();
    if(lastType){
      setInputType("text");
      setLastType(false);
      setEyeIcon("eye");
    }else{
      setInputType("password");
      setLastType(true);
      setEyeIcon("eye slash");
    }
  }

  return (
    <div className="Login">
      <div className="login-card">
        <div id="logimg">
          <h1 id="log-title">CliniCords</h1>
        </div>
        <Card className="tranparent">
          <div id="log-form">
            <Input
              className="inpLogin"
              icon="mail"
              size="large"
              placeholder="Username"
              onChange={setEmailvalid}
             
            />
            <br />
            <br />
            <Input
              className="inpLogin"
              type={inpType}
              icon={<Icon name={eyeIcon} link onClick={handleEyeClick}/>}
              size="large"
              placeholder="Password"
              onChange={setPasswordvalid}
            />
            <br />
            <br />
           
            <Link to="/home" >
              <Button id="btnLogin" variant="outline-primary" size="lg" block   >LOGIN</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
