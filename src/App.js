import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar } from "react-bootstrap";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      equation: "",
    };
  }

  inputNum = (e) => {
    if (
      this.state.equation.match(/[0-9.]$/) &&
      !this.state.equation.includes("=")
    ) {
      //second digit onwards when no operator is present
      if (this.state.equation.match(/[+\-*\/]/) == null) {
        let out = this.state.equation + e.currentTarget.value;
        this.setState({
          display: out,
          equation: out,
        });
      } else {
        //if operator is present and you continue second num
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value,
        });
      }
    } else if (this.state.equation.match(/[+\-*\/]$/)) {
      //after an operator is pressed
      let out = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: out,
      });
    } else if (
      (this.state.display === "0" && e.currentTarget.value !== "0") ||
      this.state.equation.includes("=")
    ) {
      //when you start first time
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value,
      });
    }
    // else {
    //   this.setState({
    //     display: e.currentTarget.value,
    //     equation: e.currentTarget.value,
    //   });
    // }
  };

  inputOperator = (e) => {
    let x = this.state.equation;
    console.log("x: ", x);
    let len = x.length;
    console.log("length of x: ", len);

    if (this.state.equation.includes("=")) {
      let out = this.state.display;
      out += e.currentTarget.value;
      this.setState({
        equation: out,
      });
    } else {
      if (
        this.state.equation !== "" &&
        this.state.equation.match(/[*\-\/+]$/) == null
      ) {
        let out = this.state.equation;
        out += e.currentTarget.value;
        this.setState({
          equation: out,
        });
      } else if (this.state.equation.match(/[*\-\/+]$/) != null) {
        let out = this.state.equation;
        out = out.substring(0, out.length - 1);
        out += e.currentTarget.value;
        this.setState({
          equation: out,
        });
      }
    }
  };

  allClear = (e) => {
    this.setState({
      display: "0",
      equation: "",
    });
  };

  backspace = (e) => {
    if (this.state.equation.match(/[+\-*\/]/) == null) {
      if (this.state.display !== "" && this.state.display.length !== 1) {
        this.setState((state) => ({
          display: state.display.substring(0, state.display.length - 1),
          equation: state.equation.substring(0, state.equation.length - 1),
        }));
      } else if (this.state.display.length === 1) {
        this.setState({
          display: "0",
          equation: "",
        });
      }
    } else if (this.state.equation.match(/[+\-*\/]/)) {
      if (this.state.length !== 1) {
        this.setState((state) => ({
          display: state.display.substring(0, state.display.length - 1),
          equation: state.equation.substring(0, state.equation.length - 1),
        }));
      }
    } else if (
      this.state.display.length === 1 ||
      this.state.display.length === 0
    ) {
      this.setState({
        display: "0",
        equation: "",
      });
    }
  };

  inputDecimal = (e) => {
    if (this.state.equation === "" || this.state.equation.includes("=")) {
      var out = "0.";
      this.setState({
        display: out,
        equation: out,
      });
    } else if (this.state.equation.match(/[+\-*\/]$/)) {
      let out = "0.";
      this.setState({
        display: out,
        equation: this.state.equation + out,
      });
    } else if (!this.state.display.includes(".")) {
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value,
      });
    }
  };

  calculate = (e) => {
    if (this.state.equation.includes("=")) {
      let out = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: out,
      });
    } else if (
      this.state.equation != "" &&
      this.state.equation.match(/[+\-*\/]/) != null &&
      this.state.equation.match(/[+\-*\/]$/) == null
    ) {
      let result = Number.isInteger(eval(this.state.equation))
        ? eval(this.state.equation)
        : parseFloat(eval(this.state.equation).toFixed(5));
      let out = this.state.equation;
      out += ` = ${result}`;
      this.setState({
        display: result,
        equation: out,
      });
    }
  };
  render() {
    const Display = (props) => (
      <div id="calc-display" className="row-1-2 col-1-4">
        <span id="eq"> {props.equation}</span>
        <span id="dis">{props.display}</span>
      </div>
    );
    const Button = (props) => (
      <button
        type="button"
        id={props.id}
        value={props.value}
        className={props.class}
        onClick={props.click}
      >
        {props.display}
      </button>
    );
    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Calculator
          </Navbar.Brand>
        </Navbar>
        
        <Display equation={this.state.equation} display={this.state.display} />
        <Row>
          <Col>
            <Button
              class="btn btn-outline-success del mr-xl-5 w-100"
              id="clear"
              value="clear"
              display="AC"
              click={this.allClear}
            />
          </Col>

          <Col>
            <Button
              class="btn btn-outline-success del mr-xl-5 w-100"
              id="backspace"
              value="del"
              display="Del"
              click={this.backspace}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="seven"
              value="7"
              display="7"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="eight"
              value="8"
              display="8"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="nine"
              value="9"
              display="9"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success operator mr-xl-5 w-100"
              id="times"
              value="*"
              display="X"
              click={this.inputOperator}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              class="btn btn-outline-success  mr-xl-5 w-100"
              id="four"
              value="4"
              display="4"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="five"
              value="5"
              display="5"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="six"
              value="6"
              display="6"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success operator mr-xl-5 w-100"
              id="minus"
              value="-"
              display="−"
              click={this.inputOperator}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="one"
              value="1"
              display="1"
              click={this.inputNum}
            />{" "}
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="two"
              value="2"
              display="2"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="three"
              value="3"
              display="3"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success operator mr-xl-5 w-100"
              id="plus"
              value="+"
              display="+"
              click={this.inputOperator}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="zero"
              value="0"
              display="0"
              click={this.inputNum}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success mr-xl-5 w-100"
              id="decimal"
              value="."
              display="."
              click={this.inputDecimal}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success operator mr-xl-5 w-100"
              id="divide"
              value="/"
              display="÷"
              click={this.inputOperator}
            />
          </Col>
          <Col>
            <Button
              class="btn btn-outline-success equal mr-xl-5 w-100"
              id="equals"
              value="="
              display="="
              click={this.calculate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
