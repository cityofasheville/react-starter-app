/* **********************************************************************************************
  WARNING: DO NOT EDIT this file except from inside the react-starter-template repository. Changes made to this file inside child repos will NOT be reflected in the parent source template repository, and will generate code conflicts.
*********************************************************************************************** */
import React from 'react';

const LangContext = React.createContext();

export default class LanguageProvider extends React.Component {
  state = {
    language: 'English',
    label: 'English',
    dropdownOpen: false,
    switchLanguage: (newLang, label, dropdownOpen) => {
      this.setState({ language: newLang, label, dropdownOpen });
      localStorage.setItem('language', newLang);
      localStorage.setItem('languageLabel', label);
    },
  }

  render() {
    return <LangContext.Provider value={this.state}>{this.props.children}</LangContext.Provider>;
  }
}

export function withLanguage(Component) {
  return function LanguagedComponent(props) {
    return (
      <LangContext.Consumer>
        {context => <Component {...props} language={context} />}
      </LangContext.Consumer>
    );
  };
}
