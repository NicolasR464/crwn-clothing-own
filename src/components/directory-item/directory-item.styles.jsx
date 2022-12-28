import styled from "styled-components";

export const BackgroundImg = styled.div`
  //I'm going to string interpolate because this is just a back tick string. So now I can actually access the different props that get received in just the way that you would like a component. You write a function and what this will be is prompts, which means that we can structure off image URL because that is being passed in as a prop. And now what we can do is we can return back a string that says your URL, wrapping the image URL.
  background-image: ${({ imageUrl }) => `url(${imageUrl} )`};
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const Body = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  &:hover {
    opacity: 0.9;
  }
  h2 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: uppercase;
  }
  p {
    font-weight: lighter;
    font-size: 16px;
  }
`;

export const DirectoryItemCont = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    cursor: pointer;

    & ${BackgroundImg} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Body} {
      opacity: 0.9;
    }
  }
`;
