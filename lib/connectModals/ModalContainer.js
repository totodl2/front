import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const defaultModalProps = {};
const noop = () => {};
const ucfirst = name => name.substr(0, 1).toUpperCase() + name.substr(1);

export class ModalsContainer extends PureComponent {
  state = {};

  openMethods = {};

  closeMethods = {};

  static propTypes = {
    modals: PropTypes.any.isRequired,
    view: PropTypes.any.isRequired,
  };

  openModal = (name, props = defaultModalProps, onClosed = noop) => {
    const nameUFirst = `close${ucfirst(name)}`;
    this.setState(state => ({
      [name]: {
        ...props,
        key: name + get(state, `${name}.key`, 0) + 1,
        isOpen: true,
        onClosed,
        close: this.closeMethods[nameUFirst],
      },
    }));
  };

  closeModal = (name, data) => {
    const modalState = get(this.state, name, {});
    this.setState({
      [name]: { ...modalState, isOpen: false },
    });

    if (modalState.onClosed) {
      modalState.onClosed(data);
    }

    return data;
  };

  generateOpenCloseMethods() {
    Object.keys(this.props.modals).forEach(name => {
      const nameUFirst = ucfirst(name);

      const openName = `open${nameUFirst}`;
      if (!this.openMethods[openName]) {
        this.openMethods[openName] = (
          props = defaultModalProps,
          onClosed = noop,
        ) => this.openModal(name, props, onClosed);
      }

      const closeName = `close${nameUFirst}`;
      if (!this.closeMethods[closeName]) {
        this.closeMethods[closeName] = data => this.closeModal(name, data);
      }
    });
  }

  renderModal(Modal, name) {
    const modalState = get(this.state, name, {});
    if (!modalState.isOpen) {
      return null;
    }

    const { onClosed, ...modalProps } = modalState;
    return <Modal {...modalProps} />;
  }

  render() {
    this.generateOpenCloseMethods();
    const { modals, view: View, ...props } = this.props;

    return (
      <>
        <View {...props} {...this.openMethods} {...this.closeMethods} />
        {Object.entries(modals).map(([name, modal]) =>
          this.renderModal(modal, name),
        )}
      </>
    );
  }
}

export default ModalsContainer;
