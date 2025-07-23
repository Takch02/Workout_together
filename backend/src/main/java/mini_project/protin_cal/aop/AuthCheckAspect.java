package mini_project.protin_cal.aop;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import mini_project.protin_cal.dto.user.LoginDto;
import mini_project.protin_cal.dto.user.UserDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@Slf4j

public class AuthCheckAspect {

    @Around("@annotation(mini_project.protin_cal.aop.LoginCheck)")
    public Object loginCheck(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed();

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        if (result instanceof ResponseEntity<?> responseEntity) {
            Object body = responseEntity.getBody();
            log.info(body.toString());
            if (body instanceof UserDto userDto) {
                request.getSession().setAttribute("user_id", userDto.getUser_id());
                request.getSession().setAttribute("user_pw", userDto.getUser_pw());
                log.info("Session -> user id {} nickname {}", userDto.getUser_id(), userDto.getNickname());
            }
        }
        return result;
    }
}
