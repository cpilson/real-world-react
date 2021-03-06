import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import ListErrors from "./ListErrors";
import agent from "../agent";

// any of the properties on store auth will be spread out to props of the login component.
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    // We'll get a promise from below:
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: "REGISTER", payload: payload });
  },
  clearErrors: () => dispatch({ type: "CLEAR_AUTH_ERRORS", payload: null })
});

class Register extends Component {
  state = {
    // this makes our error go away--we're no longer going from undefined to "things".
    username: "",
    email: "",
    password: ""
  };

  // Let's clear any auth errors when we leave this page: 
  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleInputChange = event => {
    const targetName = event.target.name;

    this.setState({
      [targetName]: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // Clear any errors we may have had from a previous attempt: 
    this.props.clearErrors();
    // And now submit the form.
    this.props.onSubmit(username, email, password);
  };

  render() {
    // Deconstruct the state inside our render. This prevents "const username=this.state.username..."
    const { username, email, password } = this.state;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={e => this.submitForm(e)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Join Right Meow
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
