import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { Plus } from 'react-feather';

import styles from './index.module.scss';

class UploadZone extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    onUpload: PropTypes.func,
  };

  render() {
    const { className } = this.props;
    return (
      <div className={cl(className, styles.uploadZone)}>
        <button
          type="button"
          className={cl(
            styles.uploadZoneToggle,
            'btn btn-round btn-primary btn-lg',
          )}
        >
          <Plus />
        </button>
      </div>
    );
  }
}

export default UploadZone;
