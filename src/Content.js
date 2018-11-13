import React, { Component } from "react";
import ReactDOM from "react-dom";
class Content extends Component {
  constructor() {
    super();
    this.state = { data: {}, photos: []};
  }
  async componentDidMount() {
    const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=2`);
    const jsonResponse = await response.json();
    console.log("json resonse", jsonResponse)
    this.setState({ data: jsonResponse});
    const photosWithUrls = jsonResponse.photos.photo.map((photo)=>{
      const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      photo.url = url;
      return photo;
      // return [...photo, url]
    })
    this.setState({photos: photosWithUrls});
    // const imgHTML = this.state.map((photo)=>{
    //   var urlDefault = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    //   console.log(urlDefault);
    //   <img src = {urlDefault} id={photo.id} />
    // });
  }

  render() {
    return (
      <div className="contentArea">
      {this.state.photos.map((photo) =>
        <div>
          <h1>ID {photo.id}</h1>
          <h1>SRC {photo.url}</h1>

          <img key= {photo.id} src= {photo.url} />
        </div>
       )}
      </div>
    );
  }
}
export default Content;
