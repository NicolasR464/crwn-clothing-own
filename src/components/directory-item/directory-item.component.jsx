import {
  DirectoryItemCont,
  BackgroundImg,
  Body,
} from "./directory-item.styles.jsx";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemCont onClick={onNavigateHandler}>
      <BackgroundImg imageUrl={imageUrl} />
      <Body className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemCont>
  );
};

export default DirectoryItem;
