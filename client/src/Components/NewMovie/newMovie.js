import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { uploadObject } from "../../Services/apiCalls";
import Button from "../Button/button";
import UploadIcon from "../../assets/uploadImg.png";
import ErrorField from "../ErrorField/errorField";
const Uploader = styled.img`
  cursor: pointer;
  width: 100%;
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
const initState={
    name: '',
    video_name: '',
    image: '',
    duration: '',
    language: '',
    year: '',
    categories: '',
    cast: '',
    description: '',
}
export default function NewMovie() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [movie, setMovie] = useState("");
  const [movieObj, setMovieObj] = useState(initState);
  const [isUploaded, setUploaded] = useState(false);

  const pickVideo = (event) => {
    setVideo(event.target.files[0]);
  };

  const uploadVideo = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("video_name", video, video.name);
    const { data, status } = await uploadObject(formdata);
    if (status === 200) {
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
        <InputWrapper>
          <Input
            type="file"
            name="file"
            accept="video/mp4"
            onChange={pickVideo}
          />
          {video?<Uploader
            src={UploadIcon}
            alt="uploader logo"
          />:''}
        </InputWrapper>
      ) : (
        <FormWrapper>

        </FormWrapper>
      )}
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
    </UploadWrapper>
  );
}
