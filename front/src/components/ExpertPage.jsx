import styled from "styled-components";
import MyInfo from "./mypage/MyInfo";
import ExpertConsulting from "./mypage/ExpertConsulting";
import ExpertInfoNProfile from "./mypage/ExpertInfoNProfile";
import { Page } from "./common/Page";
import { useSelector } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
const BackPage = styled(Page)`
  height: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.span`
  display: flex;
  font-family: Lexend Deca;
  font-size: 56px;
  margin-top: 12%;
  justify-content: center;
  margin-bottom: 5%;
`;

const Margin = styled.div`
  margin-bottom: 10%;
`;

const ExpertPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const User = useSelector(
    (state) => state.auth.logonUser
  );
  const navigate = useNavigate();
  const { routeid } = useParams();
  const isAccessible = (Number(routeid) === User.id && isAuthenticated && User.role ==='CONSULTANT')


  useEffect(() => {
    if (!isAccessible) {
      alert('잘못된 접근입니다.'); // 시스템 경고창을 띄웁니다.
      navigate('/'); // 홈으로 리다이렉트합니다.
    }
  }, [isAccessible, navigate]);


  return (
    <BackPage>
      <Header>EXPERT PAGE</Header>
      <MyInfo />
      <ExpertInfoNProfile />
      <ExpertConsulting />
      <Margin />
    </BackPage>
  );
};

export default ExpertPage;
