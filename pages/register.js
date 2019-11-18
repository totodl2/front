import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Router from 'next/router';
import Link from 'next/link';

import withApi from '../lib/api/withApi';
import withToken from '../lib/token/withToken';
import FloatingCard from '../components/layouts/floatingCard';
import { Form, SubmitButton } from '../components/forms/register';
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
      const user = (await this.props.api.users.create({ data })).data;
      const newToken = this.props.token.setNewToken(
        user.token,
        user.refreshToken,
      );
      Router.push(redirectLogged(newToken));
      return user;
    } catch (e) {
      console.warn(e);
      return handleResponseErrors(e, data);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <FloatingCard className="col-md-5">
        <div className="card-body p-5">
          <div className="mb-4">
            <h1 className="h2">Sign up toToto</h1>
            <p className="text-muted">
              Fill in these fields to join the community
            </p>
          </div>
          <Form onSubmit={this.onSubmit} />
          <SubmitButton className="btn btn-primary w-100">Sign up</SubmitButton>
          <p className="text-muted text-center mt-2 mb-0">
            You already have an account ?{' '}
            <Link href="/">
              <a>Sign in</a>
            </Link>
            .
          </p>
        </div>
        <WaveLoader visible={this.state.loading} />
      </FloatingCard>
    );
  }
}

export default compose(
  withRedirectTo(redirectLogged),
  withApi(),
  withToken(),
)(Login);
