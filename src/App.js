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
      submittedText: ""
    };
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submittedText: this.state.text});
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <input type = "text" onChange = {this.handleChange}/>
          <button type = "submit">Submit</button>
        </form>
        <h1>{this.state.text}</h1>
      </div>
    )
  }
}

