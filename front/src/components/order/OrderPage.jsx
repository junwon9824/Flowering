// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { ButtonBox } from "../common/Button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Avatar from "@mui/joy/Avatar";
// import FormLabel from "@mui/joy/FormLabel";
// import Radio, { radioClasses } from "@mui/joy/Radio";
// import RadioGroup from "@mui/joy/RadioGroup";
// import Sheet from "@mui/joy/Sheet";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// export const Title = styled.span`
//   width: 177px;
//   height: 63px;
//   flex-grow: 0;
//   font-size: 50px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   text-align: center;
//   color: #000;
//   margin-bottom: 50px;
// `;
// export const Filed = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 100px;
// `;

// export const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0;
// `;

// export const BtnList = styled.div`
//   width: 564px;
//   height: 60px;
//   flex-grow: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   gap: 30px;
//   padding: 0;
//   margin-top: 30px; // BtnList 상단에 마진 추가
// `;

// export const OrderTable = styled.div`
//   height: 151px;
//   align-self: stretch;
//   flex-grow: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   gap: 20px;
//   padding: 0;
// `;
// export const OrderSubTitleAndBar = styled.div`
//   height: 39px;
//   align-self: stretch;
//   flex-grow: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 10px;
//   padding: 0;
//   border-bottom: 1px solid #bcbcbc;
// `;
// export const OrderSubTitleBar = styled.div`
//   height: 29px;
//   align-self: stretch;
//   flex-grow: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   gap: 10px;
//   padding: 8px;
// `;
// export const OrderObject = styled.span`
//   height: 28px;
//   align-self: stretch;
//   flex-grow: 0;
//   font-size: 18px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.4;
//   letter-spacing: normal;
//   text-align: left;
//   color: #000;
// `;
// export const OrderUser = styled.div`
//   height: 60px;
//   align-self: stretch;
//   flex-grow: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   gap: 4px;
//   padding: 8px;
// `;
// export const OrderUserInfo = styled.span`
//   height: 28px;
//   align-self: stretch;
//   flex-grow: 0;
//   font-size: 16px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.4;
//   letter-spacing: normal;
//   text-align: left;
//   color: #000;
// `;
// export const StyledTable = styled.table`
//   width: 100%; // 필요에 따라 조정
//   border-collapse: collapse; // 테이블 셀 간의 간격 없애기

//   th,
//   td {
//     padding: 8px; // 셀 내부 여백
//     text-align: left; // 텍스트 정렬
//   }
//   th {
//     font-size: 18px;
//   }

//   // tbody의 첫 번째 행 위에 구분선 추가
//   thead th {
//     border-bottom: 1px solid #bcbcbc;
//   }
// `;

// const headers = [
//   {
//     text: "CONSULTANT",
//     value: "consultant_img",
//   },
//   {
//     text: "PRODUCT",
//     value: "item_name",
//   },
//   {
//     text: "PRICE",
//     value: "item_price",
//   },
// ];
// const items = [
//   {
//     consultant_img:
//       "https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize",
//     item_name: "LEINA 뷰티 솔루션 컨설팅",
//     item_price: "89,000",
//   },
// ];

// const userInfo = {
//   username: "김혜미",
//   email: "hyeinsuin@gmail.com",
// };

// const Order = () => {
//   const [selectedPaymentId, setSelectedPaymentId] = useState(null);
//   const baseurl = import.meta.env.VITE_APP_BASE_URL;
//   const handlePaymentSelectionChange = (selectedId) => {
//     setSelectedPaymentId(selectedId);
//   };
//   const navigate = useNavigate();
//   const { selectedid } = useSelector(state => state.auth)

//   useEffect(() => {
//     const jquery = document.createElement("script");
//     jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
//     const iamport = document.createElement("script");
//     iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
//     document.head.appendChild(jquery);
//     document.head.appendChild(iamport);
//     return () => {
//       document.head.removeChild(jquery);
//       document.head.removeChild(iamport);
//     };
//   }, []);

//   const requestPay = () => {
//     const { IMP } = window;
//     IMP.init("imp03878765");

//     IMP.request_pay(
//       {
//         // pg: ,
//         pg: selectedPaymentId,
//         pay_method: "card",
//         merchant_uid: new Date().getTime(),
//         name: "테스트 상품",
//         amount: 1,
//         buyer_email: "test@naver.com",
//         buyer_name: "김형민",
//         buyer_tel: "010-1234-5678",
//         buyer_addr: "서울특별시",
//         buyer_postcode: "123-456",
//       },
//       async (rsp) => {
//         try {
//           const { data } = await axios.post(`${baseurl}verifyIamport/` + rsp.imp_uid);
//           if (rsp.paid_amount === data.response.amount) {
//             navigate("/order-result");
//           } else {
//             alert("결제 실패");
//           }
//         } catch (error) {
//           console.error("Error while verifying payment:", error);
//           alert("결제 실패");
//         }
//       }
//     );
//   };

//   return (
//     <Filed>
//       <Content>
//         <Title>ORDER</Title>
//         <DataTable headers={headers} items={items} />
//         <OrderUserTable userInfo={userInfo} />
//         <OrderOptionTable onPaymentSelectionChange={handlePaymentSelectionChange} />
//         <BtnList>
//           <ButtonBox border={"#F28482"} background-color={"#ffffff"} color={"#F28482"} onClick={() => console.log("취소하기")}>
//             취소하기
//           </ButtonBox>
//           <ButtonBox onClick={requestPay}>결제하기</ButtonBox>
//         </BtnList>
//       </Content>
//     </Filed>
//   );
// };

// export default Order;

// export function DataTable({ headers, items = [] }) {
//   if (!headers || !headers.length) {
//     throw new Error("<DataTable /> headers is required.");
//   }
//   const headerKey = headers.map((header) => header.value);

//   return (
//     <StyledTable>
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th key={header.text}>
//               {header.text} {/* 컬럼명 바인딩 */}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((item, index) => (
//           <tr key={index}>
//             {headerKey.map((key) => (
//               <td key={key + index}>
//                 {/* key 값에 따라 조건부 렌더링을 수행, item_price일 경우 원화 기호 추가 */}
//                 {key === "item_price" ? (
//                   `₩ ${item[key]}` // item_price 값 앞에 원화 기호(₩) 추가
//                 ) : key === "consultant_img" ? (
//                   <img src={item[key]} alt="Consultant" style={{ width: "100px", height: "auto" }} />
//                 ) : (
//                   item[key]
//                 )}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </StyledTable>
//   );
// }

// export function OrderUserTable({ userInfo }) {
//   return (
//     <OrderTable>
//       <OrderSubTitleAndBar>
//         <OrderSubTitleBar>
//           <OrderObject>BUYER</OrderObject>
//         </OrderSubTitleBar>
//         <OrderUser>
//           <OrderUserInfo>{userInfo.username}</OrderUserInfo>
//           <OrderUserInfo>{userInfo.email}</OrderUserInfo>
//         </OrderUser>
//       </OrderSubTitleAndBar>
//     </OrderTable>
//   );
// }

// function OrderOptionTable({ onPaymentSelectionChange }) {
//   const [selectedValue, setSelectedValue] = useState(null);

//   const handleChange = (value) => {
//     setSelectedValue(value);
//     // 선택된 value를 기반으로 id 찾기 및 상위 컴포넌트로 ID 전달
//     const selectedOption = [kakaopay, inicis].find((option) => option.value === value);
//     const selectedId = selectedOption ? selectedOption.id : "";
//     onPaymentSelectionChange(selectedId);
//   };

//   return (
//     <OrderTable>
//       <OrderSubTitleAndBar>
//         <OrderSubTitleBar>
//           <OrderObject>PAYMENT</OrderObject>
//         </OrderSubTitleBar>

//         <IconsRadio selectedValue={selectedValue} onChange={handleChange} />
//       </OrderSubTitleAndBar>
//     </OrderTable>
//   );
// }
// const kakaopay = {
//   type: "radio",
//   id: "kakaopay.TC0ONETIME",
//   value: "카카오페이",
//   img: "src/assets/kakaoFavicon.png",
// };
// const inicis = {
//   type: "radio",
//   id: "html5_inicis.INIBillTst",
//   value: "KG이니시스",
//   img: "https://www.inicis.com/wp-content/themes/inicis2020/assets/images/sub07-010301.png",
// };

// function IconsRadio({ selectedValue, onChange }) {
//   // onChange 핸들러 수정
//   const handleChange = (event) => {
//     onChange(event.target.value); // 상위 컴포넌트의 handleChange 호출
//   };

//   return (
//     <RadioGroup
//       aria-label="platform"
//       value={selectedValue}
//       onChange={handleChange}
//       overlay
//       name="platform"
//       sx={{
//         flexDirection: "row",
//         gap: 2,
//         [`& .${radioClasses.checked}`]: {
//           [`& .${radioClasses.action}`]: {
//             inset: -1,
//             border: "3px solid",
//             borderColor: "primary.500",
//           },
//         },
//         [`& .${radioClasses.radio}`]: {
//           display: "contents",
//           "& > svg": {
//             zIndex: 2,
//             position: "absolute",
//             top: "-8px",
//             right: "-8px",
//             bgcolor: "background.surface",
//             borderRadius: "50%",
//           },
//         },
//       }}
//     >
//       {[kakaopay, inicis].map((option) => (
//         <Sheet
//           key={option.id} // key 값을 option의 id로 변경
//           variant="outlined"
//           sx={{
//             borderRadius: "md",
//             boxShadow: "sm",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 1.5,
//             p: 2,
//             minWidth: 120,
//           }}
//         >
//           <Radio id={option.id} value={option.value} checkedIcon={<CheckCircleRoundedIcon />} />
//           <Avatar variant="soft" size="sm" src={option.img} /> {/* src 속성을 option 객체에서 가져옴 */}
//           <FormLabel htmlFor={option.id}>{option.value}</FormLabel> {/* htmlFor와 내부 텍스트를 option 객체의 속성으로 변경 */}
//         </Sheet>
//       ))}
//     </RadioGroup>
//   );
// }
