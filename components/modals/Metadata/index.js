import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CheckCircle, Info } from 'react-feather';
import cl from 'classnames';
import { bindActionCreators, compose } from 'redux';
import get from 'lodash/get';
import { connect } from 'react-redux';

import { Form } from '../../forms/metadata';
import WaveLoader from '../../presentationals/waveLoader';
import MetadataContainer from '../../containers/MetadataContainer';
import Movie from '../../presentationals/movie';
import { getConfiguration } from '../../../redux/actions/metadataConfiguration';
import withContainer from '../../../lib/withContainer';
import styles from './styles.module.scss';
import ErrorCard from '../../presentationals/errorCard';

class MetadataModal extends PureComponent {
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
    set: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
    }),
    setMetadata: PropTypes.func.isRequired,
    searchMovie: PropTypes.func.isRequired,
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
      set: { loading, error },
      close,
    } = this.props;
    if (prevProps.set.loading && !loading && !error) {
      close();
    }
  }

  select = media => {
    this.setState(({ selected }) => ({
      selected: selected === media.id ? null : media.id,
    }));
  };

  onSubmit = data => {
    this.props.searchMovie(data.query);
    this.setState({ selected: null });
  };

  onSetMetadata = () => {
    const { setMetadata, file } = this.props;
    setMetadata(file.id, this.state.selected);
  };

  render() {
    const {
      isOpen,
      close,
      className,
      file,
      configuration,
      search,
      set,
    } = this.props;
    const { selected } = this.state;

    return (
      <Modal size="lg" isOpen={isOpen} toggle={close} className={className}>
        <ModalHeader toggle={close}>File metadata</ModalHeader>
        <ModalBody className="">
          <p>
            Change metadata associated with <b>{file.basename}</b>
          </p>
          <Form onSubmit={this.onSubmit} />
          {search.error && <ErrorCard {...search.error} className="mb-3" />}
          <div className="row">
            {search.results &&
              search.results.map(media => (
                <div className="col-lg-3 col-6 mb-3" key={media.id}>
                  <Movie
                    className={cl(styles.movie, {
                      [styles.movieSelected]: selected === media.id,
                    })}
                    title={media.title}
                    configuration={configuration}
                    posterPath={media.posterPath}
                    onClick={() => this.select(media)}
                    hoverable={selected !== media.id}
                    releaseDate={media.releaseDate}
                  >
                    {selected === media.id && (
                      <div className={styles.movieCheck}>
                        <CheckCircle />
                      </div>
                    )}
                  </Movie>
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
          {set.error && <ErrorCard {...set.error} className="mt-3" />}
        </ModalBody>
        <ModalFooter>
          <div className="mx-auto">
            <button type="button" className="btn mr-2" onClick={close}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!selected}
              onClick={this.onSetMetadata}
            >
              Save
            </button>
          </div>
        </ModalFooter>
        <WaveLoader
          className="border-radius"
          visible={search.loading || configuration.loading || set.loading}
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
)(MetadataModal);
