import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import Tooltip from 'reactstrap/lib/Tooltip';

import TranscoderIcon from '../../icons/TranscoderIcon';
import ToggleContainer from '../../../containers/ToggleContainer';

const TranscoderStatus = ({ id, failedAt, status, queuedAt }) => {
  const htmlId = `transco-tt-${id}`;
  const isFailed = !!failedAt;
  const isStarted = queuedAt && status && !isFailed;

  return (
    <>
      <TranscoderIcon
        id={htmlId}
        className={cl({
          'text-muted': !isStarted && !isFailed,
          'text-danger': isFailed,
        })}
      />
      <ToggleContainer view={Tooltip} target={`${htmlId}`}>
        {!isStarted && !isFailed && `Transcoding queued`}
        {isStarted && (
          <>
            Transcoding status
            {Object.entries(status).map(([name, data]) => (
              <div key={name}>
                {name}: {data.progress}%
              </div>
            ))}
          </>
        )}
        {isFailed && `Transcoding failed`}
      </ToggleContainer>
    </>
  );
};

TranscoderStatus.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired,
  queuedAt: PropTypes.string.isRequired,
  failedAt: PropTypes.string.isRequired,
};

export default TranscoderStatus;
