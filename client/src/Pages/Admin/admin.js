import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import NewCtegory from "../../Components/NewCategory/newCtegory";
import NewMovie from "../../Components/NewMovie/newMovie";
import Table from "../../Components/Table/table";
import { getAllCategories, getAllMovies } from "../../Services/apiCalls";
import Loader from "../../Parts/Loader/loader";
// import { useAuth } from "../../Utilities/authContext";

const PageWrapper = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;
`;
const H3 = styled.h3`
  color: yellow;
  text-align: left;
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  cursor: pointer;
  outline: none;
  min-width: 200px;
  border-radius: 10px;
  padding: 10px 15px;
  color: white;
  border: 2px solid #000;
  background: transparent;
`;
export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [data, setMoviesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isMovie, setNewMovie] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    getMoviesData();
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data, status } = await getAllCategories();
    if (status === 200) {
      const newData = data.map((x, i) => {
        return { S_no: i + 1, ...x };
      });
      setCategoriesData(newData);
      setLoading(false);
    } else {
      //   navigate("/login");
    }
  };

  const getMoviesData = async (page) => {
    const { data, status } = await getAllMovies(page);
    if (status === 200) {
      const newData = data.docs.map((x, i) => {
        return {
          S_no: i + 1,
          name: x.name,
          id: x._id,
          video_name: x.video_name,
          //   description: x.description,
          //   image: x.image,
          language: x.language,
        };
      });
      setMoviesData({ ...data, docs: newData });
    } else {
      //   navigate("/login");
    }
  };

  const onNewCategory = () => {
    setNewMovie(false);
    onOpenModal();
  };

  const onNewMovie = () => {
    setNewMovie(true);
    onOpenModal();
  };

  const onUpdateCategoryTable=async()=>{
      onCloseModal()
      getCategories()
  }

  return (
    <PageWrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlexWrapper>
            <H3>Category Lists</H3>
            <Button onClick={onNewCategory}>+ Add new category</Button>
          </FlexWrapper>
          <Table data={categoriesData} />
          <FlexWrapper>
            <H3>Movie Lists</H3>
            <Button onClick={onNewMovie}>+ Add new movie</Button>
          </FlexWrapper>
          <Table data={data.docs} />
        </>
      )}
      <Modal showCloseIcon={false} open={open} onClose={onCloseModal} center>
        {isMovie?<NewMovie/>:<NewCtegory  success={onUpdateCategoryTable} />}
      </Modal>
    </PageWrapper>
  );
}
