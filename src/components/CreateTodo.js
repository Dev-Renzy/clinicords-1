import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Card, Form, Segment, Button } from "semantic-ui-react";
import req from "../helper/api";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: " ",
      lastName: " ",
      profession: " ",
      username: "",
      password: "",
      repeatpass: "",
      todo_completed: false,
      values: []
    };
  }
  handleSubmit=(e) =>{
    e.preventDefault();
   
    if (this.state.password === this.state.repeatpass) {
      let user = {
        isAdmin: false,
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstName,
        middlename: this.state.middleName,
        lastname: this.state.lastName,
        profession: this.state.profession
      };
      req.addUser(user).then(resp=>{
        console.log(resp)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      alert("sayop!!")
    }

  }

  render() {
    return (
      <div>
        <br />
        <br />
        <Card id="card_user">
          <div style={{ marginTop: 20 }}>
            <Form>
              <div>
                <h1>Create Users</h1>

                <Form.Input
                  fluid
                  label="First Name "
                  placeholder="firstname"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  label="Middle Name "
                  placeholder="middlename"
                  onChange={e => this.setState({ middleName: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  label="Last Name "
                  placeholder="lastname"
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  label="Profession "
                  placeholder="profession"
                  onChange={e => this.setState({ profession: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  label="Username "
                  placeholder="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  type="password"
                  label="Password"
                  placeholder="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <Form.Input
                  fluid
                  type="password"
                  label="Repeat Password"
                  placeholder="repeat password"
                  onChange={e => this.setState({ repeatpass: e.target.value })}
                />
                <br />
                <Segment id="segment" inverted color="teal">
                  <Button
                    id="segment-btn"
                    basic
                    inverted
                    color="teal"
                    onClick={this.handleSubmit}
                  >
                    Add User
                  </Button>
                  <Link to="/">
                    <Button
                      id="segment-btn"
                      basic
                      inverted
                      color="teal"
                      onClick={this.onClick}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Segment>
                <br />
              </div>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}
