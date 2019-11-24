import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  TextArea,
  Container,
  Modal,
  Card
} from "semantic-ui-react";
import { Dropdown } from "primereact/dropdown";
import { Link, Redirect } from "react-router-dom";
import req from "../helper/api";
import App from "../styles/App.css";
import "semantic-ui-css/semantic.min.css";
import AddedRecords from './AddedRecords'
export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "dfghgth",
      mname: "fds",
      lname: "fsadf",
      birthdate: "fsadf",
      age: 20,
      sex: "Male",
      status: "Single",
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
      medRecords: [],
      SexOptions: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
      ],
      StatusOptions: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
        { label: "Widowed", value: "Widowed" }
      ],
      toHome: false,
      updating: false,
      today: new Date().toLocaleString()
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
      this.getNow();
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
    console.log("profile ", profile);
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
  getNow = () => {
    req
      .idMedRecords(this.props.location.state.id)
      .then(resp => {
        var tempArray = [];
        let datai = resp.data.info;
        for (let i = 0; i < datai.length; ++i) {
          let myobj = {
            ownerID: datai[i].ownerID,
            date: new Date(datai[i].date).toLocaleString(),
            title: datai[i].title,
            findings: datai[i].findings,
            name: datai[i].pcpName
          };

          tempArray.push(myobj);
        }
        this.setState({ medRecords: tempArray });
      })
      .catch(err => {
        console.log("error on getting records");
      });
  };
  handleSaveMed = e => {
    e.preventDefault();
    let body={ownerID:this.props.location.state.id,date:this.state.today,title:this.state.title,findings: this.state.findings,pcpName: this.state.pcpName}
    req.addRecords(body).then(resp=>{
      this.getNow()
    }).catch(err=>{
      console.log(err)
    })
    this.setState({ open: false });
  };
  onClick = () => {
    this.setState({ visible: true });
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/home" />;
    }
    const { open, size } = this.state;
    const pageTitle = this.state.updating ? (
      <h1>Clinical Record Form</h1>
    ) : (
      <h1 id="infopatient">Patient Information</h1>
    );
    const allmedicalrecords = this.state.medRecords.map(element =>
      <div><AddedRecords record={element}/><br/></div>);
    //add medical records
    const addmed = this.state.updating ? (
      <div>
        <h2> Medical Condition :</h2>
        <div id="ShowMedicalRecords"></div>
        <div>{allmedicalrecords}</div>
        <Button color="teal" onClick={this.show("large")}>
          Add Medical Record
        </Button>
        <div>
          <Modal size={size} open={open} onClose={this.close}>
            <Modal.Header>Add Medical Record </Modal.Header>
            <Modal.Content>
              <Form>
                <div id="AddingNewRecord">
                  <p>
                    <b> New Record:</b>
                  </p>
                  <p>Date: {this.state.today}</p>
                  <Form.Input
                    fluid
                    label="Condition: "
                    placeholder="What is Patient's Condition? "
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <b><p>Findings:</p></b>
                  <TextArea
                    placeholder="What is your findings? "
                    onChange={e => this.setState({ findings: e.target.value })}
                  /><br/><br/>
                  <Form.Input
                    fluid
                    label="Primary Care Physician/Clinician  Name: "
                    placeholder="Fullname"
                    onChange={e => this.setState({ pcpName: e.target.value })}
                  /><br/>
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
        </div><br/>
        <Segment inverted>
          <Button basic inverted color="teal" onClick={this.handleSubmit}>
            Update
          </Button>
          <Link to="home">
          <Button basic inverted color="teal" onClick={this.onClick}>
            Cancel
          </Button>
        </Link>
        </Segment><br/>
      </div>
    ) : (
      <Segment id="segment" inverted>
        <Button basic inverted color="teal" onClick={this.createToDB}>
          Add Patient
        </Button>
        <Link to="home">
          <Button basic inverted color="teal" onClick={this.onClick}>
            Cancel
          </Button>
        </Link>
      </Segment>
    );
    return (
      <div>
        <Container>
          <Card id="card">
            <Form><br/><br/>
              <div>
                <center>{pageTitle}</center>
              </div><br/><br/>
              <div>
                <h2> Personal Details</h2>
                <Form.Group widths="equal">
                  <Form.Input
                    icon="pencil alternate"
                    fluid
                    label="First Name"
                    placeholder="First Name"
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
                    id="input"
                  />
                  <Form.Input
                    icon="pencil alternate"
                    fluid
                    label="Middle name"
                    placeholder="Middle Name "
                    value={this.state.mname}
                    onChange={e => this.setState({ mname: e.target.value })}
                    id="input"
                  />
                  <Form.Input
                    icon="pencil alternate"
                    fluid
                    label="Last Name"
                    placeholder="Last Name"
                    value={this.state.lname}
                    onChange={e => this.setState({ lname: e.target.value })}
                    id="input"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    icon="birthday cake"
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    value={this.state.birthdate}
                    onChange={e => this.setState({ birthdate: e.target.value })}
                    id="input"
                  />
                  <Form.Input
                    fluid
                    icon="calendar"
                    label="Age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={e => this.setState({ age: e.target.value })}
                    id="input"
                  />
                  <Form.Input
                    fluid
                    icon="call"
                    label="Contact Number"
                    placeholder="Contact Number"
                    value={this.state.contact}
                    onChange={e => this.setState({ contact: e.target.value })}
                    id="input"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    icon="address book"
                    label="Address "
                    placeholder="Address"
                    value={this.state.address}
                    onChange={e => this.setState({ address: e.target.value })}
                    id="input"
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    label="Email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    id="input"
                  />
                </Form.Group><br />
                <Form.Group widths="equal">
                  <Dropdown
                    className="dropdown"
                    placeholder="Select Sex"
                    fluid
                    selection
                    value={this.state.sex}
                    onChange={e => this.setState({ sex: e.target.value })}
                    options={this.state.SexOptions}
                  /><br />
                  <Dropdown
                    placeholder="Select Status"
                    fluid
                    className="dropdown"
                    selection
                    value={this.state.status}
                    onChange={e => this.setState({ status: e.target.value })}
                    options={this.state.StatusOptions}
                  />
                </Form.Group><br/>
              </div>
              <div>
                <h2>Emergency Contact</h2>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    icon="pencil"
                    id="input"
                    label="First name"
                    placeholder="First name"
                    value={this.state.emercontfname}
                    onChange={e =>this.setState({ emercontfname: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon="pencil"
                    id="input"
                    label="Middle name"
                    placeholder="Middle name"
                    value={this.state.emercontmname}
                    onChange={e =>this.setState({ emercontmname: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon="pencil"
                    id="input"
                    label="Last name"
                    placeholder="Last name"
                    value={this.state.emercontlname}
                    onChange={e =>this.setState({ emercontlname: e.target.value })}
                  />
                </Form.Group>
                <br></br>
                <Form.Input
                  fluid
                  id="input"
                  label="Address "
                  icon="address book"
                  placeholder="Address"
                  value={this.state.emercontaddress}
                  onChange={e =>this.setState({ emercontaddress: e.target.value })}
                /><br/>      
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    id="input"
                    label="Email"
                    icon="mail"
                    placeholder="Email"
                    value={this.state.emercontemail}
                    onChange={e =>this.setState({ emercontemail: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    id="input"
                    label="Contact Number"
                    icon="call"
                    placeholder="Contact Number"
                    value={this.state.emercontnumber}
                    onChange={e =>this.setState({ emercontnumber: e.target.value })}
                  />
                </Form.Group><br/>
                <Form.Input
                  fluid
                  icon="pencil"
                  id="input"
                  label="Relationship "
                  placeholder="Relationship"
                  value={this.state.relationship}
                  onChange={e =>this.setState({ relationship: e.target.value })}
                /><br/>
              </div><br/>
              <div>{addmed}</div>
            </Form>
          </Card>
        </Container>
      </div>
    );
  }
}