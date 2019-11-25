import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import styles from './index.module.scss';

import isServer from '../../../lib/isServer';

const evtList = [
  'webkitAnimationEnd',
  'oAnimationEnd',
  'msAnimationEnd',
  'animationend',
];

class FadeOutFeedback extends PureComponent {
  static propTypes = {
    onFinished: PropTypes.func,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    onFinished: () => {},
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (isServer) {
      return;
    }

    evtList.forEach(evt =>
      this.ref.current.addEventListener(evt, this.props.onFinished),
    );
  }

  componentWillUnmount() {
    if (isServer) {
      return;
    }

    evtList.forEach(evt =>
      this.ref.current.removeEventListener(evt, this.props.onFinished),
    );
  }

  render() {
    const { text, className } = this.props;
    return (
      <div ref={this.ref} className={cl(className, styles.feedback)}>
        {text}
      </div>
    );
  }
}

export default FadeOutFeedback;
