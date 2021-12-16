import React, { useState,useEffect } from "react";

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
  padding:2rem 10px;
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
text-align:left;
`;

// const initState={
//   obj_content:'',
// }
export default function NewMovie() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");


  const pickVideo = (event) => {
    setVideo(event.target.files[0]);
  };

  const uploadVideo = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("video_name", video, video.name);
    const { data, status } = await uploadObject(formdata);
    // if (status === 200) onUploaded(data);
  };

  const onUploaded = (data) => {
    
  };

  return (
      <UploadWrapper>
      <Header>Upload a Movie</Header>
        <InputWrapper>
          <Input
            type="file"
            name="file"
            accept="video/mp4"
            onChange={pickVideo}
          />
          <Uploader
            src={video ? URL.createObjectURL(video) : UploadIcon}
            alt="uploader logo"
          />
        </InputWrapper>
        {formErrors && <ErrorField err={formErrors} />}
        {video?loading ? (
          <div>Loading</div>
        ) : (
          <Button  width="auto" name="Upload" onClick={uploadVideo} />
        ):''}
      </UploadWrapper>
  );
}
