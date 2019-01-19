import React from 'react';
import propTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from 'rc-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cheat = ({
  showActionBar,
  cheat: {
    description, line, _id: id, favorite
  }, onAddToFavorite
}) => (
  <div className="cheat">
    <p>{description}</p>
    <CopyToClipboard text={line}>
      <Tooltip placement="left" trigger={['click']} overlay={<span>Copied!</span>}>
        <p className="line">
          {`$ ${line}`}
        </p>
      </Tooltip>
    </CopyToClipboard>
    {showActionBar && localStorage.getItem('token') && <FontAwesomeIcon className={favorite ? 'favorite' : ''} icon="heart" onClick={() => onAddToFavorite(id)} />}
  </div>
);

Cheat.propTypes = {
  cheat: propTypes.shape({
    description: propTypes.string.isRequired,
    line: propTypes.string.isRequired
  }).isRequired,
  onAddToFavorite: propTypes.func.isRequired
};

export default Cheat;
