import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <ButtonComponent/>
        <InputTextComponent/>
      </div>
    );
  }
}

class ButtonComponent extends React.Component {
  constructor (props) {

    super(props);
    this.state = {
      count : 0
    };

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase() {
    this.setState({count: this.state.count + 1});
  };

  decrease() {
    this.setState({count: this.state.count - 1});
  }

  render() {

    return (
      <div>
        <button onClick={this.increase}>Increase</button>
        <button onClick={this.decrease}>Decrease</button>
        <h1>{this.state.count}</h1>
      </div>
    )
  }
}

class InputTextComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: "",
      submittedText: "",
      returnedText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted"); // Debugging log

    try {
      const response = await fetch("https://207a78dn77.execute-api.us-west-2.amazonaws.com/default/addToText", {
        method: "POST",
        credentials: "include", // Include cookies in the request
        headers: {
          "Accept": "application/json", // Expect a JSON response
        },
        body: JSON.stringify({text: this.state.text}),
      });
   
      console.log("Response received"); // Debugging log

      if (response.ok) {
        const data = await response.json();
        this.setState({returnedText: data.message});
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }

  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <input type = "text" onChange = {this.handleChange}/>
          <button type = "submit">Submit</button>
        </form>
        <h1>{this.state.returnedText}</h1>
      </div>
    )
  }
}

export default App;