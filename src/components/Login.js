import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "primereact/card";
import { Input, Icon } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import req from "../helper/api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      toHome: false,
      toAdmin: false,
      eyeIcon: "eye slash",
      username: "",
      password: ""
    };
  }
  handleEyeClick = () => {
    if (this.state.hidden) {
      this.setState({ eyeIcon: "eye", hidden: false });
    } else {
      this.setState({ eyeIcon: "eye slash", hidden: true });
    }
  };
  handleLogin = (event) => {
    event.preventDefault();
    var body = { username: this.state.username, password: this.state.password };
    req
      .login(body)
      .then(resp => {
        if (resp.data.status) {
          if (resp.data.user.isAdmin) {
            localStorage.setItem("isAdmin", "true");
            this.setState({ toAdmin: true });
          } else {
            localStorage.setItem("isAdmin", "false");
            this.setState({ toHome: true });
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
    return (
      <div className="Login">
        <div className="login-card">
          <div id="logimg">
            <h1 id="log-title">CliniCords</h1>
          </div>
          <Card className="tranparent">
            <div id="log-form">
              <form onSubmit={this.handleLogin}>
                <Input
                  className="inpLogin"
                  icon="mail"
                  size="large"
                  placeholder="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <br />
                <br />
                <Input
                  className="inpLogin"
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

                <Button
                  id="btnLogin"
                  variant="outline-primary"
                  size="lg"
                  block
                  onClick={this.handleLogin}
                  type="submit"
                >
                  LOGIN
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
