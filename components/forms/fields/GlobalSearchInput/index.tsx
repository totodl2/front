import React, { PureComponent, ReactNode } from 'react';
import { AsyncProps } from 'react-select/async';
import { InnerRef } from 'react-select';
import SelectAsync from '../Select/async';
import { AllGlobalSearchResultTypes } from '../../../../types/GlobalSearchResultTypes';
import Option from './Options';
import styles from './styles';
import { MetadataConfigurationType } from '../../../../types/MetadataConfigurationType';
import Placeholder from './Placeholder';
import Control from './Control';
import isServer from '../../../../lib/isServer';

const components = { Option, Placeholder, Control, IndicatorSeparator: null };

const isOptionSelected = () => false;

type GlobalSearchInputProps = AsyncProps<AllGlobalSearchResultTypes> & {
  metadataConfiguration?: MetadataConfigurationType | null;
  autoFocus: boolean;
};

const noOptionsMessage = ({ inputValue }: { inputValue: string }) => {
  if (!inputValue || inputValue.length <= 0) {
    return <div className="my-3">Type something to start a new search</div>;
  }
  return <div className="my-3">No results found</div>;
};

class GlobalSearchInput extends PureComponent<GlobalSearchInputProps> {
  ref: InnerRef = React.createRef();

  componentDidMount(): void {
    if (this.props.autoFocus) {
      this.bindKeysEvent();
    }
  }

  componentDidUpdate(prevProps: Readonly<GlobalSearchInputProps>): void {
    if (!prevProps.autoFocus && this.props.autoFocus) {
      this.bindKeysEvent();
    }
    if (prevProps.autoFocus && !this.props.autoFocus) {
      this.unbindKeysEvent();
    }
  }

  componentWillUnmount(): void {
    this.unbindKeysEvent();
  }

  onKeyEvent = (evt: KeyboardEvent): void => {
    const target: HTMLElement | null = evt.target as HTMLElement;

    if (target && target.matches('input')) {
      return;
    }

    // not a char, is a shortcut, or space
    if (
      evt.key.length > 1 ||
      evt.altKey ||
      evt.ctrlKey ||
      evt.code === 'Space'
    ) {
      return;
    }

    // @ts-ignore
    if (!this.ref.current.select.state.menuIsOpen) {
      // @ts-ignore
      this.ref.current.focus(evt);
    }
  };

  unbindKeysEvent(): void {
    if (isServer) {
      return;
    }
    window.removeEventListener('keydown', this.onKeyEvent);
  }

  bindKeysEvent(): void {
    if (isServer) {
      return;
    }
    window.addEventListener('keydown', this.onKeyEvent);
  }

  render(): ReactNode {
    const { autoFocus, ...props } = this.props;
    return (
      <SelectAsync
        {...props}
        ref={this.ref}
        styles={styles}
        components={components}
        noOptionsMessage={noOptionsMessage}
        isOptionSelected={isOptionSelected}
      />
    );
  }
}

export default GlobalSearchInput;
