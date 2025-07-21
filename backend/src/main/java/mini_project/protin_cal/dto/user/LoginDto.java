package mini_project.protin_cal.dto.user;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {

    @NotNull
    @Size(min = 6, max = 12)
    private String user_id;

    @NotNull
    @Size(min = 6, max = 15)
    private String user_pw;
}
