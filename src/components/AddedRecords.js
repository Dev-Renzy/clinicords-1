import React, { Component } from "react";
import { Panel } from "primereact/panel";
import App from "../styles/App.css";

export default class AddedRecords extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const header = (
          <div className="med-header">
          <h3 >{this.props.record.date}</h3>
          </div>

    );
    return (
      <div>
        <div className="content-section implementation">
          <Panel className="recpan p-panel-titlebar" header={header}>
            <h4>Condition: {this.props.record.title}</h4>
            <h4>Findings: {this.props.record.findings}</h4>
            <h4>Primary Care Physician/Clinician: {this.props.record.name}</h4>
          </Panel>
        </div>
      </div>
    );
  }
}
