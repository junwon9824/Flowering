package com.sail.back.consulting.model.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
//import com.sail.back.consultant.model.entity.Consultant;
import com.sail.back.consultant.model.entity.Consultant;
import com.sail.back.user.model.entity.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Builder
public class ConsultingCreateResponse  {

    private User user;

    private Consultant consultant;


    private LocalDateTime  time; //예약을 몇시에 할건지

    private String request;//요청사항

    //세션아이디
    private String sessionId;

}
