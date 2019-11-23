import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import { Menubar } from "primereact/menubar";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import App from "../styles/App.css";
import AddPatients from "./AddPatients";
import req from "../helper/api"

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Records from "./Records";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
        patients: [],
        myPatient: null,
        id: null,
        // toRecord:false,
        edit:false
        
    };

    this.onPatientSelect = this.onPatientSelect.bind(this);
   
}
componentDidMount(){
    req.getPatients().then(resp=>{
        var tempArray = []
        let datai = resp.data.data
        for(let i = 0; i < datai.length; ++i){
            let myobj = {
                id: datai[i]._id,
                Name: datai[i].fname + " " + datai[i].lname,
                Age: datai[i].age,
                Date: "karon"
            }
            console.log("tghis is",myobj)
            tempArray.push(myobj)
        }
        this.setState({patients: tempArray})
        
    }).catch(err=>{
        console.log("error on componentDidMount")
    })
}
handleAction(id){
    console.log(id)
    this.setState({actionId: id})
    //this.onPatientSelect()
}
async onPatientSelect(e){
    
    
    await this.setState({displayDialog: true,id: e.data.id});
    
}
dialogAlert =()=>{
    // alert("rdgtrth== ",this.state.id)
    return <Records/>
}

  onClick = () => {
    this.setState({ visible: true });
  };
  onHide = () => {
    this.setState({ visible: false });
  };

 
  render() {
    // if (this.state.toRecord === true) {
    //   return <Redirect to="/records" />;
    // }
    if(this.state.edit === true){
      return <Records/>
    }
    let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Current Patients </div>;
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
        <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
    </div>;
    return (   
      <div>
        <div className="content-section implementation">
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
                  // style={{ marginLeft: 1, color: "black" }}
                />
          </Menubar>
          <br/>
          <Card className="add-card">   
                    <div className="content-section implementation">
                        <DataTable value={this.state.patients} header={header}
                            selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onPatientSelect}>
                            <Column field="id" header="ID" />
                            <Column field="Name" header="Name" />
                            <Column field="Age" header="Age" />
                            <Column field="Date" header="Date" />
                        </DataTable> 
                        <div>
                            <h1>my id {this.state.id}</h1>
                        </div>
                     
                        <Dialog visible={this.state.displayDialog} width="300px" header="Car Details" modal={true}  onHide={() => this.setState({ displayDialog: false })}>
                           <p>id: {this.state.id}</p>

                        <Link to = '/records'>
                        <button onClick ={this.dialogAlert}>Edit</button>
                        </Link>
                            <button onClick ={this.handleDelete}>Delete</button>
                         
                        </Dialog>
                      
                    </div>
                            </Card>
        </div>
      </div>
    );
    // }else{
    //   return(
    //     <AddPatients/>
    //   )

    // }
  }
}
