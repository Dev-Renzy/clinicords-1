import React, { Component } from "react";
import App from "../styles/App.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import req from "../helper/api";
import { Redirect } from "react-router-dom";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);
export default class AddPatients extends Component {
  constructor() {
    super();
    this.state = {
      fname: "Sally",
      mname: "siya ",
      lname: "gfjdgfj",
      sex: "fgjh",
      status: "gfjghjgh",
      age: 20,
      birthdate: "fgjh",
      address: "fgjhgserdyg",
      email: "dfffffghgf",
      contact: 63546456,
      emercontfname: "dfhdgf",
      emercontmname: "dfh",
      emercontlname: "dfghgf",
      emercontnumber: 6584769102158,
      emercontaddress: "dfghgd",
      emercontemail: "dfgh",
      relationship: "sgfshhfdg",
      toHome: false,
      // size: null,
      full: "input",
      col8: "p-col-8",
      col4: "p-col-4",
      col1: "p-col-1",
      SexOptions: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
      ],
      StatusOptions: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
        { label: "Widowed", value: "Widowed" }
      ]
    };
  }
  handleResized = () => {
    if (window.innerWidth < 1200) {
      this.setState({ full: "", col8: "p-col", col4: "p-col" }); //size: 38,
    } else {
      this.setState({
        // size: 0,
        full: "input",
        col8: "p-col-8",
        col4: "p-col-4"
      });
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResized);
    this.handleResized();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResized);
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
        //   return <SweetAlert
        //   show={this.state.show}
        //   title="Demo"
        //   text="SweetAlert in React"
        //   onConfirm={() => this.setState({ show: false })}
        // />

        alert("All field must be required!!!");
      });
  };
  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <Menubar id="head" model={this.state.items}>
          <Link to="/home">
            <Button label="Home" />
          </Link>
          <Link to="/add">
            <Button
              label="Add Patient"
              className="p-button-success"
              style={{ marginLeft: 4 }}
              onClick={this.onClick}
            />
          </Link>
          <Link to="/">
            <Button
              label="Logout"
              className="p-button-success"
              style={{ marginLeft: 4 }}
              onClick={this.onClick}
            />
          </Link>
          <InputText
            placeholder="Search"
            type="text"
            style={{ marginLeft: 4 }}
          />
          <Button
            label="Search"
            icon="pi pi-search"
            className="p-button-warning"
          />
        </Menubar>
        <br />
        <Card className="add-card">
          <h1>Patient's Information</h1>
          <hr />
          <h4>Personal Infomation</h4>
          <br />
          <div className="content-section implementation ">
            <div className="p-grid">
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
                  />
                  <label htmlFor="float-input">Firstname</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.mname}
                    onChange={e => this.setState({ mname: e.target.value })}
                  />
                  <label htmlFor="float-input">Middlename</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.lname}
                    onChange={e => this.setState({ lname: e.target.value })}
                  />
                  <label htmlFor="float-input">Lastname</label>
                </span>
              </div>
            </div>
            <br />
            <div className="p-grid">
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.birthdate}
                    onChange={e => this.setState({ birthdate: e.target.value })}
                  />
                  <label htmlFor="float-input">Birthdate</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.age}
                    onChange={e => this.setState({ age: e.target.value })}
                  />
                  <label htmlFor="float-input">Age</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <label htmlFor="float-input">Email</label>
                </span>
              </div>
            </div>
            <br />
            <div className="p-grid">
              <div className={this.state.col8}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.address}
                    onChange={e => this.setState({ address: e.target.value })}
                  />
                  <label htmlFor="float-input">Address</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.contact}
                    onChange={e => this.setState({ contact: e.target.value })}
                  />
                  <label htmlFor="float-input">Contact</label>
                </span>
              </div>
            </div>
            <br />
            <div className="content-section implementation">
              <div className="p-grid">
                <div className="p-col">
                  <Dropdown
                    value={this.state.sex}
                    options={this.state.SexOptions}
                    onChange={e => this.setState({ sex: e.target.value })}
                    placeholder="Select Sex"
                    className = "block"
                  />
                </div>
                <div className="p-col">
                  <Dropdown
                    value={this.state.status}
                    options={this.state.StatusOptions}
                    onChange={e => this.setState({ status: e.target.value })}
                    placeholder="Select Status"
                    className = "block"
                  />
                </div>
              </div>
            </div>
            <br />
            <h4>Emergency Contact</h4>
            <br />
            <div className="p-grid">
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.emercontfname}
                    onChange={e =>
                      this.setState({ emercontfname: e.target.value })
                    }
                  />
                  <label htmlFor="float-input">Firstname</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.emercontmname}
                    onChange={e =>
                      this.setState({ emercontmname: e.target.value })
                    }
                  />
                  <label htmlFor="float-input">Middlename</label>
                </span>
              </div>
              <div className={this.state.col4}>
                <span className="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    size={this.state.size}
                    value={this.state.emercontlname}
                    onChange={e =>
                      this.setState({ emercontlname: e.target.value })
                    }
                  />
                  <label htmlFor="float-input">Lastname</label>
                </span>
              </div>
            </div>
          </div>
          <br />
          <div className="p-grid">
            <div className={this.state.col4}>
              <span className="p-float-label">
                <InputText
                  id="float-input"
                  type="text"
                  size={this.state.size}
                  value={this.state.emercontaddress}
                  onChange={e =>
                    this.setState({ emercontaddress: e.target.value })
                  }
                />
                <label htmlFor="float-input">Address</label>
              </span>
            </div>
            <div className={this.state.col4}>
              <span className="p-float-label">
                <InputText
                  id="float-input"
                  type="text"
                  size={this.state.size}
                  value={this.state.emercontemail}
                  onChange={e =>
                    this.setState({ emercontemail: e.target.value })
                  }
                />
                <label htmlFor="float-input">E-mail</label>
              </span>
            </div>
            <div className={this.state.col4}>
              <span className="p-float-label">
                <InputText
                  id="float-input"
                  type="text"
                  size={this.state.size}
                  value={this.state.emercontnumber}
                  onChange={e =>
                    this.setState({ emercontnumber: e.target.value })
                  }
                />
                <label htmlFor="float-input">Contact </label>
              </span>
            </div>
          </div>
          <br />
          <div className="p-grid">
            <div className="p-col-12">
              <span className="p-float-label">
                <InputText
                  id="float-input"
                  type="text"
                  size={this.state.size}
                  value={this.state.relationship}
                  onChange={e =>
                    this.setState({ relationship: e.target.value })
                  }
                />
                <label htmlFor="float-input">Relationship</label>
              </span>
            </div>
          </div>
          <br />
          <br />
          <div className="content-section implementation button-demo">
            {/* <Link to="/home"> */}
            <Button
              label="Add"
              className="p-button-success p-button-size p-button-text"
              onClick={this.createToDB}
            />

            {/* </Link> */}
          </div>
        </Card>
      </div>
    );
  }
}
