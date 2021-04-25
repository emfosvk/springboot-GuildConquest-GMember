package com.goldentemple.springboot.config;

import com.goldentemple.springboot.config.auth.LoginUserArgumentResolver;
import com.goldentemple.springboot.interceptor.CertificationInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserArgumentResolver  loginUserArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolverList){
        argumentResolverList.add(loginUserArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(new CertificationInterceptor())
                .addPathPatterns("/*", "/vw/*.vw")
                .excludePathPatterns("/login/oauth2/**/*", "/login/oauth2/*"); //로그인 쪽은 예외처리를 한다.
    }

}
