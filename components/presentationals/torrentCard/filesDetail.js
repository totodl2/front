import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Tv } from 'feather-icons/dist/icons/tv.svg';

import { FILES_KEY, MAX_FILES_TO_DEFAULT_OPEN } from './files/constants';
import ToggleDirectory from './files/directory';

import withContainer from '../../../lib/withContainer';
import SelectContainer from '../../containers/SelectContainer';
import SelectActions from './selectActions';

const isEqual = (fileA, fileB) => {
  if (!fileA || !fileB) {
    return false;
  }

  return fileA.id === fileB.id;
};

class FilesDetail extends PureComponent {
  static propTypes = {
    files: PropTypes.object,
    onPlayFile: PropTypes.func,
    onChangeMovieMetadata: PropTypes.func,
    onChangeTvMetadata: PropTypes.func,
    onRemoveMetadata: PropTypes.func,
    onTranscode: PropTypes.func,
    selected: PropTypes.array,
    unselect: PropTypes.func,
    select: PropTypes.func,
    unselectAll: PropTypes.func,
    selectable: PropTypes.bool,
    isSelected: PropTypes.func,
  };

  changeTvMetadata = () => {
    this.props.onChangeTvMetadata(this.props.selected, success => {
      if (success === true) {
        this.props.unselectAll();
      }
    });
  };

  render() {
    const {
      files,
      onPlayFile,
      onChangeMovieMetadata,
      onChangeTvMetadata,
      onRemoveMetadata,
      onTranscode,
      selected,
      selectable,
      unselect,
      unselectAll,
      select,
      isSelected,
    } = this.props;
    const showSelect = selected && selected.length > 0;

    return (
      <>
        {showSelect && (
          <SelectActions>
            {onChangeTvMetadata && (
              <button
                type="button"
                onClick={this.changeTvMetadata}
                className="btn btn-sm btn-primary"
              >
                <Tv className="mr-2" />
                Set tv metadata for {selected.length} file
                {selected.length > 1 ? 's' : ''}
              </button>
            )}
            <button
              type="button"
              className="ml-2 btn btn-sm btn-outline-secondary"
              onClick={unselectAll}
            >
              Cancel
            </button>
          </SelectActions>
        )}
        <ToggleDirectory
          files={files}
          onPlayFile={onPlayFile}
          onChangeMovieMetadata={onChangeMovieMetadata}
          onChangeTvMetadata={onChangeTvMetadata}
          onRemoveMetadata={onRemoveMetadata}
          onTranscode={onTranscode}
          defaultOpened={
            !files[FILES_KEY] ||
            files[FILES_KEY].length < MAX_FILES_TO_DEFAULT_OPEN
          }
          onSelect={select}
          selected={selected}
          onUnSelect={unselect}
          selectable={selectable}
          isSelected={isSelected}
          showSelect={showSelect}
        />
      </>
    );
  }
}

export default withContainer(SelectContainer, () => ({ isEqual }))(FilesDetail);
