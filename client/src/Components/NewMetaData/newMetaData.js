import React, { useEffect, useState } from "react";

import styled from "styled-components";
import MultipleValueTextInput from "react-multivalue-text-input";
import Alert from "react-s-alert";

import InputGroup from "../InputGroup/inputGroup";
import Button from "../Button/button";
import ErrorField from "../ErrorField/errorField";
import Dropdown from "../Dropdown/dropdown";
import { validateInputs } from "../../Utilities";
import { createMovies } from "../../Services/apiCalls";
import UploadIcon from "../../assets/uploadImg.png";
import { uploadObject,uploadImage } from "../../Services/apiCalls";
import Loader from "../Loader/loader";

// styling starts
const Flexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  margin: 10px 0px;
  //   max-width: 440px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-column-gap: ${(props) => (props.gap ? props.gap : "30px")};
  grid-template-columns: ${(props) =>
    props.columns ? props.columns : "auto auto"};

  @media (max-width: 1060px) {
    display: block;
  }
`;

const Uploader = styled.img`
  cursor: pointer;
  width: 60%;
  object-fit: contain;
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
// styling ends
const initState = {
  name: "",
  video_name: "",
  image: "",
  duration: "",
  language: "",
  year: "",
  categories: "",
  cast: [],
  description: "",
};
export default function NewMetaData(props) {
  const [formErrors, setFormErrors] = useState("");
  const [fieldErrors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieObj, setMovieObj] = useState(initState);

  const {
    name,
    duration,
    language,
    year,
    cast,
    description,
    categories,
    image,
  } = movieObj;

  useEffect(() => {
    const obj = {
      ...movieObj,
      video_name: props.data.movie,
    };
    setMovieObj(obj);
  }, []);

  // on FormSubmission starts

  // input change function starts
  const inputChange = (event) => {
    const obj = { ...movieObj };
    const { name, value } = event.target;
    obj[name] = value;
    setMovieObj(obj);
  };
  // input change function ends

  const dropdownChange = (val) => {
    const obj = { ...movieObj };
    obj["categories"] = val;
    setMovieObj(obj);
  };

  const onCastAdd = (val) => {
    console.log("vl", val);
    const obj = { ...movieObj };
    let castArr = obj.cast;
    if (castArr.indexOf(val) === -1) {
      castArr.push(val);
    }
    obj["cast"] = castArr;
    setMovieObj(obj);
  };

  const onCastDelete = (val) => {
    const obj = { ...movieObj };
    let castArr = obj.cast.filter((x) => x !== val);
    obj["cast"] = castArr;
    setMovieObj(obj);
  };

  const onSubmit = () => {
    console.log("movies", movieObj);
    const isValid = validateInputs({ ...movieObj });
    if (isValid) {
      setFormErrors("");
      setLoading(true);
      onFormSubmission();
    } else {
      setLoading(false);
      setFormErrors("Please fill all the required fields");
    }
  };

  const onFormSubmission = async () => {
    const req = { ...movieObj };
    let newCategories = req.categories.map((x) => x.value);
    console.log("categories", newCategories);
    const { data, status } = await createMovies({
      ...req,
      categories: newCategories,
    });
    if(status===201){
      Alert.success(data.message, {
        position: "top-right",
        effect: "slide",
        beep: false,
        timeout: 2000,
        offset: 0,
      });
      props.success()
    }
  };

  const pickVideo = (event) => {
    uploadVideo(event.target.files[0]);
  };

  const uploadVideo = async (file) => {
    const formdata = new FormData();
    formdata.append("video_name", file);
    const { data, status } = await uploadImage(formdata);
    if (status === 201) {
      if (data.status === 1) {
        const obj = { ...movieObj };
        obj["image"] = data.location;
        setMovieObj(obj);
      }
    }
    // if (status === 200) onUploaded(data);
  };

  return (
    <FormWrapper>
      <InputGroup
        name="Title*"
        input={{
          placeholder: "Movie Title",
          value: name,
          name: "name",
          onChange: inputChange,
        }}
      />
      <GridContainer columns="auto auto">
        <InputGroup
          name="Duration"
          input={{
            placeholder: "Duration",
            onChange: inputChange,
            name: "duration",
            value: duration,
            maxLength: "3",
          }}
        />
        <InputGroup
          name="Movie release time*"
          input={{
            placeholder: "dd/mm/yyyy",
            onChange: inputChange,
            name: "year",
            value: year,
            type: "date",
          }}
        />
      </GridContainer>
      <InputGroup
        name="Description*"
        input={{
          placeholder: "Description",
          onChange: inputChange,
          name: "description",
          value: description,
        }}
      />
      <InputGroup
        name="Language*"
        input={{
          placeholder: "Language",
          onChange: inputChange,
          name: "language",
          value: language,
        }}
      />
      <MultipleValueTextInput
        onItemAdded={onCastAdd}
        onItemDeleted={onCastDelete}
        label="Casts"
        name="cast"
        placeholder="Enter movie casts"
      />
      <Dropdown
        placeholder="Select categories"
        options={props.categories}
        value={categories}
        onChange={dropdownChange}
        isMulti={true}
      />
      <InputWrapper>
        <Input
          type="file"
          name="file"
          accept="image/png,image/jpg,image/jpeg"
          onChange={pickVideo}
        />
        <Uploader src={image ? image : UploadIcon} alt="uploader logo" />
      </InputWrapper>
      <GridContainer gap="5px" columns="repeat(3,1fr)"></GridContainer>
      {formErrors && <ErrorField err={formErrors} />}
      <Flexbox>
        {loading ? (
          <Loader/>
        ) : (
          <>
            <Button
              disabled={fieldErrors}
              width="auto"
              name="Submit"
              onClick={onSubmit}
            />
          </>
        )}
      </Flexbox>
    </FormWrapper>
  );
}
