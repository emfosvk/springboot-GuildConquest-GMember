package com.goldentemple.springboot.config.auth;

import com.goldentemple.springboot.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf().disable()
                .headers().frameOptions().disable() //h2console을 사용하기 위한 해제
                .and().authorizeRequests()
                    .antMatchers("/", "/css/**", "images/**", "/js/**", "/h2-console/**", "/profile").permitAll()
                    .antMatchers("/api/v1/**").hasRole(Role.MEMBER.name())
                    .anyRequest().authenticated()
                .and().logout().logoutSuccessUrl("/")
                .and().oauth2Login().userInfoEndpoint().userService(customOAuth2UserService);
    }

}
