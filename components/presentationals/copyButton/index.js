import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FadeOutFeedback from '../fadeOutFeedback';

import styles from './index.module.scss';

class CopyButton extends PureComponent {
  static propTypes = {
    copy: PropTypes.string.isRequired,
    feedbackText: PropTypes.string,
    tag: PropTypes.any,
  };

  static defaultProps = {
    tag: 'button',
    feedbackText: 'Copied !',
  };

  state = {
    copied: 0,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onClick = evt => {
    evt.stopPropagation();
    const { current } = this.ref;

    try {
      current.style.top = `${window.pageYOffset ||
        document.documentElement.scrollTop}px`;
      current.style.display = 'block';

      const selection = document.getSelection();
      selection.removeAllRanges();

      const range = document.createRange();
      range.selectNodeContents(this.ref.current);
      selection.addRange(range);
      // This makes it work in all desktop browsers (Chrome)
      this.ref.current.select();
      // This makes it work on Mobile Safari
      this.ref.current.setSelectionRange(0, 999999);

      const succeeded = document.execCommand('copy');
      selection.removeAllRanges();

      if (!succeeded) {
        console.error('Cannot exec copy command');
        return;
      }

      this.setState(state => ({
        copied: state.copied + 1,
      }));
    } catch (e) {
      console.warn(e);
    }
    current.style.display = 'none';
  };

  onAnimationFinished = () => {
    this.setState({ copied: 0 });
  };

  render() {
    const { tag: Tag, feedbackText, copy, ...props } = this.props;
    const { copied } = this.state;
    return (
      <>
        <Tag onClick={this.onClick} {...props} />
        {copied > 0 && (
          <FadeOutFeedback
            onFinished={this.onAnimationFinished}
            text={feedbackText}
            key={copied}
          />
        )}
        <textarea
          className={styles.textarea}
          defaultValue={copy}
          readOnly
          ref={this.ref}
        ></textarea>
      </>
    );
  }
}

export default CopyButton;
