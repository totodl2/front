import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import { ReactComponent as MoreVertical } from 'feather-icons/dist/icons/more-vertical.svg';
import { ReactComponent as Download } from 'feather-icons/dist/icons/download.svg';
import { ReactComponent as Trash } from 'feather-icons/dist/icons/trash.svg';
import { ReactComponent as CheckSquare } from 'feather-icons/dist/icons/check-square.svg';
import { ReactComponent as Square } from 'feather-icons/dist/icons/square.svg';
import { ReactComponent as Film } from 'feather-icons/dist/icons/film.svg';
import { ReactComponent as Tv } from 'feather-icons/dist/icons/tv.svg';

import TranscoderIcon from '../../icons/TranscoderIcon';
import ToggleContainer from '../../../containers/ToggleContainer';

class FileDropdown extends PureComponent {
  static propTypes = {
    transcoded: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        preset: PropTypes.string,
      }),
    ),
    onRemoveMetadata: PropTypes.func,
    onChangeMovieMetadata: PropTypes.func,
    onChangeTvMetadata: PropTypes.func,
    movieId: PropTypes.any,
    tvId: PropTypes.any,
    onTranscode: PropTypes.func,
    toggleSelect: PropTypes.func,
    isSelected: PropTypes.bool,
  };

  state = {
    confirmRemoveMetadata: false,
  };

  onConfirmMetadataDiscard = () =>
    this.setState({ confirmRemoveMetadata: false });

  onRemoveMetadata = evt => {
    if (!this.state.confirmRemoveMetadata) {
      this.setState({ confirmRemoveMetadata: true });
      evt.stopPropagation();
      return;
    }

    const { onRemoveMetadata } = this.props;
    onRemoveMetadata();
  };

  render() {
    const {
      transcoded,
      onRemoveMetadata,
      onChangeMovieMetadata,
      onChangeTvMetadata,
      movieId,
      tvId,
      onTranscode,
      toggleSelect,
      isSelected,
    } = this.props;
    const { confirmRemoveMetadata } = this.state;

    const hasMetadata = !!movieId || !!tvId;
    const hasTranscodedFiles = transcoded && transcoded.length > 0;
    const canRemoveMetadata = hasMetadata && onRemoveMetadata;
    const canSelect = !!toggleSelect;

    if (
      !hasTranscodedFiles &&
      !onChangeMovieMetadata &&
      !onChangeTvMetadata &&
      !canRemoveMetadata &&
      !onTranscode
    ) {
      return null;
    }

    return (
      <ToggleContainer
        view={Dropdown}
        direction="left"
        onToggle={this.onConfirmMetadataDiscard}
        className="float-right"
      >
        <DropdownToggle
          tag="button"
          className="btn btn-round shadow-none btn-sm"
          aria-haspopup
          aria-expanded={false}
        >
          <MoreVertical />
        </DropdownToggle>
        <DropdownMenu>
          {canSelect && (
            <DropdownItem onClick={toggleSelect}>
              {isSelected ? (
                <>
                  <CheckSquare className="mr-2" />
                  Unselect
                </>
              ) : (
                <>
                  <Square className="mr-2" />
                  Select
                </>
              )}
            </DropdownItem>
          )}
          {hasTranscodedFiles &&
            transcoded.map(media => (
              <DropdownItem tag="a" href={media.url} key={media.preset}>
                <Download className="mr-2" />
                {media.preset}
              </DropdownItem>
            ))}
          {onChangeMovieMetadata && (
            <DropdownItem onClick={onChangeMovieMetadata}>
              <Film className="mr-2" />
              {movieId ? 'Change movie metadata' : 'Set movie metadata'}
            </DropdownItem>
          )}
          {onChangeTvMetadata && (
            <DropdownItem onClick={onChangeTvMetadata}>
              <Tv className="mr-2" />
              {tvId ? 'Change tv metadata' : 'Set tv metadata'}
            </DropdownItem>
          )}
          {canRemoveMetadata && (
            <DropdownItem
              className={confirmRemoveMetadata ? 'text-danger' : ''}
              onClick={this.onRemoveMetadata}
            >
              <Trash className="mr-2" />
              {confirmRemoveMetadata
                ? 'Click again to confirm'
                : 'Remove metadata'}
            </DropdownItem>
          )}
          {onTranscode && (
            <DropdownItem onClick={onTranscode}>
              <TranscoderIcon className="mr-2" />
              Transcode
            </DropdownItem>
          )}
        </DropdownMenu>
      </ToggleContainer>
    );
  }
}

export default FileDropdown;
