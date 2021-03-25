import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Router from 'next/router';
import Link from 'next/link';

import withApi from '../lib/api/withApi';
import withToken from '../lib/token/withToken';
import FloatingCard from '../components/layouts/floatingCard';
import Form from '../components/forms/login';
import Token from '../lib/token/token';
import { handleResponseErrors } from '../lib/form/processApiErrors';
import WaveLoader from '../components/presentationals/waveLoader';
import withRedirectTo from '../lib/withRedirectTo';
import redirectLogged from '../lib/redirection/redirectLogged';

class Login extends PureComponent {
  static propTypes = {
    api: PropTypes.object.isRequired,
    token: PropTypes.instanceOf(Token).isRequired,
  };

  state = {
    loading: false,
  };

  onSubmit = async data => {
    this.setState({ loading: true });
    try {
      const user = (await this.props.api.users.login({ data })).data;
      const newToken = this.props.token.setNewToken(
        user.token,
        user.refreshToken,
      );
      Router.push(redirectLogged(newToken));
      return undefined;
    } catch (e) {
      console.warn(e);
      return handleResponseErrors(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <FloatingCard className="col-lg-5 col-md-7">
        <Form onSubmit={this.onSubmit}>
          {({ form }) => (
            <>
              <div className="card-body p-5">
                <div className="mb-4">
                  <h1 className="h2">Sign in toTotoTouBô</h1>
                  <p className="text-muted">
                    Please enter your credentials to proceed
                  </p>
                </div>
                {form}
                <button type="submit" className="btn btn-primary w-100">
                  Sign in
                </button>
                <p className="text-muted text-center mt-2 mb-0">
                  Not account yet ?{' '}
                  <Link href="/register">
                    <a>Sign up</a>
                  </Link>
                  .
                </p>
              </div>
              <WaveLoader
                className="border-radius"
                visible={this.state.loading}
              />
            </>
          )}
        </Form>
      </FloatingCard>
    );
  }
}

export default compose(
  withRedirectTo(redirectLogged),
  withApi(),
  withToken(),
)(Login);
