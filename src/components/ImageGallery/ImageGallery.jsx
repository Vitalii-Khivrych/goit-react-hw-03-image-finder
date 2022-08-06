// import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';

export function ImageGallery({ images, getImg }) {
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imageURL={webformatURL}
          tags={tags}
          onClick={() => getImg(largeImageURL)}
        />
      ))}
    </ul>
  );
}
