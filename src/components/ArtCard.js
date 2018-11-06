import React from 'react';
import '../stylesheets/ArtCard.css'

const ArtCard = ({ artData }) => {
  return (
    <div className="art-card">
      {console.log('Art Data: ', artData)}
      <img src={artData.img_url} alt={artData.title}/>
    </div>
  )
}

export default ArtCard;
