import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logos from "../assets/logo.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import req from "../helper/api";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      isNotAllowed: false,
      id:null,
      fullname:null,
      profession:null,
      
      

    };
  }
  componentWillMount() {
    let isAdminLocal = localStorage.getItem("isAdmin");
    if (isAdminLocal === "true") {
      this.setState({ isNotAllowed: false });
      
    } else {
      this.setState({ isNotAllowed: true });
    }
    this.getNow()
  }
  getNow = () => {
    req
      .getUsers()
      .then(resp => {
        var tempArray = [];
        let datai = resp.data.data;
        for (let i = 0; i < datai.length; ++i) {
          
          if(i>1){

         
          let myobj = {
            id: datai[i]._id,
            
            fullname: datai[i].firstname + " " + datai[i].lastname,
            profession: datai[i].profession,
          }
          tempArray.push(myobj);
          
        }
        }
        this.setState({ users: tempArray });
        console.log("array ", this.state.users)
           
      })
      .catch(err => {
        console.log("error on getting records",err);
      });
  };
  render() {
    if (this.state.isNotAllowed === true) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    let header = (
      <div>
        <div style={{ lineHeight: "1.87em" }}>
          <h1 className="mydecor"> List Of Users</h1>
        </div>
        <div>
          {/* <Form.Input
                  type="search"
                  icon="search"
                  fluid
                  placeholder="Search for patient"
                  value={this.state.fname}
                  onChange={e => this.setState({ globalFilter: e.target.value })}
                  id="input"
                /> */}
        </div>
      </div>
    );
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light hheader ">
            <a className="navbar-brand">
              <img src={logos} width="150" height="80" />
            </a>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Account
                  </Link>
                </li>
                <li>
                  <div className="form-group">
                    <Link to="/">
                      <input
                        type="submit"
                        value="Logout"
                        className="btn btn-primary"
                      ></input>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <br/><br/>
        <Card className="add-card">
          <div className="content-section implementation">
            <DataTable
              filter={true}
              value={this.state.users}
              header={header}
              globalFilter={this.state.globalFilter}
              emptyMessage="No records found"
              selectionMode="single"
              onRowSelect={this.onPatientSelect}
            >
              <Column field="fullname" header="Fullname" />
              <Column field="profession" header="Profession" />
            </DataTable>

            <Dialog
              visible={this.state.displayDialog}
              className="dialoguser"
              header="User"
              modal={true}
              onHide={() => this.setState({ displayDialog: false })}
            >
              <div>
                <h1>Name: {this.state.name}</h1>
                <h1>Profession: {this.state.age}</h1>
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
    );
  }
}
