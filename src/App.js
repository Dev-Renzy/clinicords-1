import React, { Component } from "react";
import "./styles/App.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Record from "./components/Records";
import AddedRecord from "./components/AddedRecords";
import Admin from "./components/Admin";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";


import { BrowserRouter as Router,Switch,Link,Route, } from "react-router-dom";
export default function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Menu}/>
          <Route path="/records" component={Record}/>
          <Route path="/addpatient" component={Record}/>
          <Route path="/addrecords" component={AddedRecord}/>
          {/* <Route path="/admin" component={Admin}/> */}
          <Route path="/admin" exact component={Admin} />
            <Route path="/edit" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
          </Switch>
        </div>
      </Router>  
  );
}

