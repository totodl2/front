import { decode } from 'jsonwebtoken';
import get from 'lodash.get';
import Router from 'next/router';

export default class Token {
  constructor(jwt, refreshToken) {
    this.jwt = jwt;
    /* eslint-disable-next-line */
    this.refreshToken = refreshToken;
    this.payload = null;
    this.expires = null;
    this.decode();
  }

  decode() {
    if (!this.jwt) {
      return false;
    }

    this.payload = decode(this.jwt);
    this.expires = new Date(this.payload.exp * 1000);

    return false;
  }

  get id() {
    return get(this.payload, 'id');
  }

  get roles() {
    return get(this.payload, 'roles');
  }

  isLogged = () => !!this.id;

  isExpired = () => {
    if (this.expires === null) {
      return false;
    }
    return this.expires < new Date();
  };

  logout = () => {
    if (this.isLogged() && this.setNewToken) {
      this.setNewToken();
      Router.push('/');
    }
  };
}
