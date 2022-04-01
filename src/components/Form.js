import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <label htmlFor="currency-input">
          Moeda
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
          >
            { currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          Pagamento
          <select data-testid="method-input" id="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de crédito</option>
            <option value="Cartão de Débito">Cartão de débito</option>
          </select>
        </label>
        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte e Saúde">Transporte e Saúde</option>
        </select>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);
