package com.goldentemple.springboot.config.auth;

import com.goldentemple.springboot.config.auth.dto.OAuthAttributes;
import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.posts.Posts00Mapper;
import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.domain.user.User;
import com.goldentemple.springboot.domain.user.User00Mapper;
import com.goldentemple.springboot.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;
    private final HttpSession httpSession;

    private final User00Mapper user00Mapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                                                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        logger.debug(">>>>>>> [BEFORE] >> loadUser > saveOrUpdate");

        User uuser;// = saveOrUpdate(attributes);
        HashMap user = saveOrUpdate(attributes, registrationId);
        logger.debug(">>>>>>> [AFTER ] >> loadUser > saveOrUpdate");
        SessionUser ssUser = new SessionUser(user);
        httpSession.setAttribute("user", ssUser);



        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(ssUser.getRole().getKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }

    private HashMap saveOrUpdate(OAuthAttributes attributes, String registrationId){
//        User user = userRepository.findByEmail(attributes.getEmail())
//                .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
//                .orElse(attributes.toEntity());
        HashMap<String, Object> searchMap = new HashMap();

        searchMap.put("kakao_id", attributes.getKakao_id());
        searchMap.put("email", attributes.getEmail());

        logger.debug(">>>>>>> [BEFORE] >> saveOrUpdate > selectUserByEmail");

        HashMap userinfo;

        //if("kakao".equals(registrationId)){
            userinfo = user00Mapper.selectUserByKakaoId(searchMap);
        //} else {
        //    userinfo = user00Mapper.selectUserByEmail(searchMap);
        //}

        logger.debug(">>>>>>> [AFTER ] >> saveOrUpdate > selectUserByEmail");

        String mergeMode = (userinfo == null)? "I" : "U";

        if("I".equals(mergeMode)){
            userinfo = new HashMap();


//            userinfo.put("role", "GUEST");
            // 임시허용
            userinfo.put("role", "MEMBER");
        }

        LocalDateTime nowTime = LocalDateTime.now();

        userinfo.put("email",  attributes.getEmail());
        userinfo.put("name", attributes.getName());
        userinfo.put("picture", attributes.getPicture());
        userinfo.put("kakao_id",  attributes.getKakao_id());
        userinfo.put("created_date", nowTime);
        userinfo.put("modified_date", nowTime);

        logger.debug(">>>>>>> [BEFORE] >> saveOrUpdate > insertUser or updateUser");

        if("I".equals(mergeMode)){
            user00Mapper.insertUser(userinfo);
        } else {
        //    if("kakao".equals(registrationId)){
                user00Mapper.updateUserByKakaoId(userinfo);
        //    } else {
        //        user00Mapper.updateUserByEmail(userinfo);
        //    }
        }

        logger.debug(">>>>>>> [AFTER ] >> saveOrUpdate > insertUser or updateUser");
        logger.debug(">>>>>>> [BEFORE] >> saveOrUpdate > selectUser");

        HashMap newUserinfo;

        //if("kakao".equals(registrationId)){
            newUserinfo = user00Mapper.selectUserByKakaoId(searchMap);
        //} else {
        //    newUserinfo = user00Mapper.selectUserByEmail(searchMap);
        //}



        logger.debug(">>>>>>> [AFTER ] >> saveOrUpdate > selectUser");

        return newUserinfo;
    }

}
