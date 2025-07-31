package mini_project.protin_cal.controller.userController;


import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import mini_project.protin_cal.domain.User;
import mini_project.protin_cal.dto.user.LoginDto;
import mini_project.protin_cal.dto.user.UserDto;
import mini_project.protin_cal.service.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    /**
     * 로그인 로직. Valid에 걸리면 error를 보냄. 저장 완료되면 userDto 객체를 보냄. (id는 보내지 않음)
     */

    @PostMapping("/user/")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto, BindingResult bindingResult, HttpSession session) {
        log.info("로그인 로직 시작");
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(x -> x.getDefaultMessage())
                    .collect(Collectors.toList());
            log.info("errors : {}", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            User user = userService.selectUser(loginDto.getUser_id(), loginDto.getUser_pw());
            log.info("user 찾기 성공: {}", user.getNickname());
            UserDto userDto = new UserDto(user.getNickname(), user.getUser_id(),  user.getUser_pw());
            // 세션에 정보 넣기
            session.setAttribute("user_id", userDto.getUser_id());
            session.setAttribute("nickname", userDto.getNickname());

            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/user/join")
    public ResponseEntity<?> join(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(x -> x.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            User user = new User(userDto.getNickname(), userDto.getUser_id(), userDto.getUser_pw());
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
