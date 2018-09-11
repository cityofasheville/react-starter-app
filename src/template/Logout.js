import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import LogoutCode from 'template/LogoutCode';
import { withUser } from 'template/UserContext';
import Error from 'template/shared/Error';
import LoadingAnimation from 'template/shared/LoadingAnimation';

const LOGOUT_CODE = gql`
  mutation logout {
    logout {
      loggedIn
      message
      reason
    }
  }
`;

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.user.loggedIn,
      message: 'No message',
      fail: false,
    };
  }

  render() {
    return (
      <Mutation
        mutation={LOGOUT_CODE}
        onCompleted={(data) => {
          this.setState({
            isLoggedIn: data.logout.loggedIn,
            message: data.logout.message,
            fail: data.logout.loggedIn,
          }, () => {
            if (!this.state.isLoggedIn) {
              this.props.user.logout();
              this.props.history.push('/');
            }
          });
        }}
      >
        {
          (logout, { data, error }) => (
            <div>
              <LogoutCode
                logout={logout}
                loggedIn={this.state.isLoggedIn}
              >
                <div>
                  {this.state.fail ? // eslint-disable-line
                    <Error message={this.state.message} />
                    : this.state.loggedIn ?
                      <LoadingAnimation />
                      : <div>You are logged out</div>
                  }
                </div>
              </LogoutCode>
            </div>
          )
        }
      </Mutation>
    );
  }
}

export default withRouter(withUser(Logout));
