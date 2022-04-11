import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, editModeOff } from '../actions';

const Alimentação = 'Alimentação';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      exchangeRates: {},
    };
  }

  componentDidUpdate(prevProps) {
    this.editExpense(prevProps);
  }

  editExpense = (prevProps) => {
    const { editMode } = this.props;
    if (prevProps.editMode !== editMode) {
      const { expenseToEdit } = this.props;
      this.setState({
        id: expenseToEdit.id,
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
        exchangeRates: expenseToEdit.exchangeRates,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async (event) => {
    const { target: { name } } = event;
    event.preventDefault();
    if (name === 'add-button') {
      const currenciesInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
      const dataJson = await currenciesInfo.json();
      this.setState((previousState) => ({
        id: previousState.id === '' ? 0 : previousState.id + 1,
        exchangeRates: {
          ...previousState.exchangeRates,
          ...dataJson,
        },
      }));
      const { dispatchAddExpense } = this.props;
      dispatchAddExpense({ ...this.state });
    } else if (name === 'edit-button') {
      const { dispatchEditModeOff, expenses } = this.props;
      const { id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates } = this.state;
      const editedExpenses = expenses.map((expense) => {
        if (expense.id === id) {
          expense.id = id;
          expense.value = value;
          expense.description = description;
          expense.currency = currency;
          expense.method = method;
          expense.tag = tag;
          expense.exchangeRates = exchangeRates;
          return expense;
        }
        return expense;
      });
      dispatchEditModeOff(editedExpenses);
    }
    this.setState({
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  render() {
    const { currencies, editMode } = this.props;
    const { value,
      description,
    } = this.state;
    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency-input">
          Moeda
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies.map((currency, index) => (
              <option
                key={ index }
                value={ currency }
              >
                {currency}
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          Pagamento
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="method-input">
          Categoria
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value={ Alimentação }>{Alimentação}</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte e Saúde">Transporte e Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
          name={ editMode ? 'edit-button' : 'add-button' }
        >
          { editMode ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

Form.defaultProps = {
  editMode: false,
  expenseToEdit: {},
};

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  dispatchEditModeOff: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.objectOf(PropTypes.any),
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editMode: state.wallet.editMode,
  expenseToEdit: state.wallet.expenseToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExpense: (expense) => dispatch(addExpense(expense)),
  dispatchEditModeOff: (editedExpenses) => dispatch(editModeOff(editedExpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
