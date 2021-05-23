package com.goldentemple.springboot.interceptor;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.domain.user.User00Mapper;
import com.goldentemple.springboot.service.main.Main00Service;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthorizationCodeAuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class CertificationInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private Main00Service main00Service;

    @Autowired
    private User00Mapper user00Service;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        SessionUser user = (SessionUser) request.getSession().getAttribute("user");

        if(!ObjectUtils.isEmpty(user)){

            Map commandMap = new HashMap();
            commandMap.put("id", user.getId());
            Map userMap = user00Service.selectUser(commandMap);
            String roleString = String.valueOf(userMap.get("role"));
            if(!user.getRole().equals(Role.fromString(roleString))){
                response.sendRedirect("/logout");
            }
        }

//        if(ObjectUtils.isEmpty(loginVO)){
//            response.sendRedirect("/moveLogin.go");
//            return false;
//        }else{
//            session.setMaxInactiveInterval(30*60);
//            return true;
//        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        String uri = request.getRequestURI();
        logger.info(">>> request.getRequestURI() : " + uri);

        if("/error".equals(request.getRequestURI())){
            logger.info(">>> /error : return " );
            return;
        }

        SessionUser user = (SessionUser) request.getSession().getAttribute("user");


        if(!uri.contains("/api/") ){

            boolean accessOK = true;
            if(uri.contains("/vw/")){
                accessOK = main00Service.checkUriAuth(uri, user);
            }

            if(uri.contains("/vw/") || "/".equals(uri)){

                List<Map> menuList = main00Service.selectListMenuList(user);
                JSONArray searchResultJSON = main00Service.convertListToJson(menuList);
                modelAndView.getModelMap().addAttribute("mainMenuList", searchResultJSON);

                if(!ObjectUtils.isEmpty(user)){

                    Map<String, Object> guildMap = main00Service.checkGuildRegistSTS(user);
                    JSONObject guildInfo = null;
                    if(guildMap != null){
                        guildInfo = main00Service.convertMapToJson(guildMap);
                    }

                    modelAndView.getModelMap().addAttribute("userInfo", user.getUserInfo());
                    modelAndView.getModelMap().addAttribute("guildInfo", guildInfo);
                    //승인된 회원인지 체크
                    if(Role.GUEST.equals(user.getRole())){
                        modelAndView.getModelMap().addAttribute("userCertiYN", "N");
                    } else {
                        modelAndView.getModelMap().addAttribute("userCertiYN", "Y");
                    }
                }
            }

            if(accessOK){

            } else {
                response.sendRedirect("/");
            }

        }

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // TODO Auto-generated method stub

    }

}
