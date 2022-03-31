import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

// const mapDispatchToProps = {}

export default connect(mapStateToProps)(Header);
