// import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Load More
    </button>
  );
}

Button.propType = {
  onClick: PropTypes.func.isRequired,
};
