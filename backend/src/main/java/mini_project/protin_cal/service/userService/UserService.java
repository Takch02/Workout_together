package mini_project.protin_cal.service.userService;

import mini_project.protin_cal.domain.User;
import mini_project.protin_cal.repository.userRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {  // 유저 저장
        userRepository.save(user);
    }

    public User selectUser(String user_id, String user_pw) {  // id, pw로 유저 찾기
        return userRepository.selectUser(user_id, user_pw);
    }

    public User selectByNickname (String nickname) {
        return userRepository.selectUserByNickname(nickname);
    }
    public void modifyUser(User user) {
        userRepository.save(user);
    }

    public List<User> findAll() {     // 모든 유저 탐색
        return userRepository.findAll();
    }

}
