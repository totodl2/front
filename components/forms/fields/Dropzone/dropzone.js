import React, { PureComponent } from 'react';
import ReactDropzone from 'react-dropzone';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cl from 'classnames';

import File from './file';

import styles from './dropzone.module.scss';
import FieldWrapper from '../FieldWrapper';

class Dropzone extends PureComponent {
  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func.isRequired,
      map: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }),
    meta: PropTypes.any,
    input: PropTypes.any,
    className: PropTypes.string,
    fileLabel: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    fileLabel: 'File',
  };

  onDrop = files => {
    const { fields } = this.props;
    files.forEach(file => {
      fields.push(file);
    });
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
                  key={get(fields, `value[${i}].key`, fieldName)}
                  label={`${fileLabel} ${i + 1}`}
                  component={FieldWrapper}
                  controlComponent={File}
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
