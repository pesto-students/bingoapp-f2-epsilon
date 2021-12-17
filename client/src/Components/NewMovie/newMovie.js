import React, { useState, useEffect } from "react";

import styled from "styled-components";
import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
} from "video-react";
import VideoToThumb from "video-thumb-generator";

import { uploadObject } from "../../Services/apiCalls";
import Button from "../Button/button";
import UploadIcon from "../../assets/uploadImg.png";
import ErrorField from "../ErrorField/errorField";
import NewMetaData from "../NewMetaData/newMetaData";

const Uploader = styled.img`
  cursor: pointer;
  width: 60%;
  object-fit: contain;
`;
const UploadWrapper = styled.div`
  max-width: 565px;
  text-align: center;
  padding: 2rem 10px;
`;
const Input = styled.input`
  position: absolute;
  left: 0;
  right: -0px;
  top: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  opacity: 0;
`;
const InputWrapper = styled.div`
  position: relative;
  width: 500px;
`;
const Header = styled.h3`
  text-align: left;
`;
const FormWrapper = styled.div`
  margin: 20px 0;
  min-width: 300px;
`;

export default function NewMovie(props) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [movie, setMovie] = useState("");
  const [isUploaded, setUploaded] = useState(false);
  const [thumbnail, setThumbnail] = useState('');


  const pickVideo = (event) => {
    setVideo(event.target.files[0]);
  };


  // const getThumbnail=(file)=>{
  //   const videoToThumb = new VideoToThumb(file);
  //   videoToThumb
  //     .load()
  //     .xy([0, 0])
  //     .size([480, 360])
  //     .positions([15])
  //     .type('base64')
  //     .error(function (err) {
  //       console.log('thub err',JSON.stringify(err));
  //     })
  //     .done(function (imgs) {
  //       setThumbnail(imgs[0])
  //     });
  // }

  const uploadVideo = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("video_name", video, video.name);
    const { data, status } = await uploadObject(formdata);
    if (status === 201) {
      if (data.status === 1) {
        setMovie(data.location);
        setUploaded(true);
        setLoading(false);
      }
    }
    // if (status === 200) onUploaded(data);
  };

  const onUploaded = (data) => {};

  return (
    <UploadWrapper>
      <Header>Upload a Movie</Header>
      {!isUploaded ? (
        <>
        <InputWrapper>
          <Input
            type="file"
            name="file"
            accept="video/mp4"
            onChange={pickVideo}
          />
          {!video ? (
            <Uploader src={UploadIcon} alt="uploader logo" />
          ) : (
            <Player playsInline controls src={URL.createObjectURL(video)}>
              <ControlBar>
                <ReplayControl seconds={5} order={2.1} />
                <ForwardControl seconds={5} order={3.1} />
                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
              </ControlBar>
            </Player>
          )}
          
        </InputWrapper>
        {formErrors && <ErrorField err={formErrors} />}
          {video ? (
            loading ? (
              <div>Loading</div>
            ) : (
              <Button width="auto" name="Upload" onClick={uploadVideo} />
            )
          ) : (
            ""
          )}
        </>
      ) : (
        <NewMetaData data={{movie:movie}} categories={props.options} />
      )}
    </UploadWrapper>
  );
}
