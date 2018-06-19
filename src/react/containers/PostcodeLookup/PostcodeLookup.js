import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import styles from './postcodeLookup.scss';

class PostcodeLookup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showCallStore: true,
      showPostcodeForm: false,
      storeDetails: null,
      isValid: false,
      postcode: '',
      error: false,
      loading: false
    };
    this.handleValidatePostcode = this.handleValidatePostcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
    this.handleShowPostcodeForm = this.handleShowPostcodeForm.bind(this);
  }

  handleSubmit() {
    if (this.state.isValid) {

      const apiEndPoint = `${this.props.apiUrl}?postcode=${this.state.postcode}`;

      this.setState({
        loading: true
      });

      return axios.get(apiEndPoint)
        .then((response) => {
          const getStore = response.data.data[0];
          const storeDetails = {
            telephone: getStore.telephone.replace(/\D/g, ''),
            name: getStore.name
          };
          this.setState({
            postcode: '',
            loading: false,
            storeDetails,
            showPostcodeForm: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }

    return false;
  }

  handleShowPostcodeForm() {
    this.setState({
      showPostcodeForm: true,
      showCallStore: false
    });
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
        { this.state.showCallStore &&
          <Button
            onClick={this.handleShowPostcodeForm}
            secondary>
            Call the nearest store
          </Button>
        }

        { this.state.showPostcodeForm &&
          <div className={styles.PostcodeForm}>
            <input
              className={styles.FindPostcodeField}
              type="text"
              placeholder="Postcode"
              value={this.state.postcode}
              onChange={this.handlePostcodeChange}
            />
            <Button
              className={styles.FindPostcodeButton}
              type="button"
              loading={this.state.loading}
              disabled={!this.state.isValid || this.state.loading}
              onClick={this.handleSubmit}>
                Estimate
            </Button>
          </div>
        }

        { this.state.error &&
          <p className={styles.Error}>Something went wrong, please try again</p>
        }

        { this.state.storeDetails &&
          <Button>
            <div className={styles.CallStoreButton}>
              <img src={this.props.phoneIcon} alt="phone icon" />
              <a href={`tel:${this.state.storeDetails.telephone}`}>Call bah {this.state.storeDetails.name}</a>
            </div>
          </Button>
        }

      </div>
    );
  }
}

PostcodeLookup.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  phoneIcon: PropTypes.string.isRequired
};

export default PostcodeLookup;
