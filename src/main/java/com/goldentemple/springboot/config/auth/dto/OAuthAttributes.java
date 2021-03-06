package com.goldentemple.springboot.config.auth.dto;

import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;
    private Long kakao_id;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey
                            , String name, String email, String picture, Long kakao_id){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.kakao_id= kakao_id;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){

        //if("naver".equals(registrationId)){
        //    return ofNaver("id", attributes);
        //}
        //if("kakao".equals(registrationId)){
            return ofKakao("id", attributes);
        //}

        //return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String nameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(nameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes){

        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("profile_image"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes){

            Map<String,Object> response = (Map<String, Object>)attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) response.get("profile");
            response.put("id", attributes.get("id"));
        return OAuthAttributes.builder()
                .name((String) profile.get("nickname"))
                .email((String) response.get("email"))
                //.picture((String) profile.get("profile_image_url"))
                .picture((String) profile.get("thumbnail_image_url"))
                .kakao_id(Long.valueOf(String.valueOf( (Integer) attributes.get("id"))))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .kakao_id(kakao_id)
                .role(Role.GUEST)
                .build();
    }


}
