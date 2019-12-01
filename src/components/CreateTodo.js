import React, { Component } from "react";

import { Redirect,Link } from "react-router-dom";
import { Card, Form, Segment, Button } from "semantic-ui-react";
import req from "../helper/api";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      middlename: "",
      lastname: "",
      profession: "",
      username: "",
      password: "",
      repeatpass: "",
      todo_completed: false,
      values: [],
      toAdminHome: false,
      updating: false
    };
    this.updateForUsers = this.updateForUsers.bind(this);
  }
  componentDidMount() {
    console.log("Current route ", this.props.location.pathname);
    let myroute = this.props.location.pathname;
    if (myroute.includes("create")) {
      this.setState({ updating: false });
    } else {
      this.setState({ updating: true });
      this.getNow();
      req
        .idUsers(this.props.location.state.id)
        .then(resp => {
          console.log("Users: ", resp.data.info);
          let datai = resp.data.info;
          this.setState({ firstname: datai.firstname });
          this.setState({ middlename: datai.middlename });
          this.setState({ lastname: datai.lastname });
          this.setState({ profession: datai.profession });
          this.setState({ username: datai.username });
          this.setState({ password: datai.password });
          this.setState({ repeatpass: datai.repeatpass });
        })
        .catch(err => {
          console.log("error on record");
        });
    }  
  }
  


  addtoDB = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.repeatpass) {
      let user = {
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        middlename: this.state.middlename,
        lastname: this.state.lastname,
        profession: this.state.profession,
        haschange:false
      };
      req.addUser(user).then(resp => {
        this.setState({ toAdminHome: true })
        console.log("addUser: ",resp)
      }).catch(err => {
        console.log(err)
      })
    } else {
      alert("sayop!!")
    }

  }
  async updateForUsers(e){
    e.preventDefault()
    const body = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      middlename: this.state.middlename,
      lastname: this.state.lastname,
      profession: this.state.profession
    };
    await req
      .updateUsers(this.props.location.state.id, body)
      .then(resp => {
        this.setState({ toAdminHome: true });
        console.log("updateuser: ",resp)
      })
      .catch(err => {
        console.log(err);
      });

  }
  handleCancel = () => {
    this.setState({ visible: true });
    
  }
  getNow = () => {
    req
      .idUsers(this.props.location.state.id)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log("error on getting records");
      });
  };

  render() {
    if (this.state.toAdminHome === true) {
      return <Redirect to="/admin" />
    }
    const pageTitle = this.state.updating ? (
      <h1>Update User Information</h1>
    ) : (
      <h1 id="infouser">User Information</h1>
    );
    const update = this.state.updating ? (
      <div>
        <Segment id="segment" inverted color='teal'>
          <Button id = "segment-btn" basic inverted color="teal" onClick={this.updateForUsers}>
            Update
          </Button>
          <Link to="admin">
          <Button id = "segment-btn" basic inverted color="teal" onClick={this.handleCancel}>
            Cancel
          </Button>
        </Link>
        </Segment><br/>
      </div>
    ) : (
      <Segment id="segment" inverted color='teal'>
        <Button id = "segment-btn" basic inverted color="teal" onClick={this.addtoDB}>
          Add User
        </Button>
        <Link to="admin">
          <Button id = "segment-btn" basic inverted color="teal" onClick={this.handleCancel}>
            Cancel
          </Button>
        </Link>
      </Segment>
    );
    return (
      <div>
        <br />
        <br />
        <Card id="card_user">
          <div style={{ marginTop: 20 }}>
            <Form>
            <div>
                <center>{pageTitle}</center>
              </div><br/><br/>
              <div>
                {/* <h1>Create Users</h1> */}
                <Form.Input
                  fluid
                  value={this.state.firstname}
                  label="First Name "
                  placeholder="firstname"
                  onChange={e => this.setState({ firstname: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  value={this.state.middlename}
                  label="Middle Name "
                  placeholder="middlename"
                  onChange={e => this.setState({ middlename: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  value={this.state.lastname}
                  label="Last Name "
                  placeholder="lastname"
                  onChange={e => this.setState({ lastname: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  value={this.state.profession}
                  label="Profession "
                  placeholder="profession"
                  onChange={e => this.setState({ profession: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  value={this.state.username}
                  label="Username "
                  placeholder="username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <br />
                <Form.Input
                  fluid
                  value={this.state.password}
                  type="password"
                  label="Password"
                  placeholder="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <Form.Input
                  fluid
                  value={this.state.repeatpass}                  
                  type="password"
                  label="Repeat Password"
                  placeholder="repeat password"
                  onChange={e => this.setState({ repeatpass: e.target.value })}
                />
                <br />
                <div>{update}</div>
                {/* <Segment id="segment" inverted color='teal'>
                  <Button id="segment-btn" basic inverted color="teal" onClick={this.addtoDB}>
                    Add User
                  </Button>
                  <Link to="admin">
                    <Button id="segment-btn" basic inverted color="teal" onClick={this.handleCancel}>
                      Cancel
                  </Button>
                  </Link>
                </Segment> */}
                <br />
              </div>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}
