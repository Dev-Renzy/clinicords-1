import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  TextArea,
  Container,
  Modal
} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import req from "../helper/api";
import { Dropdown } from "semantic-ui-react";

export default class Records extends Component {
  constructor(props) {
    super(props);
    this.el = document.getElementById("ShowMedicalRecords");
    this.state = {
      fname: "dsf",
      mname: "fds",
      lname: "fsadf",
      birthdate: "fsadf",
      age: 20,
      sex: "fsadf",
      status: "fdsf",
      address: "fsdf",
      email: "fdsf",
      contact: 21457851,
      emercontfname: "fsadf",
      emercontmname: "fsadf",
      emercontlname: "fsadf",
      emercontaddress: "fsdf",
      emercontnumber: 2154587211,
      emercontemail: "fsadf",
      relationship: "fsadf",
      open: false,
      date: "",
      title: "",
      findings: "",
      pcpName: "",
      modalEl: document.getElementById("AddingNewRecord"),
      showRecord: "",
      addNewRecord: "",
      SexOptions: [
        { key: "Male", text: "Male", value: "Male" },
        { key: "Female", text: "Female", value: "Female" }
      ],
      StatusOptions: [
        { key: "Single", text: "Single", value: "Single" },
        { key: "Married", text: "Married", value: "Married" },
        { key: "Divorced", text: "Divorced", value: "Divorced" },
        { key: "Widowed", text: "Widowed", value: "Widowed" }
      ],
      toHome: false,
      updating: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("Current route ", this.props.location.pathname);
    let myroute = this.props.location.pathname;
    if (myroute.includes("addpatient")) {
      this.setState({ updating: false });
    } else {
      this.setState({ updating: true });

      req
        .idPatient(this.props.location.state.id)
        .then(resp => {
          console.log("char2x", resp.data.info);
          let datai = resp.data.info;
          this.setState({ fname: datai.fname });
          this.setState({ mname: datai.mname });
          this.setState({ lname: datai.lname });
          this.setState({ birthdate: datai.birthdate });
          this.setState({ age: datai.age });
          this.setState({ sex: datai.sex });
          this.setState({ address: datai.address });
          this.setState({ status: datai.status });
          this.setState({ email: datai.email });
          this.setState({ contact: datai.contact });
          this.setState({ emercontfname: datai.emercontfname });
          this.setState({ emercontmname: datai.emercontmname });
          this.setState({ emercontlname: datai.emercontlname });
          this.setState({ emercontnumber: datai.emercontnumber });
          this.setState({ emercontemail: datai.emercontemail });
          this.setState({ emercontaddress: datai.emercontaddress });
          this.setState({ relationship: datai.relationship });
        })
        .catch(err => {
          console.log("error on record");
        });
    }
  }
  createToDB = () => {
    const profile = {
      fname: this.state.fname,
      mname: this.state.mname,
      lname: this.state.lname,
      sex: this.state.sex,
      status: this.state.status,
      age: this.state.age,
      birthdate: this.state.birthdate,
      address: this.state.address,
      email: this.state.email,
      contact: this.state.contact,
      emercontfname: this.state.emercontfname,
      emercontmname: this.state.emercontmname,
      emercontlname: this.state.emercontlname,
      emercontnumber: this.state.emercontnumber,
      emercontaddress: this.state.emercontaddress,
      emercontemail: this.state.emercontemail,
      relationship: this.state.relationship,
      currentdate: new Date()
    };
    req
      .addPatient(profile)
      .then(resp => {
        if (resp.status) {
          this.setState({ toHome: true });
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went Wrong in the network!!!");
      });
  };
  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      fname: this.state.fname,
      mname: this.state.mname,
      lname: this.state.lname,
      sex: this.state.sex,
      status: this.state.status,
      age: this.state.age,
      birthdate: this.state.birthdate,
      address: this.state.address,
      email: this.state.email,
      contact: this.state.contact,
      emercontfname: this.state.emercontfname,
      emercontmname: this.state.emercontmname,
      emercontlname: this.state.emercontlname,
      emercontnumber: this.state.emercontnumber,
      emercontaddress: this.state.emercontaddress,
      emercontemail: this.state.emercontemail,
      relationship: this.state.relationship
    };
    await req
      .updatePatient(this.props.location.state.id, body)
      .then(resp => {
        this.setState({ toHome: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = (e, { status }) => {
    e.preventDefault();
    this.setState({ status });
  };

  handleSexChange = (e, { sex }) => {
    e.preventDefault();
    this.setState({ sex });
  };

  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  handleSaveMed = e => {
    e.preventDefault();
    //api save to db {}

    let showRecord = document.getElementById("ShowMedicalRecords");
    let addNewRecord = document.getElementById("AddingNewRecord");
    showRecord.appendChild(addNewRecord);
    this.setState({ open: false });
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/home" />;
    }
    const { open, size } = this.state;
    const pageTitle = this.state.updating ? (
      <h1>Clinical Record Form</h1>
    ) : (
      <h3>Patient Information</h3>
    );

    //add medical records
    const addmed = this.state.updating ? (
      <div>
        <h2> Medical Condition :</h2>
        <div id="ShowMedicalRecords"></div>
        <Button color="teal" onClick={this.show("large")}>
          Add Medical Record
        </Button>
        <div>
          <Modal size={size} open={open} onClose={this.close}>
            <Modal.Header>Add new record here... </Modal.Header>
            <Modal.Content>
              <Form>
                <div id="AddingNewRecord">
                  <p>
                    {" "}
                    <b> New Record:</b>{" "}
                  </p>
                  <Form.Input
                    fluid
                    label="Date: "
                    placeholder="Date"
                    onChange={e => this.setState({ date: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    label={this.state.title}
                    placeholder="New Medical condition"
                  />
                  <TextArea
                    placeholder="Type new findings here"
                    onChange={e => this.setState({ findings: e.target.value })}
                  />
                  <br></br>
                  <br></br>
                  <Form.Input
                    fluid
                    label="Primary Care Physician/Clinician  Name: "
                    placeholder="Primary Care Physician/clinician Name"
                    onChange={e => this.setState({ pcpName: e.target.value })}
                  />
                  <br></br>
                </div>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={e => this.setState({ open: false })}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Save"
                onClick={this.handleSaveMed}
              />
            </Modal.Actions>
          </Modal>
        </div>
        <br></br>
        <Segment inverted>
          <Button basic inverted color="teal" onClick={this.handleSubmit}>
            Update
          </Button>
        </Segment>
        <br></br>
      </div>
    ) : (
      <Segment inverted>
        <Button basic inverted color="teal" onClick={this.createToDB}>
          Add Patient
        </Button>
      </Segment>
    );
    return (
      <div>
        <Container>
          <Form>
            <br></br>
            <br></br>
            <div>
              <center>{pageTitle}</center>
            </div>
            <br></br>
            <br></br>
            <div>
              <h2> Patient Personal Details</h2>
              <Form.Group widths="equal">
                <Form.Input
                  icon="pencil alternate"
                  fluid
                  label="First name"
                  placeholder="First name"
                  value={this.state.fname}
                  onChange={e => this.setState({ fname: e.target.value })}
                />
                <Form.Input
                  icon="pencil alternate"
                  fluid
                  label="Middle name"
                  placeholder="Middle name "
                  value={this.state.mname}
                  onChange={e => this.setState({ mname: e.target.value })}
                />
                <Form.Input
                icon='pencil alternate'
                  fluid
                  label="Last name"
                  placeholder="Last name"
                  value={this.state.lname}
                  onChange={e => this.setState({ lname: e.target.value })}
                />
                <Form.Input
                  fluid
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  value={this.state.birthdate}
                  onChange={e => this.setState({ birthdate: e.target.value })}
                />
                <Form.Input
                  fluid
                  label="Age"
                  placeholder="Age"
                  value={this.state.age}
                  onChange={e => this.setState({ age: e.target.value })}
                />
              </Form.Group>
              <br></br>
              <Form.Input
                fluid
                label="Address "
                placeholder="Address"
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.value })}
              />
              <br></br>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  label="Contact Number"
                  placeholder="Contact Number"
                  value={this.state.contact}
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </Form.Group>
              <br></br>
              <Form.Group widths="equal">
                <Dropdown
                  placeholder="Select Sex"
                  fluid
                  selection
                  value={this.state.sex}
                  onChange={e => this.setState({ sex: e.target.value })}
                  options={this.state.SexOptions}
                />
                <Dropdown
                  placeholder="Select Status"
                  fluid
                  selection
                  value={this.state.status}
                  onChange={e => this.setState({ status: e.target.value })}
                  options={this.state.StatusOptions}
                />
              </Form.Group>
              <br></br>
            </div>
            <div>
              <h2>Emergency Contact</h2>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First name"
                  placeholder="First name"
                  value={this.state.emercontfname}
                  onChange={e =>
                    this.setState({ emercontfname: e.target.value })
                  }
                />
                <Form.Input
                  fluid
                  label="Middle name"
                  placeholder="Middle name"
                  value={this.state.emercontmname}
                  onChange={e =>
                    this.setState({ emercontmname: e.target.value })
                  }
                />
                <Form.Input
                  fluid
                  label="Last name"
                  placeholder="Last name"
                  value={this.state.emercontlname}
                  onChange={e =>
                    this.setState({ emercontlname: e.target.value })
                  }
                />
              </Form.Group>
              <br></br>
              <Form.Input
                fluid
                label="Address "
                placeholder="Address"
                value={this.state.emercontaddress}
                onChange={e =>
                  this.setState({ emercontaddress: e.target.value })
                }
              />
              <br></br>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Email"
                  placeholder="Email"
                  value={this.state.emercontemail}
                  onChange={e =>
                    this.setState({ emercontemail: e.target.value })
                  }
                />
                <Form.Input
                  fluid
                  label="Contact Number"
                  placeholder="Contact Number"
                  value={this.state.emercontnumber}
                  onChange={e =>
                    this.setState({ emercontnumber: e.target.value })
                  }
                />
              </Form.Group>
              <br></br>
              <Form.Input
                fluid
                label="Relationship "
                placeholder="Relationship"
                value={this.state.relationship}
                onChange={e => this.setState({ relationship: e.target.value })}
              />
              <br></br>
            </div>
            <br></br>
            <div>{addmed}</div>
          </Form>
        </Container>
      </div>
    );
  }
}
