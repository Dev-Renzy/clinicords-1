import React, { Component } from "react";

export default class Iterate extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Date</th>
                    </tr>
                </thead>
            <tbody>{this.exerciseList()}</tbody>
            </table>
            </div>
        )
    }


}