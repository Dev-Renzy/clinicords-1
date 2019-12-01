import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "primereact/card";
import { Input, Icon } from "semantic-ui-react";
import {Modal} from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import req from "../helper/api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      hidden1: true,
      hidden2: true,
      toHome: false,
      toAdmin: false,
      eyeIcon: "eye slash",
      eyeIcon1: "eye slash",
      eyeIcon2: "eye slash",
      username: "",
      password: "",
      bfchangepass: true,
      changingpass: false,
      afchangepass: false,
      newpassone:"",
      newpasstwo:"",
      id:null,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleEyeClick = () => {
    if (this.state.hidden) {
      this.setState({ eyeIcon: "eye", hidden: false });
    } else {
      this.setState({ eyeIcon: "eye slash", hidden: true });
    }
  };
  handleEyeClickpass1 = () => {
    if (this.state.hidden1) {
      this.setState({ eyeIcon1: "eye", hidden1: false });
    } else {
      this.setState({ eyeIcon1: "eye slash", hidden1: true });
    }
  };
  handleEyeClickpass2 = () => {
    if (this.state.hidden2) {
      this.setState({ eyeIcon2: "eye", hidden2: false });
    } else {
      this.setState({ eyeIcon2: "eye slash", hidden2: true });
    }
  };
  handleLogin = (event) => {
    event.preventDefault();
    let body = { username: this.state.username, password: this.state.password };
    req
      .login(body)
      .then(resp => {
        if (resp.data.status) {
          if (resp.data.user.isAdmin) {
            localStorage.setItem("isAdmin", "true");
            this.setState({ toAdmin: true });
          } else {
            if(resp.data.user.haschange){
              let body = { username: this.state.username, password: this.state.password };
              req.login(body).then(respon=>{
                if(respon.data.status){
                  localStorage.setItem("isAdmin", "false");
                  this.setState({ toHome: true });
                }else{
                  alert(resp.data.sms);
                }
              })
            }else{
              if(this.state.bfchangepass){
                this.setState({changingpass: true,bfchangepass:false})
              }else if(this.state.changingpass){
                if (this.state.newpassone===this.state.newpasstwo){
                  let body = {username: this.username, password: this.state.newpassone, haschange:true}
                  req.updatePass(resp.data.user._id, body).then(respo=>{
                    if(respo.data.status){
                      this.setState({afchangepass:true, username:"", password:"",changingpass:false, modalOpen:true, hidden:true, eyeIcon: 'eye slash'})
                    }else{
                      console.log("sms: ",respo.data.sms);
                    }
                  }).catch(err=>{
                    console.log(err)
                  })
                }
              }
            }
          }
        } else {
          alert(resp.data.sms);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.toHome) {
      return <Redirect to="/home" />;
    }
    if (this.state.toAdmin) {
      return <Redirect to="/admin" />;
    }
    var label = this.state.changingpass?("Change your password"):("")
    const btnChanging = this.state.changingpass? ("SAVE"):("LOGIN")
    const newPassInput = this.state.changingpass?(<div>
      <Input
      className="inpLogin"
      value={this.state.newpassone}
      type={this.state.hidden1 ? "password" : "text"}
      icon={<Icon name={this.state.eyeIcon1} link onClick={this.handleEyeClickpass1} />}
      size="large"
      placeholder="Password"
      onChange={e => this.setState({ newpassone: e.target.value })}
    /><br/><br/>
    <Input
    className="inpLogin"
    value={this.state.newpasstwo}
    type={this.state.hidden2 ? "password" : "text"}
    icon={<Icon name={this.state.eyeIcon2} link onClick={this.handleEyeClickpass2} />}
    size="large"
    placeholder="Password"
    onChange={e => this.setState({ newpasstwo: e.target.value })}
  /><br/><br/></div>):(<div></div>)
    return (
      <div className="Login">
        <div className="login-card">
          <div id="logimg">
            <h1 id="log-title">CliniCords</h1>
          </div>
          <Card className="tranparent">
            <div>
              <h2 className="red">{label}</h2>
            </div>
            <div id="log-form">
              <form onSubmit={this.handleLogin}>
                <Input
                  className="inpLogin"
                  value={this.state.username}
                  icon="mail"
                  size="large"
                  placeholder="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <br />
                <br />
                <Input
                  className="inpLogin"
                  value={this.state.password}
                  type={this.state.hidden ? "password" : "text"}
                  icon={
                    <Icon
                      name={this.state.eyeIcon}
                      link
                      onClick={this.handleEyeClick}
                    />
                  }
                  size="large"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <br />
                <br />
                {newPassInput}
                <Button
                  id="btnLogin"
                  variant="outline-primary"
                  size="lg"
                  block
                  onClick={this.handleLogin}
                  type="submit"
                >
                  {btnChanging}
                </Button>
              </form>
            </div>
          </Card>
          <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
      >
      
        <div id="reminder">
        <center>
          <h1>Reminder</h1>
          <h3>PLEASE LOGIN WITH YOUR NEW PASSWORD</h3>
          </center>
          </div>
        <Modal.Actions>
          <Button variant="outline-success"  onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      
      </Modal>
        </div>
        
      </div>
    );
  }
}
