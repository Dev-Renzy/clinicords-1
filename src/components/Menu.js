import React, { Component } from "react";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import App from "../styles/App.css";
import req from "../helper/api";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import login from "..//assets/logo.png";
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
      edit: false,
      selParient: null,
      isNotAllowed: false
    };

    this.onPatientSelect = this.onPatientSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    let isAdminLocal = localStorage.getItem("isAdmin")
    if (isAdminLocal === "false"){
      this.setState({isNotAllowed: false})
    }else{
      this.setState({isNotAllowed: true})
    }
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
            Date: new Date(datai[i].currentdate).toLocaleString()
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

  gotoAddPatient = () => {
    this.setState({ toAdd: true });
  };

  onClick = () => {
    this.setState({ visible: true });
    localStorage.setItem("isAdmin", null)
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
    if (this.state.isNotAllowed === true) {
      return (
        <Redirect to={{ pathname: "/"}} />
      );
    }
    if (this.state.toAdd === true) {
      return <Redirect to={{ pathname: "/addpatient" }} />;
    }
    let header = (
      <div>
        <div  style={{ lineHeight: "1.87em" }}>
          <h1 className="mydecor">Current Patients</h1>
        </div>
        <div>
          <Form.Input
            type="search"
            icon="search"
            fluid
            placeholder="Search for patient"
            value={this.state.fname}
            onChange={e => this.setState({ globalFilter: e.target.value })}
            id="input"
          />
        </div>
      </div>
    );
    return (
      <div>
        <div className="content-section implementation">
        
          <Menubar id="head" model={this.state.items}>
          <img src={login} width="200"  height="70"/>
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
          </Menubar>
          <br />
          <Card className="add-card">
            <div className="content-section implementation">
              <DataTable
                filter={true}
                value={this.state.patients}
                header={header}
                globalFilter={this.state.globalFilter}
                emptyMessage="No records found"
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
                header="Patients"
                modal={true}
                onHide={() => this.setState({ displayDialog: false })}
              >
                <div>
                  <h1>Name: {this.state.name}</h1>
                  <h1>Age: {this.state.age}</h1>
                </div>
                <br />
                <div className="p-grid">
                  <div className="p-col">
                    <Button
                      className="block"
                      onClick={this.dialogAlert}
                      label="Edit"
                    />
                  </div>
                  <div className="p-col">
                    <Button
                      className="block p-button-danger"
                      onClick={this.handleDelete}
                      label="Delete"
                    />
                  </div>
                </div>
              </Dialog>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
