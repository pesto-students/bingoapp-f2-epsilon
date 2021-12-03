import React from "react";

import { Button, Image, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Alert from "react-s-alert";

import Breadcrumbs from "../../Parts/Breadcrumbs/breadcrumbs";
import VideoPlayer from "../VideoPlayer/videoPlayer.js";
import { useAuth } from "../../Utilities/authContext";
import { addToMyPlaylist } from "../../Services/apiCalls";

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
  lineHeight: "60px",
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

function MovieDetail({ data }) {
  const { currentUser } = useAuth();

  const onAddingPlaylist = async (id) => {
    const { data, status } = await addToMyPlaylist({
      email: currentUser.email,
      movie: id,
    });
    Alert.success(data.message, {
      position: "top-right",
      effect: "slide",
      beep: false,
      timeout: 2000,
      offset: 0,
    });
  };

  return (
    <Segment clearing inverted>
      <Item.Group>
        <Item style={itemStyle}>
          <Breadcrumbs data={data} />
          <>
            <Item.Content style={imageStyle}>
              <Link to={`/videos/${data._id}`}>
                <VideoPlayer thumbnail={data.image} />
              </Link>
            </Item.Content>
            <Item.Content style={itemContentStyle}>
              <h1 style={movieTitle}>{data.name}</h1>
              <Item.Meta>{/* <Image src={data.rating} /> */}</Item.Meta>
              <Item.Meta
                className="flex"
                style={{ color: "white", alignItems: "baseline" }}
              >
                <Link to={`/videos/${data._id}`}>
                  <Button primary>Play Movie</Button>
                </Link>
                <div>
                  <h4
                    className="cursor"
                    onClick={() => onAddingPlaylist(data._id)}
                  >
                    ADD TO WATCHLIST
                  </h4>
                </div>
                <div>
                  <h5>SHARE</h5>
                </div>
              </Item.Meta>

              <Item.Meta className="movieSynopsis" style={movieSynopsis}>
                <div>
                  Language:{" "}
                  <span className="highlight-text">{data.language} </span>
                </div>
                <div>
                  Genere:{" "}
                  {data.categories && data.categories.length > 0
                    ? data.categories.map((category) => (
                        <span key={category._id} className="highlight-text">
                          {category.name},
                        </span>
                      ))
                    : ""}
                </div>
                <div>
                  Year: <span className="highlight-text">{data.year}</span>
                </div>
                <div>
                  Cast:{" "}
                  {data.cast && data.cast.length > 0
                    ? data.cast.map((cast) => (
                        <span key={cast} className="highlight-text">
                          {cast},
                        </span>
                      ))
                    : ""}
                </div>
              </Item.Meta>

              <Item.Description>{data.description}</Item.Description>
            </Item.Content>
          </>
        </Item>
      </Item.Group>
    </Segment>
  );
}

export default MovieDetail;
