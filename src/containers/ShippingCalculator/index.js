import React from 'react';
import ReactDOM from 'react-dom';
import ShippingCalculator from './ShippingCalculator';

const targetNode = document.getElementById('react-shipping-calculator');

const {
  apiUrl
} = targetNode.dataset;

const items = JSON.parse(targetNode.dataset.items);
const render = () => {
  ReactDOM.render(
    <ShippingCalculator
      apiUrl={apiUrl}
      items={items} />,
    targetNode
  );
};

render(ShippingCalculator);

if (module.hot) {
  module.hot.accept('./ShippingCalculator.js', () => {
    render(ShippingCalculator);
  });
}
