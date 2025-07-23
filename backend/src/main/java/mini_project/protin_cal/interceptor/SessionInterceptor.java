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
        log.info("nickname = {}",  session);
        if (session == null || session.getAttribute("user_id") == null) {
            response.sendRedirect("http://localhost:3000/");
            return false;
        }
        return true;
    }
}
