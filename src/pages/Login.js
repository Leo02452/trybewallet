import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
      redirect: false,
    };
  }

  enableButton = () => {
    const { email, password } = this.state;
    // Usei essa validação de email de um tópico do Stack Overflow:
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailFormat = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const isEmailValid = emailFormat.test(email);
    const minPasswordCaracters = 6;
    const isPasswordValid = password.length >= minPasswordCaracters;
    this.setState({
      isButtonDisabled: !(isEmailValid && isPasswordValid),
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableButton);
  }

  handleClick = () => {
    const { saveUser } = this.props;
    const { email } = this.state;
    saveUser(email);
    this.setState({ redirect: true });
  };

  render() {
    const { email, password, isButtonDisabled, redirect } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" />}
      </form>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(dispatchUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
