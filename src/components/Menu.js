import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import App from "../styles/App.css";
import AddPatients from "./AddPatients";
import req from "../helper/api";

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Records from "./Records";
import { Redirect } from "react-router-dom";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      myPatient: null,
      id: null,
      name: null,
      age: null,
      toRecord: false,
      toAdd: false,
      edit: false
    };

    this.onPatientSelect = this.onPatientSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.getNow();
  }
  getNow = () => {
    req
      .getPatients()
      .then(resp => {
        var tempArray = [];
        let datai = resp.data.data;
        for (let i = 0; i < datai.length; ++i) {
          let myobj = {
            id: datai[i]._id,
            Name: datai[i].fname + " " + datai[i].lname,
            Age: datai[i].age,
            Date: datai[i].currentdate.toLocaleString()
          };

          tempArray.push(myobj);
        }
        this.setState({ patients: tempArray });
      })
      .catch(err => {
        console.log("error on componentDidMount");
      });
  };
  handleAction(id) {
    console.log(id);
    this.setState({ actionId: id });
  }
  async onPatientSelect(e) {
    await this.setState({
      displayDialog: true,
      id: e.data.id,
      name: e.data.Name,
      age: e.data.Age
    });
  }
  dialogAlert = () => {
    this.setState({ toRecord: true });
  };

  gotoAddPatient=()=>{
    this.setState({ toAdd: true });
  }

  onClick = () => {
    this.setState({ visible: true });
  };
  onHide = () => {
    this.setState({ visible: false });
  };

  async handleDelete(e) {
    await req
      .deletePatient(this.state.id)
      .then(resp => {
        this.getNow(); //request again
        this.setState({ displayDialog: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.toRecord === true) {
      return (
        <Redirect to={{ pathname: "/records", state: { id: this.state.id } }} />
      );
    }
    if (this.state.toAdd === true) {
      return (
        <Redirect to={{ pathname: "/addpatient"}} />
      );
    }
    let header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Current Patients{" "}
      </div>
    );
    return (
      <div>
        <div className="content-section implementation">
          <Menubar id="head" model={this.state.items}>
            <Link to="/home">
              <Button label="Home" />
            </Link>
            
              <Button
                label="Add Patient"
                className="p-button-success"
                style={{ marginLeft: 4 }}
                onClick={this.gotoAddPatient}
              />
            
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
              // style={{ marginLeft: 1, color: "black" }}
            />
          </Menubar>
          <br />
          <Card className="add-card">
            <div className="content-section implementation">
              <DataTable
                value={this.state.patients}
                header={header}
                selectionMode="single"
                selection={this.state.selectedCar}
                onSelectionChange={e => this.setState({ selectedCar: e.value })}
                onRowSelect={this.onPatientSelect}
              >
                <Column field="Name" header="Name" />
                <Column field="Age" header="Age" />
                <Column field="Date" header="Date" />
              </DataTable>

              <Dialog
                visible={this.state.displayDialog}
                className="dialog"
                header="Patients Action"
                modal={true}
                onHide={() => this.setState({ displayDialog: false })}
              >
                <div>
                  <h1>Name: {this.state.name}</h1>
                  <h1>age: {this.state.age}</h1>
                </div>
                <br/>
                <div className="p-grid">
                  <div className="p-col"><Button className="block" onClick={this.dialogAlert} label="Edit" /></div>
                  <div className="p-col"><Button className="block" onClick={this.handleDelete} label="Delete" /></div>
                </div>
                {/* <Button className="block" onClick={this.dialogAlert} label="Edit" />
                <Button className="block" onClick={this.handleDelete} label="Delete" /> */}
              </Dialog>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
