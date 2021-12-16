import React, { useEffect, useState } from "react";

import styled from "styled-components";
import MultipleValueTextInput from "react-multivalue-text-input";

import InputGroup from "../InputGroup/inputGroup";
import Button from "../Button/button";
import ErrorField from "../ErrorField/errorField";

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
// styling ends
const initState = {
  name: "",
  video_name: "",
  image: "",
  duration: "",
  language: "",
  year: "",
  categories: "",
  cast: "",
  description: "",
};
export default function NewMetaData() {
  const [formErrors, setFormErrors] = useState("");
  const [fieldErrors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieObj, setMovieObj] = useState(initState);

  const { name, duration, language, year, cast, description, categories } =
    movieObj;

  const onContinue = async () => {};

  // on FormSubmission starts

  // input change function starts
  const inputChange = (event) => {};
  // input change function ends

  return (
    <FormWrapper>
      <InputGroup
        name="Title"
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
          name="Movie release time"
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
        name="Description"
        input={{
          placeholder: "Description",
          onChange: inputChange,
          name: "description",
          value: description,
        }}
      />
      <InputGroup
        name="Language"
        input={{
          placeholder: "Language",
          onChange: inputChange,
          name: "language",
          value: language,
        }}
      />
      <MultipleValueTextInput
        onItemAdded={(item, allItems) => console.log(`Item added: ${item}`)}
        onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
        label="Casts"
        name="cast"
        placeholder="Enter movie casts"
      />
      <GridContainer gap="5px" columns="repeat(3,1fr)"></GridContainer>
      {formErrors && <ErrorField err={formErrors} />}
      <Flexbox>
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Button
              disabled={fieldErrors}
              width="auto"
              name="Submit"
              onClick={onContinue}
            />
          </>
        )}
      </Flexbox>
    </FormWrapper>
  );
}
