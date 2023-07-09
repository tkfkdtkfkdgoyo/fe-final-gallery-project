import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ImageDetail = () => {
  const { imageId } = useParams();
  const [imageInfo, setImageInfo] = useState([]);
  const [commentsInfo, setCommentsInfo] = useState([]);
  const [newComment, setNewComment] = useState('');
  const commentsListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://gallery.jmoomin.com/imageAll`)
      .then((result) => {
        setImageInfo(result.data.filter((object) => object.id === imageId));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://gallery.jmoomin.com/${imageId}/comments`)
      .then((result) => {
        setCommentsInfo(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://gallery.jmoomin.com/${imageId}/comments`, { commentBody: newComment })
      .then((response) => {
        setCommentsInfo([...commentsInfo, response.data]);
        setNewComment('');
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`https://gallery.jmoomin.com/${imageId}/comments/${commentId}`)
      .then((response) => {
        setCommentsInfo(commentsInfo.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scrollToBottom = () => {
    if (commentsListRef.current) {
      commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
    }
  };

  if (imageInfo.length === 0) {
    return null;
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const DetailBox = styled.div`
    width: 500px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const ImageContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
  `;

  const Image = styled.img`
    width: 100%;
    height: auto;
  `;

  const CommentForm = styled.form`
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: flex-start;
  `;

  const CommentTextarea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 8px;
    font-size: 15px;
    border-radius: 4px;
    margin-right: 8px;
  `;

  const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: -220px;
  `;

  const CommentText = styled.p`
    margin-right: 10px;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
  `;

  return (
    <Container>
      <DetailBox>
        <h1>{imageInfo[0].imageName}</h1>
        <p>{imageInfo[0].imageText}</p>
      </DetailBox>
      <ImageContainer>
        <Image src={imageInfo[0].imageURL} alt={imageInfo[0].imageName} />
      </ImageContainer>
      <hr />
      <CommentForm onSubmit={handleCommentSubmit}>
        <CommentTextarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요..."
        />
        <ButtonContainer>
          <button type="submit">게시</button>
        </ButtonContainer>
      </CommentForm>
      <ul ref={commentsListRef}>
        {commentsInfo.map((comment) => (
          <CommentContainer key={comment.id}>
            <CommentText>
              <strong>익명:</strong> {comment.commentBody}
            </CommentText>
            <ButtonContainer>
              <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
            </ButtonContainer>
          </CommentContainer>
        ))}
      </ul>
    </Container>
  );
};

export default ImageDetail;
