import React, { Component } from "react";
import Parser from 'html-react-parser';
import './Content.css'

class Content extends Component {
  constructor() {
    super();
    this.state = {photos: []};
  }
  async componentDidMount() {
    const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&extras=description&format=json&nojsoncallback=2&per_page=10&page=2`);
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    const photosWithUrls = jsonResponse.photos.photo.map((photo)=>{
      const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      photo.url = url;
      return photo;
    })
    this.setState({photos: photosWithUrls});
  }

  render() {
    return (
      <div className="contentArea">
      {this.state.photos.map((photo) =>
          <div key={photo.id} className="photo-card">
            <img src= {photo.url} alt="title" />
            <figcaption className="image-title">{photo.title} </figcaption>
            <p className="image-description">{Parser(photo.description._content)}</p>
          </div>
       )}
      </div>
    );
  }
}
export default Content;
