package mini_project.protin_cal.config;

import lombok.extern.slf4j.Slf4j;
import mini_project.protin_cal.interceptor.SessionInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final static String LOCAL_URL = "http://localhost:3000";
    private final static String SERVER_URL = "http://ec2-15-165-16-46.ap-northeast-2.compute.amazonaws.com:3000";
    /**
     * CORS 설정
    */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(SERVER_URL, LOCAL_URL)
                .allowedMethods(HttpMethod.GET.name(),  HttpMethod.POST.name(), HttpMethod.OPTIONS.name())
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    /**
     * Interceptor 설정 (Session 설정)
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new SessionInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/favicon.ico","/user/login", "/user/join", "/**/*.options");
    }

}
