import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

import { ReactComponent as Info } from 'feather-icons/dist/icons/info.svg';
import { ReactComponent as Film } from 'feather-icons/dist/icons/film.svg';
import { bindActionCreators, compose } from 'redux';
import get from 'lodash/get';
import { connect } from 'react-redux';

import SearchMetadataForm from '../../forms/searchMetadata';
import WaveLoader from '../../presentationals/waveLoader';
import MetadataContainer from '../../containers/MetadataContainer';
import ImdbCard from '../../presentationals/imdbCard';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import withContainer from '../../../lib/withContainer';
import styles from './movie.module.scss';
import ErrorCard from '../../presentationals/errorCard';

class MovieMetadataModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    configuration: PropTypes.object,
    file: PropTypes.object.isRequired,
    search: PropTypes.shape({
      loading: PropTypes.bool,
      results: PropTypes.array,
      error: PropTypes.object,
    }),
    movie: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
    }),
    setMovieMetadata: PropTypes.func.isRequired,
    searchMovie: PropTypes.func.isRequired,
    getConfiguration: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getConfiguration();
  }

  componentDidUpdate(prevProps) {
    const {
      movie: { loading, error },
      close,
    } = this.props;
    if (prevProps.movie.loading && !loading && !error) {
      close(true);
    }
  }

  onSubmit = data => {
    this.props.searchMovie(data.query);
  };

  onSetMetadata = media => {
    const { setMovieMetadata, file } = this.props;
    setMovieMetadata(file.id, media.id);
  };

  close = () => {
    this.props.close();
  };

  render() {
    const {
      isOpen,
      className,
      file,
      configuration,
      search,
      movie,
    } = this.props;

    return (
      <Modal
        size="lg"
        isOpen={isOpen}
        toggle={this.close}
        className={className}
      >
        <ModalHeader toggle={this.close}>
          <div className="d-flex align-items-center">
            <Film className="mr-2" />
            Movie metadata
          </div>
        </ModalHeader>
        <ModalBody>
          <p>
            Change metadata for <b>{file.basename}</b>
          </p>
          <SearchMetadataForm
            onSubmit={this.onSubmit}
            placeholder="Rambo V"
            label="Movie's name"
          />
          {search.error && <ErrorCard {...search.error} className="mb-3" />}
          <div className="row">
            {search.results &&
              search.results.map(media => (
                <div className="col-lg-3 col-6 mb-3" key={media.id}>
                  <ImdbCard
                    className={styles.movie}
                    title={media.title}
                    configuration={configuration}
                    posterPath={media.posterPath}
                    onClick={() => this.onSetMetadata(media)}
                    hoverable
                    releaseDate={media.releaseDate}
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
          {movie.error && <ErrorCard {...movie.error} className="mt-3" />}
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <button type="button" className="btn mr-2" onClick={this.close}>
              Cancel
            </button>
          </div>
        </ModalFooter>
        <WaveLoader
          className="border-radius"
          visible={search.loading || configuration.loading || movie.loading}
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
)(MovieMetadataModal);
