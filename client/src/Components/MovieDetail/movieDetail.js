import React from "react";

import { Button, Image, Item, Segment } from "semantic-ui-react";
import { Link, useParams, useHistory } from "react-router-dom";

import Breadcrumbs from "../../Parts/Breadcrumbs/breadcrumbs";
import VideoPlayer from "../VideoPlayer/videoPlayer.js";
import { movieDetails,movies } from "../../Utilities";

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

function MovieDetail() {
  const { videoId } = useParams();
  const thumbnailUrl=movies.filter(movie=>movie.id===parseInt(videoId))
  console.log("videoId", videoId,movies,thumbnailUrl[0].thumbnail);
  return (
    <Segment clearing inverted>
      <Item.Group>
        <Item style={itemStyle}>
          <Breadcrumbs />
          {movieDetails.map((data, key) => (
            <>
              <Item.Content key={key} style={imageStyle}>
                <Link to={`/videos/${videoId}`}>
                  <VideoPlayer thumbnail={thumbnailUrl[0].thumbnail} />
                </Link>
              </Item.Content>
              <Item.Content style={itemContentStyle}>
                <h1 style={movieTitle}>{data.name}</h1>

                <Item.Meta>
                  <Image src={data.rating} />
                </Item.Meta>

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
                    Language:{" "}
                    <span className="highlight-text">{data.language} </span>
                  </div>
                  <div>
                    Genere: <span className="highlight-text">{data.genre}</span>
                  </div>
                  <div>
                    Year: <span className="highlight-text">{data.year}</span>
                  </div>
                  <div>
                    Artist:{" "}
                    <span className="highlight-text">{data.artist}</span>
                  </div>
                </Item.Meta>

                <Item.Description>{data.description}</Item.Description>
              </Item.Content>
            </>
          ))}
        </Item>
      </Item.Group>
    </Segment>
  );
}

export default MovieDetail;
