import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  MoreVertical,
  Check,
  Pause,
  Play,
  Trash,
  Compass,
} from 'react-feather';
import cl from 'classnames';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import Dropdown from 'reactstrap/lib/Dropdown';
import { VelocityTransitionGroup } from 'velocity-react';
import get from 'lodash/get';

import IconInformation from './iconInformation';
import Upload from '../icons/Upload';
import Download from '../icons/Download';
import SeedsIcon from '../icons/SeedsIcon';
import User from '../icons/User';
import DiskIcon from '../icons/DiskIcon';
import PeersIcon from '../icons/PeersIcon';
import ETAIcon from '../icons/ETA';
import ErrorIcon from '../icons/ErrorIcon';

import Card from '../card/card';
import PrettyBytes from '../prettyBytes';
import MainInformation from './mainInformation';
import Progress from '../progress';
import { isChecking, isDownloading, isSeeding, isStopped } from './status';
import { getDownloadPercent, getSeedPercent } from './utils';
import ETA from '../eta';

import styles from './index.module.scss';
import WaveLoader from '../waveLoader';
import ToggleContainer from '../../containers/ToggleContainer';
import Details from './details';

const noop = () => {};

class TorrentCard extends PureComponent {
  static propTypes = {
    torrent: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool,
    isLoading: PropTypes.bool,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    onOpenTrackers: PropTypes.func,
    onPause: PropTypes.func,
    onStart: PropTypes.func,
    onRemove: PropTypes.func,
    onOpen: PropTypes.func.isRequired,
  };

  state = {
    confirmRemove: false,
  };

  onRemove = evt => {
    const { confirmRemove } = this.state;

    if (!confirmRemove) {
      this.setState({ confirmRemove: true });
      evt.stopPropagation();
      return;
    }

    (this.props.onRemove || noop)(evt, this.props.torrent);
  };

  onStart = evt => (this.props.onStart || noop)(evt, this.props.torrent);

  onPause = evt => (this.props.onPause || noop)(evt, this.props.torrent);

  onOpen = async evt => {
    if (!this.props.isOpen) {
      evt.persist();
      await this.props.onOpen(evt, this.props.torrent);
    }
    this.props.toggle(evt);
  };

  onDropdownToggle = opened => {
    if (!opened) {
      this.setState({ confirmRemove: false });
    }
  };

  onOpenTrackers = () => {
    this.props.onOpenTrackers(this.props.torrent);
  };

  render() {
    const { confirmRemove } = this.state;
    const {
      torrent,
      isAdmin,
      isLoading,
      isOpen,
      toggle,
      onOpenTrackers,
    } = this.props;
    const downloaded = torrent.leftUntilDone <= 0;
    const seeding = isSeeding(torrent.status);
    const downloading = isDownloading(torrent.status);
    const stopped = isStopped(torrent.status);
    const checking = isChecking(torrent.status);
    const finished = torrent.isFinished;

    return (
      <Card
        className={cl(
          'd-flex flex-column mb-4 position-relative',
          styles.card,
          {
            [styles.cardNotOpened]: !isOpen,
          },
        )}
      >
        <div className={cl('p-3', styles.cardHeader)} onClick={this.onOpen}>
          {isAdmin && (
            <div className={cl(styles.moreButton, 'ml-auto')}>
              <ToggleContainer
                view={Dropdown}
                direction="left"
                onToggle={this.onDropdownToggle}
              >
                <DropdownToggle
                  tag="button"
                  className="btn btn-round shadow-none"
                >
                  <MoreVertical />
                </DropdownToggle>
                <DropdownMenu>
                  {(seeding || downloading || checking) && (
                    <DropdownItem onClick={this.onPause}>
                      <Pause className="mr-2" /> Pause
                    </DropdownItem>
                  )}
                  {stopped && (
                    <DropdownItem onClick={this.onStart}>
                      <Play className="mr-2" /> Start
                    </DropdownItem>
                  )}
                  {onOpenTrackers && (
                    <DropdownItem onClick={this.onOpenTrackers}>
                      <Compass className="mr-2" />
                      Trackers
                    </DropdownItem>
                  )}
                  <DropdownItem
                    className={confirmRemove ? 'text-danger' : ''}
                    onClick={this.onRemove}
                  >
                    <Trash className="mr-2" />
                    {confirmRemove ? 'Click again to confirm' : 'Remove'}
                  </DropdownItem>
                </DropdownMenu>
              </ToggleContainer>
            </div>
          )}
          <div className="w-100">
            <h5 className="text-truncate">{torrent.name || 'Unknown'}</h5>
            {seeding && (
              <Progress color="primary" percent={getSeedPercent(torrent)} />
            )}
            {!downloaded && (
              <Progress color="success" percent={getDownloadPercent(torrent)} />
            )}
            <div className="mt-2 text-truncate">
              {torrent.errorString && (
                <IconInformation color="danger" icon={ErrorIcon}>
                  {torrent.errorString}
                </IconInformation>
              )}
              {downloading && (
                <IconInformation icon={ETAIcon}>
                  <ETA time={torrent.eta} short />
                </IconInformation>
              )}
              <IconInformation icon={DiskIcon}>
                {!downloaded && (
                  <>
                    <PrettyBytes
                      bytes={torrent.sizeWhenDone - torrent.leftUntilDone}
                    />{' '}
                    /{' '}
                  </>
                )}
                <PrettyBytes bytes={torrent.sizeWhenDone} />
              </IconInformation>
              {(downloading || seeding || checking) && (
                <IconInformation color="primary" icon={Upload}>
                  <PrettyBytes bytes={torrent.rateUpload} />
                  /s
                </IconInformation>
              )}
              {(downloading || checking) && (
                <>
                  <IconInformation color="success" icon={Download}>
                    <PrettyBytes bytes={torrent.rateDownload} />
                    /s
                  </IconInformation>
                  <IconInformation icon={PeersIcon} help="Seeders connected">
                    {torrent.peersSendingToUs} of {torrent.peersConnected}
                  </IconInformation>
                </>
              )}
              {(downloading || seeding || checking) && (
                <IconInformation icon={SeedsIcon} help="Leechers connected">
                  {torrent.peersGettingFromUs} of {torrent.peersConnected}
                </IconInformation>
              )}
              {torrent.user && (
                <IconInformation icon={User}>
                  {torrent.user.nickname}
                </IconInformation>
              )}
            </div>
          </div>
          {seeding && (
            <MainInformation
              className="ml-3 d-none d-md-flex"
              label="seed ratio"
            >
              {Math.round(torrent.uploadRatio * 100) / 100}{' '}
              {torrent.uploadRatioLimit > 0 && `/${torrent.uploadRatioLimit}`}
            </MainInformation>
          )}
          {stopped && (
            <MainInformation
              className="ml-3 d-none d-md-flex"
              label={finished ? 'Finished' : 'Paused'}
            >
              {finished ? <Check /> : <Pause />}
            </MainInformation>
          )}
          {checking && (
            <MainInformation className="ml-3 d-none d-md-flex" label="peers">
              {torrent.peersConnected}
            </MainInformation>
          )}
          {downloading && (
            <MainInformation
              className="ml-3 d-none d-md-flex"
              label="downloaded"
            >
              {getDownloadPercent(torrent, 0)}%
            </MainInformation>
          )}
        </div>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 200 }}
          leave={{ animation: 'slideUp', duration: 200 }}
        >
          {isOpen && (
            <Details
              className="px-3"
              files={get(torrent, 'files', [])}
              toggle={toggle}
            />
          )}
        </VelocityTransitionGroup>
        <WaveLoader visible={isLoading} />
      </Card>
    );
  }
}

export default TorrentCard;
