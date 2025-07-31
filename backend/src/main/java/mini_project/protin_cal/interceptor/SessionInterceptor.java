package mini_project.protin_cal.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class SessionInterceptor implements HandlerInterceptor {

    // SessionInterceptor.java
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Interceptor 작동 url : {}", request.getRequestURI());
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("nickname") != null) {
            return true;
        }

        log.info("세션이 없어요");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        return false;
    }

}
