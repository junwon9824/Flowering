import styled from "styled-components";
import { Link } from "react-router-dom";
import Call from "../assets/Call.svg"
import Message from "../assets/Message.svg"
import Location from "../assets/Location.svg"

const FooterBox = styled.div`
  width: 100%;
  z-index: 0;
  height: 40%;
  background: #f5f5f5;
  display: flex;
  bottom: 0;
  flex-direction: column;
`;
const Path = styled.span`
  display: flex;
  width: 30%;
  height: 10%;
  font-family: "Poppins";
  font-weight: 500;
  padding: 3.5% 0% 2% 6%;
  justify-content: space-between;
  z-index:2;
`;

const Info = styled.div`
  font-family: "Poppins";
  width: 30%;
  height: 10%;
  display: flex;
  justify-content: start;
  margin: 0.5% 0% 0% 5%;
  align-items: center;
`;

const Image = styled.img`
  width: 10%;
  height: 70%;
`;

const Bottom = styled.div`
  text-align: center;
  font-family: Lexend Deca;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.2px;
`;
const State = styled.span`
  position: relative;
  left: 75%;
  bottom: 15%;
  font-family: Lexend Deca;
  font-size: 20px;
`;

const Footer = () => {
  return (
    <FooterBox>
      <Path>
        <Link to={"/beautyconsulting" } reloadDocument>Consulting</Link>
        <Link to={"#"} reloadDocument>Community</Link>
        <Link to={"#"}reloadDocument>Contents</Link>
        <Link to={'/faq'} reloadDocument>FAQ</Link>
      </Path>
      <Info>
        <Image src={Call} alt="Call" />
        <p>010-1232-1106</p>
      </Info>
      <Info>
        <Image src={Message} alt="Message" />
        <p>sail106@flowering.com</p>
      </Info>
      <Info>
        <Image src={Location} alt="Location" />
        <p>광주광역시 광산구 오선동 549-1</p>
      </Info>
      <Bottom>Flowering</Bottom>
      <State>We invite you to join our team.</State>
    </FooterBox>
  );
};

export default Footer;
