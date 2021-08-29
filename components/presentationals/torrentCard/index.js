import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as MoreVertical } from 'feather-icons/dist/icons/more-vertical.svg';
import { ReactComponent as Check } from 'feather-icons/dist/icons/check.svg';
import { ReactComponent as Pause } from 'feather-icons/dist/icons/pause.svg';
import { ReactComponent as Play } from 'feather-icons/dist/icons/play.svg';
import { ReactComponent as Trash } from 'feather-icons/dist/icons/trash.svg';
import { ReactComponent as Compass } from 'feather-icons/dist/icons/compass.svg';
import { ReactComponent as DownloadIcon } from 'feather-icons/dist/icons/download.svg';
import { ReactComponent as ChevronUp } from 'feather-icons/dist/icons/chevron-up.svg';
import { ReactComponent as LinkIcon } from 'feather-icons/dist/icons/link.svg';

import Link from 'next/link';
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
import FilesDetail from './filesDetail';

const noop = () => {};

class TorrentCard extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    torrent: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool,
    isOwner: PropTypes.bool,
    isLoading: PropTypes.bool,
    onOpenTrackers: PropTypes.func,
    onPlayFile: PropTypes.func,
    onPause: PropTypes.func,
    onStart: PropTypes.func,
    onRemove: PropTypes.func,
    onOpen: PropTypes.func.isRequired,
    onChangeMovieMetadata: PropTypes.func,
    onChangeTvMetadata: PropTypes.func,
    onRemoveMetadata: PropTypes.func,
    onTranscode: PropTypes.func,
    getMetalinkHref: PropTypes.func,
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
    const { isOpen, onOpen, toggle, torrent } = this.props;
    if (!isOpen) {
      evt.persist();
      if (onOpen) {
        await this.props.onOpen(evt, torrent);
      }
    }

    if (toggle) {
      this.props.toggle(evt);
    }
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
      isOwner,
      isLoading,
      isOpen: givenIsOpen,
      toggle,
      onOpenTrackers,
      onPlayFile,
      onChangeMovieMetadata,
      onChangeTvMetadata,
      onRemoveMetadata,
      onTranscode,
      getMetalinkHref,
    } = this.props;
    const downloaded = torrent.leftUntilDone <= 0;
    const seeding = isSeeding(torrent.status);
    const downloading = isDownloading(torrent.status);
    const stopped = isStopped(torrent.status);
    const checking = isChecking(torrent.status);
    const finished = torrent.isFinished;
    const isOpen = givenIsOpen || !toggle;

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
        <div
          className={cl('p-3', styles.cardHeader, {
            [styles.cardHeaderOpenable]: !!toggle,
          })}
          onClick={this.onOpen}
        >
          {isOwner && (
            <div className={cl(styles.moreButton, 'ml-auto')}>
              <ToggleContainer
                view={Dropdown}
                direction="left"
                onToggle={this.onDropdownToggle}
              >
                <DropdownToggle
                  tag="button"
                  className="btn btn-round shadow-none"
                  aria-haspopup
                  aria-expanded={false}
                >
                  <MoreVertical />
                </DropdownToggle>
                <DropdownMenu>
                  {(seeding || downloading || checking) &&
                    (!finished || isAdmin) && (
                      <DropdownItem onClick={this.onPause}>
                        <Pause className="mr-2" /> Pause
                      </DropdownItem>
                    )}
                  {stopped && (!finished || isAdmin) && (
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
                  <Link passHref href="/in/[hash]" as={`/in/${torrent.hash}`}>
                    <DropdownItem tag="a">
                      <LinkIcon className="mr-2" />
                      Permalink
                    </DropdownItem>
                  </Link>
                  {downloaded && getMetalinkHref && (
                    <DropdownItem
                      tag="a"
                      href={getMetalinkHref(torrent.hash)}
                      target="_blank"
                    >
                      <DownloadIcon className="mr-2" />
                      Download Metalink
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
          <div className="w-100 overflow-hidden">
            <h5 className="text-truncate">{torrent.name || 'Unknown'}</h5>
            {seeding && (
              <Progress color="ternary" percent={getSeedPercent(torrent)} />
            )}
            {!downloaded && (
              <Progress
                color="secondary"
                percent={getDownloadPercent(torrent)}
              />
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
                <IconInformation color="dark" icon={Upload}>
                  <PrettyBytes bytes={torrent.rateUpload} />
                  /s
                </IconInformation>
              )}
              {(downloading || checking) && (
                <>
                  <IconInformation color="dark" icon={Download}>
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
            <div className="px-3">
              <h6 className="mb-0 mt-2">Files</h6>
              <FilesDetail
                files={get(torrent, 'files', [])}
                onPlayFile={onPlayFile}
                onChangeMovieMetadata={
                  isOwner || isAdmin ? onChangeMovieMetadata : undefined
                }
                onChangeTvMetadata={
                  isOwner || isAdmin ? onChangeTvMetadata : undefined
                }
                onRemoveMetadata={
                  isOwner || isAdmin ? onRemoveMetadata : undefined
                }
                onTranscode={isAdmin ? onTranscode : undefined}
                selectable={isOwner || isAdmin}
              />
              {toggle && (
                <div
                  className={cl('w-100 py-2 text-center', styles.cardToggle)}
                  onClick={toggle}
                >
                  <ChevronUp />
                </div>
              )}
            </div>
          )}
        </VelocityTransitionGroup>
        <WaveLoader className="border-radius" visible={isLoading} />
      </Card>
    );
  }
}

export default TorrentCard;
