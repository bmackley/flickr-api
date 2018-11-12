import React, { Component } from "react";
import ReactDOM from "react-dom";
class Content extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  async componentDidMount() {
    const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=2`);
    const jsonResponse = await response.json();
    console.log("json resonse", jsonResponse)
    this.setState({ data: jsonResponse });
  }
  render() {
    return (
      <div className="contentArea">
      </div>
    );
  }
}
export default Content;
