import React, { Component } from 'react';
import api from '../../helpers/apiService';
import { SearchBar, ImageGallery, Button, Loader, Modal } from 'components';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    modalInfo: {},
    error: null,
    isLoading: false,
    isOpenModal: false,
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page, isLoading } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const response = await api(query, page);
        const imagesArr = response.hits;

        this.setState({ images: imagesArr });
      } catch (error) {
        this.setState({ error });
      }

      this.setState({ isLoading: false });
    }
  };

  onClickImage = obj => {
    this.setState({
      modalInfo: { ...obj },
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
      modalInfo: {},
    });
  };

  onSubmit = value => {
    // const { query } = this.state;
    this.setState({
      query: value,
      page: 1,
    });
  };

  onClickBtnLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      isOpenModal,
      modalInfo: { largeImageURL, tags },
    } = this.state;

    const loadMoreBtn = isLoading ? (
      <Loader />
    ) : (
      <Button onClick={this.onClickBtnLoadMore} />
    );

    const openModal = (
      <Modal onClose={this.onCloseModal}>
        <img src={largeImageURL} alt={tags} />
      </Modal>
    );

    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />

        <ImageGallery images={images} getImg={this.onClickImage} />

        {images.length !== 0 && loadMoreBtn}

        {isOpenModal && openModal}
      </>
    );
  }
}
