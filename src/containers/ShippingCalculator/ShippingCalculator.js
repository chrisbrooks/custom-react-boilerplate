import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'components/Button/Button';
import {
  filterItems,
  filterRates
} from './utils';
import styles from './shippingCalculator.scss';

class ShippingCalculator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shippingEstimate: null,
      noShippingEstimate: false,
      isValid: false,
      postcode: '',
      error: false,
      loading: false
    };
    this.handleValidatePostcode = this.handleValidatePostcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
  }

  handleSubmit() {
    if (this.state.isValid) {

      const data = {
        postcode: this.state.postcode,
        items: filterItems(this.props.items)
      };

      const apiEndPoint = `${this.props.apiUrl}/shipping-simple`;

      this.setState({
        loading: true
      });

      axios.post(apiEndPoint, data)
        .then((response) => {
          if (response && response.data.rates) {
            const { rates } = response.data;
            const updatedRates = filterRates(rates);

            if (updatedRates.length) {
              return this.setState({
                shippingEstimate: {
                  name: updatedRates[0].store.name,
                  total: updatedRates[0].total_price
                },
                postcode: '',
                loading: false,
                noShippingEstimate: false
              });
            }

            return this.setState({
              noShippingEstimate: true,
              shippingEstimate: null,
              loading: false
            });
          }

          return this.setState({
            error: true,
            loading: false,
            noShippingEstimate: false,
            shippingEstimate: null,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
            noShippingEstimate: false,
            shippingEstimate: null
          });
        });
    }
  }

  handlePostcodeChange(evt) {
    const { value } = evt.target;

    this.setState({
      postcode: value
    });

    this.handleValidatePostcode(value);
  }

  handleValidatePostcode(value) {
    const checkForNumbersOnly = new RegExp('^[0-9]+$');

    if (value.length === 4 && checkForNumbersOnly.test(value)) {
      this.setState({
        isValid: true
      });
    }
    else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    return (
      <div className={styles.Container}>
        <h4 className={styles.Title}>Delivery Estimator</h4>
        <div className={styles.InnerContainer}>
          <input
            className={styles.Field}
            type="text"
            placeholder="POSTCODE"
            value={this.state.postcode}
            onChange={this.handlePostcodeChange}
          />
          <Button
            className={styles.Button}
            type="button"
            loading={this.state.loading}
            disabled={!this.state.isValid || this.state.loading}
            onClick={this.handleSubmit}>
            Estimate
          </Button>
        </div>

        { this.state.shippingEstimate &&
          <div>
            <div className={styles.DeliveryCost}>
              <p>Estimated Truck Delivery from {this.state.shippingEstimate.name}</p>
              <p>${this.state.shippingEstimate.total / 100}</p>
            </div>
            <p className={styles.Confirmation}>
              Confirm delivery in checkout
            </p>
          </div>
        }

        { this.state.noShippingEstimate &&
          <p>Unable to estimate delivery. Please continue to checkout.</p>
        }

        { this.state.error &&
          <p className={styles.Error}>
            Something went wrong, please try again
          </p>
        }

      </div>
    );
  }
}

ShippingCalculator.propTypes = {
  items: PropTypes.array.isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default ShippingCalculator;
