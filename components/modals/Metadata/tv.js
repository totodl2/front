import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

import { ReactComponent as Tv } from 'feather-icons/dist/icons/tv.svg';
import { ReactComponent as Info } from 'feather-icons/dist/icons/info.svg';
import { ReactComponent as CheckCircle } from 'feather-icons/dist/icons/check-circle.svg';
import cl from 'classnames';
import { bindActionCreators, compose } from 'redux';
import get from 'lodash/get';
import { connect } from 'react-redux';

import SearchMetadataForm from '../../forms/searchMetadata';
import WaveLoader from '../../presentationals/waveLoader';
import MetadataContainer from '../../containers/MetadataContainer';
import ImdbCard from '../../presentationals/imdbCard';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import withContainer from '../../../lib/withContainer';
import styles from './tv.module.scss';
import ErrorCard from '../../presentationals/errorCard';
import EpisodesMetadataForm from '../../forms/episodesMetadata';

class TvMetadataModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    configuration: PropTypes.object,
    files: PropTypes.arrayOf(PropTypes.object).isRequired,
    search: PropTypes.shape({
      loading: PropTypes.bool,
      results: PropTypes.array,
      error: PropTypes.object,
    }),
    tv: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
    }),
    setTvMetadata: PropTypes.func.isRequired,
    searchTv: PropTypes.func.isRequired,
    getConfiguration: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
  };

  componentDidMount() {
    this.props.getConfiguration();
  }

  componentDidUpdate(prevProps) {
    const {
      tv: { loading, error },
      close,
    } = this.props;
    if (prevProps.tv.loading && !loading && !error) {
      close(true);
    }
  }

  select = media => {
    this.setState(({ selected }) => ({
      selected: selected && selected.id === media.id ? null : media,
    }));
  };

  unselect = () => this.setState({ selected: null });

  onSubmit = data => {
    this.props.searchTv(data.query);
    this.setState({ selected: null });
  };

  onSetMetadata = results => {
    const {
      selected: { id: tvId },
    } = this.state;

    const files = Object.entries(results).map(([fileId, infos]) => ({
      ...infos,
      fileId,
    }));

    this.props.setTvMetadata(files, tvId);
  };

  close = () => {
    this.props.close();
  };

  render() {
    const { isOpen, className, files, configuration, search, tv } = this.props;
    const { selected } = this.state;

    return (
      <Modal
        size="lg"
        isOpen={isOpen}
        toggle={this.close}
        className={className}
      >
        <ModalHeader toggle={this.close}>
          <div className="d-flex align-items-center">
            <Tv className="mr-2" />
            Tv metadata
          </div>
        </ModalHeader>
        <ModalBody className="pb-0">
          <p>
            Change metadata for{' '}
            <span className="font-weight-bold text-break">
              {files.length <= 1 ? files[0].basename : `${files.length} files`}
            </span>
          </p>
          <SearchMetadataForm
            onSubmit={this.onSubmit}
            placeholder="Game of thrones"
            label="Tv show's name"
          />
        </ModalBody>
        <EpisodesMetadataForm files={files} onSubmit={this.onSetMetadata}>
          {({ form }) => (
            <>
              <ModalBody className="pt-0">
                {search.error && (
                  <ErrorCard {...search.error} className="mb-3" />
                )}
                {!selected && (
                  <div className="row">
                    {search.results &&
                      search.results.map(media => (
                        <div className="col-lg-3 col-6 mb-3" key={media.id}>
                          <ImdbCard
                            className={styles.tv}
                            title={media.name}
                            configuration={configuration}
                            posterPath={media.posterPath}
                            onClick={() => this.select(media)}
                            hoverable
                            releaseDate={media.firstAirDate}
                          />
                        </div>
                      ))}
                    {search.results && search.results.length <= 0 && (
                      <div className="col">
                        <div className="alert alert-primary">
                          <Info className="mr-2" />
                          No results found
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {selected && (
                  <>
                    <div className="row">
                      <div className="col-lg-3 mb-3">
                        <ImdbCard
                          title={selected.name}
                          configuration={configuration}
                          posterPath={selected.posterPath}
                          releaseDate={selected.firstAirDate}
                          className={cl('h-auto', styles.tv, styles.tvSelected)}
                          hoverable
                          onClick={this.unselect}
                        >
                          <div className={styles.tvCheck}>
                            <CheckCircle />
                          </div>
                        </ImdbCard>
                      </div>
                      <div className="col-lg-9 mb-3">
                        <h5>{selected.name}</h5>
                        {selected.overview && (
                          <>
                            <h6>Overview</h6>
                            <p>{selected.overview}</p>
                          </>
                        )}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={this.unselect}
                        >
                          Unselect
                        </button>
                      </div>
                    </div>
                    {form}
                  </>
                )}
                {tv.error && <ErrorCard {...tv.error} className="mt-3" />}
              </ModalBody>
              <ModalFooter>
                <div className="mx-auto">
                  <button
                    type="button"
                    className="btn mr-2"
                    onClick={this.close}
                  >
                    Cancel
                  </button>
                  {selected && (
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </EpisodesMetadataForm>
        <WaveLoader
          className="border-radius"
          visible={search.loading || configuration.loading || tv.loading}
        />
      </Modal>
    );
  }
}

export default compose(
  withContainer(MetadataContainer),
  connect(
    state => ({
      configuration: get(state, 'metadataConfiguration', {}),
    }),
    dispatch => bindActionCreators({ getConfiguration }, dispatch),
  ),
)(TvMetadataModal);
