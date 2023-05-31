import React, { useState, useEffect } from "react";
import "./Meme.css";

function Meme() {
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  function handleText(event) {
    const { name, value } = event.target;
    setMeme((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const [allMeme, setAllMeme] = useState([]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevState) => ({ ...prevState, randomImage: url }));
  }
  return (
    <div className="form">
      <input
        className="form--input"
        type="text"
        name="topText"
        placeholder="shut up"
        onChange={handleText}
        value={meme.topText}
      />
      <input
        className="form--input"
        type="text"
        name="bottomText"
        placeholder="and take my money"
        onChange={handleText}
        value={meme.bottomText}
      />
      <button onClick={getMemeImage} className="btn">
        Get a new meme 🖼️
      </button>
      <div className="meme">
        <img src={meme.randomImage} alt="" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}

export default Meme;
