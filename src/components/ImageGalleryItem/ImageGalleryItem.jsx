import PropTypes from 'prop-types';

export function ImageGalleryItem({ imageURL, tags, onClick }) {
  return (
    <li className="gallery-item">
      <img src={imageURL} alt={tags} onClick={onClick} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
