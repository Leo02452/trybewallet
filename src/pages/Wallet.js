import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { fetchCurrenciesInfo } from '../actions/index';
import Table from '../components/Table';

class Wallet extends Component {
  componentDidMount = () => {
    const { dispatchCurrenciesInfo } = this.props;
    dispatchCurrenciesInfo();
  }

  render() {
    return (
      <>
        <Header />
        <Form />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  dispatchCurrenciesInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrenciesInfo: () => dispatch(fetchCurrenciesInfo()),
});

export default connect(null, mapDispatchToProps)(Wallet);
