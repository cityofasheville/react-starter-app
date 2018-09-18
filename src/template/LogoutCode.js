/* **********************************************************************************************
  WARNING: DO NOT EDIT this file except from inside the react-starter-template repository. Changes made to this file inside child repos will NOT be reflected in the parent source template repository, and will generate code conflicts.
*********************************************************************************************** */
import React from 'react';

class LogoutCode extends React.Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default LogoutCode;
