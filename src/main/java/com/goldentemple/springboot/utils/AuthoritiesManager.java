package com.goldentemple.springboot.utils;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.user.User00Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthoritiesManager {

    private User00Mapper user00Mapper;

    public AuthoritiesManager(User00Mapper user00Mapper) {
        this.user00Mapper = user00Mapper;
    }

    public void update(SessionUser user) {
//        List<UserRole> userRoles = user00Mapper.selectUser(user);
//
//        List<GrantedAuthority> actualAuthorities = userRoles.stream().map(userRole -> new SimpleGrantedAuthority(userRole.getRole())).collect(Collectors.toList());
//
//        Authentication newAuth = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), actualAuthorities);
//
//        SecurityContextHolder.getContext().setAuthentication(newAuth);
//        https://stackoverflow.com/questions/7889660/how-to-reload-spring-security-principal-after-updating-in-hibernate
//        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getUserInfo());
//        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

}
