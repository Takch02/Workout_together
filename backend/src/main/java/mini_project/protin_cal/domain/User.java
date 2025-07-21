package mini_project.protin_cal.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, updatable = false)
    private Long id;

    @Column(name = "nickname", unique = true, nullable = false, length = 10)
    private String nickname;

    @Column(name = "user_id", unique = true, nullable = false, length = 12)
    private String user_id;

    @Column(name = "user_pw", unique = true, nullable = false, length = 12)
    private String user_pw;

    public User(String nickname, String user_id, String user_pw) {
        this.nickname = nickname;
        this.user_id = user_id;
        this.user_pw = user_pw;
    }

    public User() {

    }
}
