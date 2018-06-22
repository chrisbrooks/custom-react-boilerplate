import React from 'react';
import ReactDOM from 'react-dom';
import PostcodeLookup from './PostcodeLookup';

const targetNode = document.getElementById('react-postcode-lookup');

const {
  apiUrl,
  phoneIcon
} = targetNode.dataset;

const render = () => {
  ReactDOM.render(
    <PostcodeLookup
      apiUrl={apiUrl}
      phoneIcon={phoneIcon} />,
    targetNode
  );
};

render(PostcodeLookup);

if (module.hot) {
  module.hot.accept('./PostcodeLookup.js', () => {
    render(PostcodeLookup);
  });
}
