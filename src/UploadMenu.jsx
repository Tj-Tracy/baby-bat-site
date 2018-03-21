import React, { Component } from 'react';
import './css/base.css';
import './css/UploadMenu.css';
class UploadMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upload: null,
      title: null,
      error: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }



  render() {
    return (
      
      <div className="flex-outer flex-column flex-center title-bar">
        title:
        <input className="flex-inner" type="text" name="title" onChange={this.handleChange} />
        <textarea
          className="flex-inner"
          onChange={this.handleChange}
          name="upload"
          placeholder="Place the raw xml here cause I'm too lazy do a proper file upload"
          style={{ height: 600 }}
        >
        </textarea>
        <button className="btn flex-inner" onClick={() => this.props.uploadParse(this.state.upload, this.state.title)}>upload</button>
      </div>
    );
  }
}

export default UploadMenu;