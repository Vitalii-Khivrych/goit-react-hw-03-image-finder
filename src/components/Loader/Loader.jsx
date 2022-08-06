import PropTypes from 'prop-types';
import { Circles } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <Circles
        color="teal"
        height="50"
        width="50"
        ariaLabel="three-dots-loading"
      />
    </LoaderWrap>
  );
};
