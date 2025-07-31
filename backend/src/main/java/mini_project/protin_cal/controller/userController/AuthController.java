package mini_project.protin_cal.controller.userController;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthController {

    @GetMapping("/auth")
    public ResponseEntity<?> auth(HttpSession session) {
        log.info("Auth 실행 후 session : {}", session.getAttribute("nickname"));
        if (session.getAttribute("nickname") == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다");
        } else {
            return ResponseEntity.status(200).body("로그인 성공!");
        }
    }
    @RequestMapping(value = "/user/login", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        log.info("options 요청이 들어옴");
        return ResponseEntity.ok().build();
    }


}
