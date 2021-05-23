package com.goldentemple.springboot.service.main;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.comn.Comn00Mapper;
import com.goldentemple.springboot.domain.guld.Guld00Mapper;
import com.goldentemple.springboot.domain.main.Main00Mapper;
import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class Main00Service extends CustmJavaUtils {

    private final Main00Mapper main00Mapper;
    private final Guld00Mapper guld00Mapper;

    @Transactional(readOnly = true)
    public List<Map> selectListMenuList(SessionUser ssuser) throws Exception {

        Role userRole;

        if(ssuser != null){
            userRole = ssuser.getRole();
        } else {
            userRole = Role.fromString("UNKNOWN");
        }

        String accessLevel = userRole.getAccessLevel();

        Map<String, Object> commandMap = new HashMap<String, Object>();
        commandMap.put("accessLevel", accessLevel);

        return main00Mapper.selectListMenuList(commandMap);
    }

    @Transactional(readOnly = true)
    public boolean checkUriAuth(String uri, SessionUser ssuser) throws Exception {

        Role userRole;

        if(ssuser != null){
            userRole = ssuser.getRole();
        } else {
            userRole = Role.fromString("UNKNOWN");
        }

        String accessLevel = userRole.getAccessLevel();

        Map<String, Object> commandMap = new HashMap<String, Object>();
        commandMap.put("accessLevel", accessLevel);
        commandMap.put("uri", uri);

        Map<String, Object> resultMap = main00Mapper.checkUriAuth(commandMap);
        if(!checkIsNotNullObject(resultMap)){
            return false;
        } else if (!"Y".equals(resultMap.get("access_yn"))){
            return false;
        } else {
            return true;
        }
    }

    @Transactional(readOnly = true)
    public Map checkGuildRegistSTS(SessionUser ssuser) throws Exception {

        Long user_id ;

        if(ssuser != null){
            user_id = ssuser.getId();
        } else {
            return null;
        }

        Map<String, Object> commandMap = new HashMap<String, Object>();
        commandMap.put("user_id", user_id);

        Map<String, Object> resultMap = main00Mapper.checkGuildRegistSTS(commandMap);

        return resultMap;
    }

}
