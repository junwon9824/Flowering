import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectedTime } from "../../store/selectedSlice";

const StyledLabel = styled.label`
  display: inline-block;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
  margin-right: ${props => props['margin-right'] || '0px'};
  text-align: center;
  line-height: 40px;
  &:hover {
    cursor: pointer;
  }
  font-size: 20px;
  font-family: "Lexend Deca";
`;

const StyledButton = styled.input`
  display: none;
  &:checked + ${StyledLabel} {
    background: #F28482;
    border: 1px solid black;
    color: white;
  }
`;

const RadioButton = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  // 라디오 버튼 클릭 시 상태 토글하는 함수
  const handleButtonClick = () => {
    setIsChecked(!isChecked);
    dispatch(setSelectedTime(props.value))
  };
  return (
    <>
      <StyledButton
        type="radio"
        id={props.value}
        value={props.value}
        onClick={handleButtonClick} // 변경
        checked={isChecked}
        name={props.name}
      />
      <StyledLabel htmlFor={props.value} margin-right={props['margin-right']} >{props.value}</StyledLabel>
    </>
  );
};

export default RadioButton;
