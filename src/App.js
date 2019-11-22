import React from "react";
import "./styles/App.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Menu from "./components/Menu";
import Login from "./components/Login.component";
import AddPatients from "./components/AddPatients";
import { BrowserRouter as Router,Switch,Link,Route, } from "react-router-dom";
export default function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Menu}/>
          <Route path="/add" component={AddPatients}/>
          </Switch>
        </div>
      </Router>  
  );
}
