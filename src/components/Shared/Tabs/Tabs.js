import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';

export class TabsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.currentTab
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleHashTab = this.handleHashTab.bind(this);
  }

  componentWillMount() {
    if (this.props.withHash) {
      this.handleHashTab();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTab !== nextProps.currentTab) {
      this.setState({
        currentTab: nextProps.currentTab
      });
    }
  }

  handleHashTab() {
    const params = QueryString.parse(this.props.location.hash);
    const getTabEqualToHash = this.props.tabs.filter(tab => Object.keys(params)[0] === tab.className.toLowerCase());

    if (getTabEqualToHash.length) {
      this.setState({
        currentTab: getTabEqualToHash[0].id
      });
      this.props.changeTab(getTabEqualToHash[0]);
    }
  }

  handleChangeTab(tab) {
    this.props.changeTab(tab);

    if (this.props.withHash) {
      window.location.hash = tab.className.toLowerCase();
    }

  }

  render() {

    const {
      className,
      tabs,
      activeClass,
      disabledClass
    } = this.props;

    return (
      <nav>
        <ul className={className}>
          { tabs.map(tab => (
            <li
              key={tab.id}
              className={this.state.currentTab === tab.id ? activeClass : disabledClass}>
              <a onClick={() => this.handleChangeTab(tab)}>
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

TabsComponent.propTypes = {
  changeTab: PropTypes.func,
  currentTab: PropTypes.number,
  className: PropTypes.string,
  tabs: PropTypes.array,
  activeClass: PropTypes.string,
  disabledClass: PropTypes.string,
  withHash: PropTypes.bool,
  location: PropTypes.object
};

export default withRouter(TabsComponent);
