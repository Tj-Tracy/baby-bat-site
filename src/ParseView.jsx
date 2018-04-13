import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import MainHeader from "./MainHeader";
import "./css/ag-grid.css";
import "./css/theme-fresh.css";
import "./css/base.css";
import "./css/ParseView.css";
import { Link } from "react-router-dom";
class ParseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: null,
      columnDefs: this.constructCollumns(),
      title: null
    };
  }

  componentWillMount() {
    fetch(`/api${this.props.location.pathname}`, {
      method: "GET"
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        } else {
          console.error("no parses here");
        }
      })
      .then(data => {
        this.setState({ title: data.title });
        let encounter = JSON.parse(data.raw);
        let newTable = encounter.EncounterTable.Row.filter(
          row => row.Ally === "T"
        ).map(row => {
          return {
            ...row,
            DPS: parseFloat(row.DPS, 2) ? parseInt(row.DPS) : 0,
            Damage: parseFloat(row.Damage),
            Job: row.Job == "[object Object]" ? "" : row.Job,
            Deaths:
              row.Name === "Jun Elco" ? (row.Deaths = 0) : parseInt(row.Deaths)
          };
        });
        this.setState({
          rowData: newTable
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  constructCollumns = () => {
    return [
      { headerName: "Name", field: "Name" },
      { headerName: "Damage", field: "Damage" },
      { headerName: "DPS", field: "DPS", sort: "Asc" },
      { headerName: "Job", field: "Job" },
      { headerName: "Deaths", field: "Deaths" }
    ];
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  gridOptions = {
    enableSorting: true,
    animateRows: true
  };

  render() {
    let containerStyle = {
      height: 500,
      width: "100%"
    };

    if (this.state.rowData === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="heading-buffer">
        <h2 className="parse-title">{this.state.title}</h2>
        <div style={containerStyle} className="ag-fresh">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            gridOptions={this.gridOptions}
          />
          <Link
            className="btn"
            style={{ textDecoration: "none" }}
            to="/parseList"
          >{`<- Go Back`}</Link>
        </div>
      </div>
    );
  }
}

export default ParseView;
