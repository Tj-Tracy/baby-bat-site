import React, { Component } from "react";

class Voting extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      options: []
    }
  }

  postQuestion() {}
  addOption() {
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  
  render() {
    return (
      <div className="heading-buffer">
        <input type="text" name="question" className="question-input" />
      </div>
    );
  }
}

export default Voting;
