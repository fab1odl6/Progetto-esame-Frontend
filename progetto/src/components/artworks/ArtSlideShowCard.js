import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setArt, removeArtworkUser, addArtworkUser } from "../../store";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import LoginModals from "../modals/loginModals";
import styled from "styled-components";

const ArtContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  margin-bottom: 20px;
  height: 500px;
`;

const ArtImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const ArtContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50px;
  box-sizing: border-box;
  color: black;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3em;
  cursor: pointer;
`;

const Author = styled.div`
  margin-top: 10px;
  font-size: 2em;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 4em;
  cursor: pointer;
`;


function ArtSlideShowCard({ artwork }) {

  const redcolorClass = "text-red-500";
  

  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const { index } = useSelector((state) => state.artworks);
  const { logged, artworks } = useSelector((state) => state.users);
  const [favoriteState, setFavoriteState] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClickHeart = function () {
    if (logged) {
      if (favoriteState) {
        dispatch(removeArtworkUser(artwork));
      } else {
        dispatch(addArtworkUser(artwork));
      }
      setFavoriteState(!favoriteState);
    } else {
      setModal(true);
    }
  };

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  const handleClickDetails = function () {
    dispatch(setArt(artwork));
    navigate("/artworkDetails");
  };

  useEffect(() => {
    if (logged) {
      if (artworks.find((item) => item.id === artwork.id)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [index, logged]);

  return (
    <ArtContainer>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <ArtImage
        src={artwork.image}
        alt={artwork.title}
        onClick={handleClickDetails}
      />
      <ArtContent>
        <TitleContainer>
          <div>
            <Title onClick={handleClickDetails}>{artwork.title}</Title>
            {artwork.authorName ? (
              <Author>{artwork.authorName}</Author>
            ) : (
              <Author>Unknown Author</Author>
            )}
          </div>
          <FavoriteIcon>
            {favoriteState ? (
              <FaHeart className={redcolorClass} onClick={handleClickHeart} />
            ) : (
              <FaRegHeart className={redcolorClass} onClick={handleClickHeart} />
            )}
          </FavoriteIcon>
        </TitleContainer>
      </ArtContent>
    </ArtContainer>
  );
}

export default ArtSlideShowCard;
