package com.goldentemple.springboot.service.guld;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.book.Book00Mapper;
import com.goldentemple.springboot.domain.comn.Comn00Mapper;
import com.goldentemple.springboot.domain.guld.Guld00Mapper;
import com.goldentemple.springboot.domain.user.Role;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class Guld00Service extends CustmJavaUtils {

    private final Guld00Mapper guld00Mapper;

    @Transactional(readOnly = true)
    public List<Map> selectListGuildForDropDown(ToastGridParamDto searchMap){
        return guld00Mapper.selectListGuildForDropDown(searchMap);
    }

    @Transactional(readOnly = true)
    public List<Map> selectListGuildRoleForDropDown(ToastGridParamDto searchMap){
        List<Map> resultList = guld00Mapper.selectListGuildRoleForDropDown(searchMap);
        for(Map map : resultList){
            if("N".equals(map.get("change_yn"))){
                map.put("disabled", true);
            }
        }
        return resultList;
    }

    @Transactional(readOnly = true)
    public List<Map> selectListGuild(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return guld00Mapper.selectListGuild(searchMap);
    }

    public Map registerGuild(HttpSession session, Map<String, Object> commandMap) throws Exception {

        SessionUser ssuser = (SessionUser) session.getAttribute("user");
        Long userId = ssuser.getId();
        commandMap.put("id", userId);

        Map resultMap = new HashMap();
        resultMap.put("result", false);
        resultMap.put("msg", "Unknown Error");

        //길드 가입 여부 체크
        Map registInfo = guld00Mapper.selectGuildRegist(commandMap);
        if(checkIsNotNullMap(registInfo)){

            String registStatus =  String.valueOf(registInfo.get("regist_status"));
            if(registStatus.equals("99") || registStatus.equals("91")){
                commandMap.put("regist_status", "01");
                //탈퇴후 재가입의 경우 신청일자도 초기화 처리.
                guld00Mapper.updateGuildRegistRenew(commandMap);
                resultMap.put("result", true);
                resultMap.put("msg", "OK");
            } else {
                resultMap.put("result", false);
                resultMap.put("msg", registInfo.get("regist_status_comt"));
            }
        } else {
            //신규 길드 가입 신청
            commandMap.put("regist_status", "01");
            guld00Mapper.insertGuildRegist(commandMap);
            resultMap.put("result", true);
            resultMap.put("msg", "OK");
        }

        return resultMap;
    }

    public Map cancelRegisterGuild(HttpSession session, Map<String, Object> commandMap) throws Exception {

        SessionUser ssuser = (SessionUser) session.getAttribute("user");
        Long userId = ssuser.getId();
        commandMap.put("id", userId);
        commandMap.put("user_id", userId);

        Map resultMap = new HashMap();
        resultMap.put("result", false);
        resultMap.put("msg", "unknown Error");

        String nowSts = String.valueOf(commandMap.get("regist_status"));
        String changeSts = "";

        switch (nowSts) {
            case "01" :
                // 가입 신청 상태 (01) > 삭제처리 (Delete)
                guld00Mapper.deleteGuildRegist(commandMap);
                resultMap.put("result", true);
                resultMap.put("msg", "OK");
                break;
            case "10" :
                // 가입 상태 (10) > 탈퇴처리 (99)
                commandMap.put("regist_status", "99");
                guld00Mapper.updateGuildRegist(commandMap);
                // 유저권한 Guest로 변경
                commandMap.put("role", "GUEST");
                guld00Mapper.updateUserRole(commandMap);

                resultMap.put("result", true);
                resultMap.put("msg", "OK");
                break;
            default:
                //unKnown Status Error 발생

        }

        return resultMap;
    }

    public Map modifyRegist(HttpSession session, Map<String, Object> commandMap) throws Exception {

        SessionUser ssuser = (SessionUser) session.getAttribute("user");
        Long userId = ssuser.getId();
        commandMap.put("id", userId);

        Map resultMap = new HashMap();
        resultMap.put("result", false);
        resultMap.put("msg", "unknown Error");

        String processMode = String.valueOf(commandMap.get("mode"));

        switch (processMode) {
            case "MR" : // 가입 신청 > 승인
                // 가입 신청 상태 (01) > 삭제처리 (Delete)
                commandMap.put("regist_status", "10");
                guld00Mapper.updateGuildRegist(commandMap);

                // 지정한 유저권한으로 변경
                guld00Mapper.updateUserRole(commandMap);

                resultMap.put("result", true);
                resultMap.put("msg", "OK");

                break;

            case "RR" : // 가입신청 > 거절
                // 가입 상태 (01) > delete
                guld00Mapper.deleteGuildRegist(commandMap);
                resultMap.put("result", true);
                resultMap.put("msg", "OK");
                break;

            case "MM" : // 가입 정보 수정
                // 가입 신청 상태 (10) > 정보 수정
                guld00Mapper.updateGuildRegist(commandMap);

                // 변경 등록한 권한으로 유저 정보 수정
                guld00Mapper.updateUserRole(commandMap);
                resultMap.put("result", true);
                resultMap.put("msg", "OK");
                break;

            case "RM" :
                // 강퇴처리 (가입 상태 (10) > 강퇴처리 (91))
                commandMap.put("regist_status", "91");
                guld00Mapper.updateGuildRegist(commandMap);

                // 유저권한 Guest로 변경
                commandMap.put("role", "GUEST");
                guld00Mapper.updateUserRole(commandMap);

                resultMap.put("result", true);
                resultMap.put("msg", "OK");
                break;

            default:
                //unKnown Status Error 발생

        }

        return resultMap;
    }

    @Transactional(readOnly = true)
    public List<Map> selectListRegist(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return guld00Mapper.selectListGuildRegist(searchMap);
    }

    public void modifyGuild(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                guld00Mapper.insertGuild(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                guld00Mapper.updateGuild(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                guld00Mapper.deleteGuild(deleteMap);
            });
        }
    }

    @Transactional(readOnly = true)
    public List<Map> selectListMember(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return guld00Mapper.selectListMember(searchMap);
    }

    public void modifyMember(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                guld00Mapper.insertMember(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                guld00Mapper.updateMember(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                guld00Mapper.deleteMember(deleteMap);
            });
        }
    }

}
