import React from "react";

import { Button, Image, Item, Segment } from "semantic-ui-react";

import MovieRatingImage from "../../assets/rating.png";
import VideoPlayer from "../VideoPlayer/videoPlayer.js";

const imageStyle = {
  width: "500px",
  height: "auto",
  float: "right",
};

const itemStyle = {
  display: "revert",
  padding: "40px 0",
};

const itemContentStyle = {
  textAlign: "left",
};

const movieTitle = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "30px",
  lineHeight: "35px",
};

const movieSynopsis = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "20px",
  lineHeight: "23px",
  color: "#000000",
  padding: "30px 0",
};

function MovieDetail() {
  return (
    <Segment clearing inverted>
      <Item.Group>
        <Item style={itemStyle}>
          <h3 style={itemContentStyle}>
            Home {">>"} Movies {">>"} Tom Cruise Obliviation
          </h3>

          <Item.Content style={imageStyle}>
            <VideoPlayer/>
          </Item.Content>
          {/* <Item.Image src={MovieDetailImage} style={imageStyle} /> */}

          <Item.Content style={itemContentStyle}>
            <h1 style={movieTitle}>Tom Cruise Obliviation</h1>

            <Item.Meta>
              <Image src={MovieRatingImage} />
            </Item.Meta>

            <span className="highlight-text">Hindi | Comedy | 2015</span>

            <Item.Meta
              className="flex"
              style={{ color: "white", alignItems: "baseline" }}
            >
              <Button primary>Play Movie</Button>
              <div>
                <h4>ADD TO WATCHLIST</h4>
              </div>
              <div>
                <h5>SHARE</h5>
              </div>
            </Item.Meta>

            <Item.Meta className="movieSynopsis" style={movieSynopsis}>
              <div>
                Language: <span className="highlight-text">Hindi </span>
              </div>
              <div>
                Genere:
                <span className="highlight-text">
                  Comedy, Action, Bollywood
                </span>
              </div>
              <div>
                Year: <span className="highlight-text">2015</span>
              </div>
              <div>
                Artist: <span className="highlight-text">Naga Pesto</span>
              </div>
            </Item.Meta>

            <Item.Description>
              While running from a drug deal gone bad, Mike Ross, a brilliant
              young college-dropout, slips into a job interview with one of New
              York City's best legal closers, Harvey Specter. Tired of
              cookie-cutter law school grads, Harvey takes a gamble by hiring
              Mike on the spot after he recognizes his raw talent and
              photographic memory.
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}

export default MovieDetail;
