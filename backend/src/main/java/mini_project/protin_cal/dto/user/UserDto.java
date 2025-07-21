package mini_project.protin_cal.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    public UserDto(String nickname, String user_id, String user_pw) {
        this.nickname = nickname;
        this.user_id = user_id;
        this.user_pw = user_pw;
    }
    @NotNull
    @Size(min = 2, max = 10)
    private String nickname;

    @NotNull
    @Size(min = 6, max = 12)
    private String user_id;

    @NotNull
    @Size(min = 6, max = 15)
    private String user_pw;
}
