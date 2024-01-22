package com.sail.back.consulting.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ConsultingErrorCode {
    NOT_EXISTS_CONSULTANT("존재하지 않는 상담 입니다.", HttpStatus.BAD_REQUEST),
    NOT_EXISTS_TIME("해당 시간에 상담이 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN("이미 상담이 존재합니다.", HttpStatus.BAD_REQUEST),
    IS_CONSULTANT("컨설턴트는 상담을 신청할수 없습니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
