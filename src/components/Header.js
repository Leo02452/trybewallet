import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Header extends React.Component {
  renderWalletTotal = (array) => array
    .reduce((acc, curr) => {
      const currencyValue = +curr.exchangeRates[curr.currency].ask;
      const currencyExchange = (currencyValue * +(curr.value));
      return acc + currencyExchange;
    }, 0).toFixed(2);

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">{ this.renderWalletTotal(expenses) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
