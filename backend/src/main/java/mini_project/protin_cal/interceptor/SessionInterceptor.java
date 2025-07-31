package mini_project.protin_cal.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class SessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession(false);  // 세션을 새로 만들지 않음.
        log.info("url : {}", request.getRequestURI());
        if (session == null || session.getAttribute("nickname") == null) {
            log.info("세션이 없음");
            response.addHeader("error", "세션에 아무것도 읎어요");
            response.setStatus(401);
            return false;
        }
        log.info("session : {}", session.getAttribute("nickname"));
        return true;
    }
}
