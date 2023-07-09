import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
    background-color: white;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    margin: 10px;
    margin-top: 15px;
    border-radius: 100px;
    background-color: white;
`;

const TextBox = styled.div`
    flex: 1;
    margin-left: 25px;
    margin-top: 1px;
    display: flex;
    align-content: start;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    padding: 10px;
    max-width: 100%;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 900;
    margin: 0;
`;

const Body = styled.p`
    font-size: 1rem;
`;

const Profile = () => {
    const [imageCount, setImageCount] = useState(0);

    useEffect(() => {
        fetch('https://gallery.jmoomin.com/imageAll')
            .then(response => response.json()) // fetch 함수로 받아온 응답 객체 JSON 형태로 변환
            .then(data => setImageCount(data.length)) // JSON 형태로 변환된 데이터에 접근하여 이미지 개수 추출 
            .catch(error => console.log(error));
    }, []);

    return (
        <Container>
            <ProfileImage src="/오카리나 먹방.jpg" />
            <TextBox>
                <Title>likelion_11th_frontend</Title>
                <Body>멋쟁이사자처럼 11기 여러분의 소중한 추억들을 보관합니다❤️‍🔥</Body>
                <br />
                <Body>게시물 {imageCount}개</Body>
            </TextBox>
        </Container>
    );
};

export default Profile;
