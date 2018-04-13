import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UploadMenu from "./UploadMenu";
import Modal from "react-modal";
import "./css/ParseList.css";
import "./css/base.css";


const overlaySettings = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.25)"
  },
  content: {
    bottom: "10vh",
    top: "10vh",
    right: "10vh",
    left: "10vh",
    backgroundColor: "var(--secondary-color)",
    border: "1px var(--main-color) solid"
  }
};

class ParseList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showUpload: false,
      parseList: null,
      uploadError: false
    }
  }

  getJSON = url => {
    return fetch(url, {
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    });
  };

  postXML = (url, headers, body) => {
    return fetch(url, {
      headers: headers,
      method: "POST",
      body: body
    });
  };

  componentWillMount() {
    this.getJSON("/api/parseList")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let list = data.map((item, i) => {
          return (
            <Link key={i} to={`/parse/${item.id}`}>
              <li>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row", 
                    justifyContent: "space-between"
                  }}
                >
                  <div>{`${item.title}`}</div>
                  <div className="upload-time">{`${item.uploadTime}`}</div>
                </div>
              </li>
            </Link>
          );
        });
        this.setState({
          parseList: list
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          parseList: (
            <li style={{ color: "red" }}>
              I don't know what happened but I cant get the parse list right now
            </li>
          )
        });
      });
  }

  uploadParse = (upload, title) => {
    let body = {
      raw: upload,
      title: title
    };
    this.postXML(
      "/api/submitParse",
      { "Content-Type": "application/json" },
      JSON.stringify(body)
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        let newListItem = this.state.parseList;
        newListItem.push(
          <Link key={this.state.parseList.length + 1} to={`/parse/${data.id}`}>
            <li>{`${data.uploadTime}  ${data.title}`}</li>
          </Link>
        );
        this.setState({
          parseList: newListItem
        });
      })
      .catch(err => {
        console.error(err);
      });
    this.showUpload();
  };

  showUpload = () => {
    this.setState({
      showUpload: !this.state.showUpload
    });
  };

  render() {

    if(this.state.parseList === null) {
      return (<div>Loading...</div>);
    }

    return (
      <div style={{marginBottom: 100}} className=" heading-buffer inner-main-upload flex-outer flex-column flex-center">
      <button className="btn" onClick={this.showUpload}>
        Upload Parse
      </button>
      <div className="parse-list">
        <ul>
          {this.state.parseList}
        </ul>
      </div>
      <Modal isOpen={this.state.showUpload} style={overlaySettings}>
        <button className="btn red" onClick={this.showUpload}>
          X
        </button>
        <div className=" flex-column flex-outer">
          <UploadMenu
            postXML={this.postXML}
            uploadParse={this.uploadParse}
          />
        </div>
      </Modal>
    </div>
    );
  }
}

export default ParseList;