package mini_project.protin_cal.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import mini_project.protin_cal.domain.User;
import mini_project.protin_cal.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class MainController {

    @Autowired
    private UserService userService;

    @GetMapping("/main")
    public ResponseEntity<?> mainPage(HttpSession session) {
        String nickname = (String)session.getAttribute("nickname");
        if (nickname == null) {
            return ResponseEntity.status(401).body("{\"error\": \"로그인이 필요합니다\"}");
        }
        try {
            User user = userService.selectByNickname(nickname);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body("서버오류");
        }
    }
}
