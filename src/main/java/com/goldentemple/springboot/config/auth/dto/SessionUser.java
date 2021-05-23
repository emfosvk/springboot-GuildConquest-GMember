package com.goldentemple.springboot.config.auth.dto;

import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Getter
public class SessionUser implements Serializable {

    private Long   id;
    private Long   kakao_id;
    private String name;
    private String email;
    private String picture;
    private Role role;

    public SessionUser(Map<String,Object> user){
        this.id = Long.valueOf(String.valueOf(user.get("id")));
        this.kakao_id = Long.valueOf(String.valueOf(user.get("kakao_id")));
        this.name = String.valueOf(user.get("name"));
        this.email = String.valueOf(user.get("email"));
        this.picture = String.valueOf(user.get("picture"));
        String mapRole = String.valueOf(user.get("role"));
        this.role = Role.fromString(mapRole);
    }

    public HashMap<String,Object> getUserInfo(){
        HashMap<String,Object> returnMap = new HashMap();

        returnMap.put("id"          , getId()       );
        returnMap.put("kakao_id"    , getKakao_id() );
        returnMap.put("name"        , getName()     );
        returnMap.put("email"       , getEmail()    );
        returnMap.put("picture"     , getPicture()  );
        returnMap.put("role"        , getRole()     );

        return returnMap;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
