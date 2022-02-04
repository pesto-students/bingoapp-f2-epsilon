import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import $ from "jquery";

import CategoryList from "../../Components/CategoryCardList/categoryList";
import MovieSlider from "../../Components/MovieSlider/movieSlider";
import MovieCarousel from "../../Components/MovieCarousel/movieCarousel";
import {
  getAllMovies,
  getPlaylistMovies,
  getAllCategories,
  getPreviouslyWatchedMovies,
} from "../../Services/apiCalls";
import Loader from "../../Parts/Loader/loader";
import { useAuth } from "../../Utilities/authContext";

const PageWrapper = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const HeroSection = styled.section`
  display: flex;
  margin: 0px auto;
  padding: 30px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px;
  }
`;
const SliderSection = styled.section`
  text-align: left;
  margin: 20px 0;
`;

const SingleColumn = styled.div`
  width: ${(props) => (props.width ? props.width : "50%")};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CategoryHeading = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  > span {
    color: #fdf309;
  }
  @media (max-width: 768px) {
    margin-top: 30px !important;
  }
`;

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [moviesData, setMoviesData] = useState("");
  const [playListsData, setPlayListsData] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [recommendData, setRecommandedData] = useState("");

  const { currentUser } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    getMoviesData();
    getPlaylists();
    getCategories();
    getRecommandations();
  }, []);

  const getMoviesData = async (page) => {
    const { data, status } = await getAllMovies(page);
    if (status === 200) {
      setMoviesData(data);
    } else {
      navigate("/login");
    }
  };

  const getPlaylists = async () => {
    const { data, status } = await getPlaylistMovies({
      email: currentUser.email,
    });
    if (status === 200) {
      const newData = data.docs.map((movie) => movie.movie);
      setPlayListsData({ ...data, docs: newData });
    } else {
      navigate("/login");
    }
  };

  const getRecommandations = async () => {
    const { data, status } = await getPreviouslyWatchedMovies({
      email: currentUser.email,
    });
    if (status === 200) {
      setRecommandedData(data);
    } else {
      navigate("/login");
    }
  };

  const getCategories = async () => {
    const { data, status } = await getAllCategories();
    if (status === 200) {
      setCategoriesData(data);
      setLoading(false);
    } else {
      navigate("/login");
    }
  };

  const onScroll = (cls) => {
    var $elem = $(cls);
    var newScrollLeft = $elem.scrollLeft(),
      width = $elem.width(),
      scrollWidth = $elem.get(0).scrollWidth;
    var offset = 0;
    if (scrollWidth - newScrollLeft - width < 0.4) {
      getNextPageData(cls);
    }
  };

  const getNextPageData = (name) => {
    switch (name) {
      case ".new-movies":
        getNewMoviesNextPage();
        break;
      case ".playlist-movies":
        getPlaylistsNextPage();
        break;
      case ".previous-movies":
        getPreviousMoviesNextPage();
        break;
      default:
    }
  };

  const getNewMoviesNextPage =async() => {
    const { hasNextPage, page } = moviesData;
    if (hasNextPage) {
      const { data, status } = await getAllMovies(page+1);
      if (status === 200) {
        let arr=[...moviesData.docs]
        arr.push(...data.docs)
        const newData={...data,docs:arr}
        console.log('newData',newData)
        setMoviesData(newData);
      } else {
        navigate("/login");
      }
    }
  };

  const getPlaylistsNextPage =async () => {
    const { hasNextPage, page } = playListsData;
    if (hasNextPage) {
      const { data, status } = await getPlaylistMovies({
        email: currentUser.email,
        page:page+1
      });
      if (status === 200) {
        let arr=[...playListsData.docs]
        arr.push(...data.docs)
        const newData={...data,docs:arr}
        console.log('newData',newData)
        setPlayListsData(newData);
      } else {
        navigate("/login");
      }
    }
  };

  const getPreviousMoviesNextPage =async () => {
    const { hasNextPage, page } = recommendData;
    if (hasNextPage) {
      const { data, status } = await getPreviouslyWatchedMovies({
        email: currentUser.email,
        page:page+1
      });
      if (status === 200) {
        let arr=[...recommendData.docs]
        arr.push(...data.docs)
        const newData={...data,docs:arr}
        console.log('newData',newData)
        setRecommandedData(newData);
      } else {
        navigate("/login");
      }
    }
  };

  const carouselData = moviesData && moviesData.docs ? moviesData.docs : [];
  const recommendMovies =
    recommendData && recommendData.docs ? recommendData.docs : [];
  const playlistMovies =
    playListsData && playListsData.docs ? playListsData.docs : [];

  return (
    <PageWrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeroSection>
            <SingleColumn width="63%">
              <MovieCarousel images={carouselData} />
            </SingleColumn>
            <SingleColumn width="37%">
              <CategoryHeading>
                Choose from tons of <span>Categories</span> to Watch
                <CategoryList list={categoriesData} />
              </CategoryHeading>
            </SingleColumn>
          </HeroSection>
          <SliderSection>
            <h3>Newly released movies</h3>
            <MovieSlider
              classname="new-movies"
              onScroll={() => onScroll(".new-movies")}
              data={carouselData}
            />
            <h3>My Playlists</h3>
            <MovieSlider
              classname="playlist-movies"
              onScroll={() => onScroll(".playlist-movies")}
              data={playlistMovies}
            />
            <h3>Based on previous watch</h3>
            <MovieSlider
              classname="previous-movies"
              onScroll={() => onScroll(".previous-movies")}
              data={recommendMovies}
            />
          </SliderSection>
        </>
      )}
    </PageWrapper>
  );
}
