import React, { Component } from 'react';
import api from '../../helpers/apiService';
import { SearchBar, ImageGallery, Button, Loader, Modal } from 'components';
import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    modalInfo: {},
    totalHits: null,
    error: null,
    isLoading: false,
    isOpenModal: false,
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const response = await api(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalHits: response.totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      }

      this.setState({ isLoading: false });
    }
  };

  onClickImage = obj => {
    this.setState({
      modalInfo: obj,
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      modalInfo: {},
      isOpenModal: false,
    });
  };

  onSubmit = value => {
    if (value.trim() === '') {
      return;
    }

    this.setState({
      images: [],
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
      totalHits,
      modalInfo: { largeImageURL, tags },
    } = this.state;

    // console.log(images);
    // console.log(images.length);
    // console.log(totalHits);

    const isShowBtn =
      images.length !== 0 && images.length !== totalHits && !isLoading;

    return (
      <AppWrap>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} getImg={this.onClickImage} />

        {isLoading && <Loader />}

        {isShowBtn && <Button onClick={this.onClickBtnLoadMore} />}

        {isOpenModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </AppWrap>
    );
  }
}
