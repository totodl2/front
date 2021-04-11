import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const defaultIsEqual = (a, b) => a === b;

class SelectContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    view: PropTypes.any,
    isEqual: PropTypes.func,
  };

  state = {
    selected: [],
  };

  unselectAll = () => this.setState({ selected: [] });

  select = element => {
    this.setState(state => {
      const { selected } = state;
      if (this.isSelected(element)) {
        return state;
      }

      return { selected: [...selected, element] };
    });
  };

  unselect = element => {
    this.setState(state => {
      const { selected } = state;
      const { isEqual = defaultIsEqual } = this.props;
      const index = selected.findIndex(selectedElement =>
        isEqual(element, selectedElement),
      );
      if (index === -1) {
        return state;
      }

      const newSelected = [...selected];
      newSelected.splice(index, 1);
      return { selected: newSelected };
    });
  };

  isSelected = element => {
    const { selected } = this.state;
    const { isEqual = defaultIsEqual } = this.props;
    return !!selected.find(selectedElement =>
      isEqual(element, selectedElement),
    );
  };

  render() {
    const { view: View, isEqual, ...restProps } = this.props;
    const { selected } = this.state;
    const props = {
      selected,
      unselectAll: this.unselectAll,
      unselect: this.unselect,
      select: this.select,
      isSelected: this.isSelected,
    };

    return View ? (
      <View {...restProps} {...props} />
    ) : (
      this.props.children(props)
    );
  }
}

export default SelectContainer;
