import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuClock3 } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import axios from "axios";

import { setRole, setname } from "../../store/authSlice";
import { setconsultantSessionName } from "../../store/consultsessionnameSlice";
import { ButtonBox } from "../common/Button";


const Clock = styled(LuClock3)`
  padding-bottom: 4px;
  vertical-align: middle;
`;

const Calendar = styled(IoCalendarOutline)`
  vertical-align: middle;
  padding-bottom: 4px;
`;

const H2 = styled.h2`
  font-family: "Noto Sans KR";
  font-size: 30px;
  padding-left: 8px;
`;

const Consulting = styled.div`
  width: 80%;
  height: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 5%;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  padding: 8px;
  text-align: left;
  width: 20%;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 8px;
  white-space: pre;
  color: #383838;
  font-family: "Noto Sans KR";
  font-size: 17px;
`;

const ButtonTd = styled.td`
  width: 15%;
  padding: 8px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
`;

const Button = styled(ButtonBox)`
  min-width: 154px;
  width: 50%;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-size: 16px;
  border-radius: 30px;
  margin: 0;
`;

const FinalButton = styled(Button)`
  background-color: black;
  border: 1px solid black;
`;

const MyConsulting = () => {
  const data = [
    {
      title: "뷰티 솔루션 컨설팅",
      time: "10:00",
      date: "01.19(금)",
      consulting_id: "1",
    },
  ];
  const { access_token } = useSelector((state) => state.auth.logonUser);
  const { name, role, id, nickname, imageUrl } = useSelector(
    (state) => state.auth.logonUser
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const consultantSessionName = useSelector(
    (state) => state.consultsessionname.consultantSessionName
  );

  const [isactive, Setisactive] = useState(null);

  const btnclick = async (consulting_id) => {
    try {
      const token = access_token; // 여기에 액세스 토큰을 설정합니다.


      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const baseurl = import.meta.env.VITE_APP_BASE_URL;

      const response = await axios.get(
        baseurl + "consultings/" + consulting_id,
        config
      );

      // 요청 성공 시 수행할 작업
      Setisactive(response.data.data_body.active);
      dispatch(setconsultantSessionName(consulting_id));
    } catch (error) {
      console.error("Error :", error);
      // alert('결제 실패');
    }
  };

  useEffect(() => {
    if (isactive === null) {
      // isactive가 null일 때는 아무것도 하지 않음
      return;
    }

    if (isactive) {
      dispatch(setRole("USER"));
      dispatch(setname(name));

      navigate("/OneToOneVideoChat");
    } else {
      alert("컨설턴트가 아직 방을 입장하지 않았습니다");
    }
  }, [isactive]);

  const [consultingData, setConsultingData] = useState([]); // 상태 초기화
  const accessToken = useSelector((state) => state.auth.logonUser.access_token);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const mydata = async () => {
    try {
      const baseurl = import.meta.env.VITE_APP_BASE_URL;

      // const response = await axios.get("http://i10c106.p.ssafy.io:8080/v1/users/myallconsultinglist", config);
      const response = await axios.get(
        baseurl + "users/myallconsultinglist",
        config
      );
      setConsultingData(response.data.data_body); // 데이터를 상태에 저장

    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };
  const [clearSteps, setClearSteps] = useState({});

  const judge = async (consulting_id) => {
    try {
      const baseurl = import.meta.env.VITE_APP_BASE_URL;
      const response = await axios.get(
        baseurl + `report/find/clear-step/${consulting_id}`,
        config
      );
      setClearSteps((prevSteps) => ({
        ...prevSteps,
        [consulting_id]: response.data.data_body,
      }));
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };
  useEffect(() => {
    mydata(); // 컴포넌트가 마운트될 때 mydata 함수 실행
  }, []);

  useEffect(() => {
    consultingData?.forEach((row) => {
      judge(row.consulting_id);
    });
  }, [consultingData]);

  const gofinal = async (consulting_id) => {
    navigate("/finalresult", { state: { value: { consultingId:consulting_id } } });
  };
  return (
    <Consulting>
      <H2>마이 컨설팅</H2>
      <hr />
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {consultingData &&
            consultingData.length > 0 &&
            consultingData?.map((row, index) => {
              const date = new Date(row.date + " " + row.time); // date와 time을 합쳐서 Date 객체 생성
              const formattedDate = format(date, "MM.dd(E)", { locale: ko });
              const formattedTime = format(date, "HH:mm");
              const clearStep = clearSteps[row.consulting_id];
              let btnText = "바로가기";
              let navigateTo = "";
              let navigateState = {};
              let handleClick = () => {};
              if (clearStep) {
                if (!clearStep.survey_clear && !clearStep.analysis_clear) {
                  btnText = "설문 바로가기";
                  navigateTo = `/firstsurvey`;
                  navigateState = {
                    state: { value: { consultingId: row.consulting_id } },
                  };
                  handleClick = () => navigate(navigateTo, navigateState);
                } else if (
                  clearStep.survey_clear &&
                  !clearStep.analysis_clear
                ) {
                  btnText = "AI분석 바로가기";
                  navigateTo = `/phototest`;
                  navigateState = {
                    state: { value: { consultingId: row.consulting_id } },
                  };
                  handleClick = () => navigate(navigateTo, navigateState);
                } else if (clearStep.survey_clear && clearStep.analysis_clear) {
                  btnText = "바로가기";
                  handleClick = () => btnclick(row.consulting_id);
                }
              }
              return (
                <Tr key={index}>
                  <Td>뷰티 솔루션 컨설팅</Td>
                  <Td>
                    <Calendar /> {formattedDate}
                    {"  "}|{"  "}
                    <Clock /> {formattedTime}
                  </Td>
                  <ButtonTd>
                    <FinalButton onClick={() => gofinal(row.consulting_id)}>
                      최종 결과 보고서
                    </FinalButton>
                  </ButtonTd>
                  <ButtonTd>
                    <Link to={`/review/${row.consultant_response.consultant_id}`} reloadDocument>
                      <Button>리뷰 작성</Button>
                    </Link>
                  </ButtonTd>
                  <ButtonTd>
                    <Button onClick={handleClick}>{btnText}</Button>
                  </ButtonTd>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Consulting>
  );
};

export default MyConsulting;
