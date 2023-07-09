import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: -10px;
  padding: 5px;
`;
const Imgbox = styled.div`
  width:200px;
  height:200px;
`
const ImageItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 5px;
  margin: 15px;

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; //텍스트 왼쪽 정렬을 위해 추가
  }

  img {
    width: 200px;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 10px;
  }

  .text-container {
    width: 100%;
    white-space: nowrap;
    text-align: left;
  }

  h3 {
    margin-top: 5px;
    margin-bottom: 5px;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
  }
`;

const Gallery = ({ setImageCount }) => {
  const [Info, setInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://gallery.jmoomin.com/imageAll`)
      .then((result) => {
        setInfo(result.data);
        setImageCount(result.data.length) //게시글 개수 설정하기
      })
      .catch((e) => {
        // console.log(e);
      });
  }, []);
  
  return (
    <GridContainer>
      {Info.map((info) => (
        <ImageItem key={info.id}>
            <div className='content-container'>
              <img src={info.imageURL} alt={info.imageName} onClick = {() => navigate(`/image/${info.id}`)}/>
              <Imgbox>
                <div className="text-container">
                  <h3>{info.imageName}</h3>
                  <p>{info.imageText}</p>
                </div>
              </Imgbox>
            </div>
        </ImageItem>
      ))}
    </GridContainer>
  );
};

export default Gallery;
