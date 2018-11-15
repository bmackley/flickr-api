import React, { Component } from "react";
import Parser from 'html-react-parser';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.props = props;

  }
  render() {
    return (
      <div key={this.props.photo.id} className="photo-card">
        <img src= {this.props.photo.url} alt="title" />
        <figcaption className="image-title">{this.props.photo.title} </figcaption>
        <p className="image-description">{Parser(this.props.photo.description._content)}</p>
      </div>
    );
  }
}
export default Card;
