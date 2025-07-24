package mini_project.protin_cal.repository.userRepository;

import mini_project.protin_cal.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.user_id = :user_id AND u.user_pw = :user_pw")  // ':' 은 파라미터 바인딩
    User selectUser(@Param("user_id")String user_id, @Param("user_pw")String user_pw);

    @Query("SELECT u FROM User u WHERE u.nickname = :nickname")
    User selectUserByNickname(@Param("nickname")String nickname);
}
