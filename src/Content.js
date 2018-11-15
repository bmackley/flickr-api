import React, { Component } from "react";
import Parser from 'html-react-parser';
import './Content.css'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {photos: [], nextPageToGet: 1};
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);

  }
  async componentDidMount() {
    this.getNextSetOfPhotos();
  }
  async handleLoadMoreClick(e){
    e.preventDefault();
    this.getNextSetOfPhotos();
  }
  handleSearchClick(e){
    e.preventDefault();
    const searchTerm = document.getElementById('searchTermBox').value;
    this.filterPhotos(searchTerm, this.state.photos)
  }
  async getNextSetOfPhotos(){
    {/*Fetch Photos */}
    const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&extras=description&format=json&nojsoncallback=2&per_page=10&page=${this.state.nextPageToGet}`);
    const jsonResponse = await response.json();
    const photosWithUrls = jsonResponse.photos.photo.map((photo)=>{
      const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      photo.url = url;
      return photo;
    })
    {/*Update photos on the state*/}
    const newPhotosArray = [...this.state.photos, ...photosWithUrls];
    const nextPage = this.state.nextPageToGet + 1;
    this.setState({photos: newPhotosArray, nextPageToGet: nextPage});

  }

  filterPhotos(filterValue, photosArray){
      {/* Filter photos based on the photo description*/}
      const newPhotos = photosArray.filter((photo)=> photo.description._content.includes(filterValue));
      this.setState({photos: newPhotos})
  }

  render() {
    return (
      <div className="contentArea">
      <input id="searchTermBox" type="text" />
      <button onClick={this.handleSearchClick}>Search</button>
      {this.state.photos.map((photo) =>
          <div key={photo.id} className="photo-card">
            <img src= {photo.url} alt="title" />
            <figcaption className="image-title">{photo.title} </figcaption>
            <p className="image-description">{Parser(photo.description._content)}</p>
          </div>
       )}
       <button onClick={this.handleLoadMoreClick}> Load More Photos </button>
      </div>
    );
  }
}
export default Content;
