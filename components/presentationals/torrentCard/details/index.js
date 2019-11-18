import React from 'react';
import PropTypes from 'prop-types';
import set from 'lodash.set';
import get from 'lodash.get';
import { Folder, FolderMinus, FolderPlus, ChevronUp } from 'react-feather';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { VelocityTransitionGroup } from 'velocity-react';
import Card from '../../card/card';
import ToggleContainer from '../../../containers/ToggleContainer';
import torrents from '../../../../redux/reducers/torrents';

const MAX_FILES_DISPLAYED = 50;
const filesSymbol = Symbol('files');

function process(files) {
  const out = {};
  files.forEach(file => {
    if (!file.directory) {
      out[filesSymbol] = out[filesSymbol] || [];
      out[filesSymbol].push(file);
      return;
    }

    const path = file.directory.split('/');
    const directory = get(out, path, {});
    if (!directory[filesSymbol]) {
      directory[filesSymbol] = [];
    }
    directory[filesSymbol].push(file);
    set(out, path, directory);
  });
  return out;
}

const Directory = ({ directory, name, className, isOpen, toggle }) => (
  <div className={className}>
    {name && (
      <div className="text-muted" onClick={toggle}>
        {toggle && isOpen && <FolderMinus />}
        {toggle && !isOpen && <FolderPlus />}
        {!toggle && <Folder />}
        {name}
      </div>
    )}
    <VelocityTransitionGroup
      enter={{ animation: 'slideDown', duration: 200 }}
      leave={{ animation: 'slideUp', duration: 200 }}
    >
      {toggle && isOpen && (
        <div className={name ? 'ml-2' : ''}>
          {Object.entries(directory).map(([childName, value]) => {
            const files = get(value, filesSymbol, []);
            const count = files.length + Object.entries(value).length;
            return (
              <ToggleContainer
                view={Directory}
                key={childName}
                name={childName}
                directory={value}
                defaultOpened={count < MAX_FILES_DISPLAYED}
              />
            );
          })}
          {directory[filesSymbol] &&
            directory[filesSymbol].map(file => (
              <div key={file.id}>{file.basename}</div>
            ))}
        </div>
      )}
    </VelocityTransitionGroup>
  </div>
);

Directory.propTypes = {
  directory: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

const Details = ({ torrent, toggle }) => {
  const directory = process(torrent.files);
  return (
    <div className="px-3">
      <h6>Files</h6>
      <ToggleContainer
        view={Directory}
        directory={directory}
        defaultOpened={get(torrents, 'files.length', 0) < MAX_FILES_DISPLAYED}
      />
      <div className="w-100 my-2 text-center" onClick={toggle}>
        <ChevronUp />
      </div>
    </div>
  );
};

Details.propTypes = {
  toggle: PropTypes.func.isRequired,
  torrent: PropTypes.object,
};

export default Details;
