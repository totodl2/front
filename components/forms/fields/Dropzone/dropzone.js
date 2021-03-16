import React, { PureComponent } from 'react';
import ReactDropzone from 'react-dropzone';
import { fieldArrayPropTypes, Field } from 'redux-form';
import PropTypes from 'prop-types';
import cl from 'classnames';

import { FileWrapped } from './file';

import styles from './dropzone.module.scss';

class Dropzone extends PureComponent {
  static propTypes = {
    ...fieldArrayPropTypes,
    className: PropTypes.string,
    fileLabel: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    fileLabel: 'File',
  };

  onDrop = files => {
    const { fields } = this.props;
    files.map(file => fields.push(file));
  };

  render() {
    const {
      fields,
      fileLabel,
      className,
      id,
      meta,
      input,
      ...props
    } = this.props;
    return (
      <ReactDropzone {...props} onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive, rejectedFiles }) => (
          <div id={id} className={className}>
            <div
              {...getRootProps({
                className: cl(styles.dropzone, {
                  [styles.dropzoneActive]: isDragActive,
                }),
              })}
            >
              <input {...getInputProps()} />
              <p>Drag&apos;n&apos;drop your files here or</p>
              <button type="button" className="btn btn-outline-dark">
                Select files
              </button>
            </div>
            {rejectedFiles && rejectedFiles.length > 0 && (
              <div className="alert alert-danger mt-3">
                Invalid files: {rejectedFiles.map(f => f.name).join(', ')}
              </div>
            )}
            <div className={styles.dropzoneFiles}>
              {fields.map((fieldName, i) => (
                <Field
                  name={fieldName}
                  key={fieldName}
                  label={`${fileLabel} ${i + 1}`}
                  component={FileWrapped}
                  onRemove={() => fields.remove(i)}
                />
              ))}
            </div>
          </div>
        )}
      </ReactDropzone>
    );
  }
}

export default Dropzone;
