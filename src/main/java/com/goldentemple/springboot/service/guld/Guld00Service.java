package com.goldentemple.springboot.service.guld;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.book.Book00Mapper;
import com.goldentemple.springboot.domain.comn.Comn00Mapper;
import com.goldentemple.springboot.domain.guld.Guld00Mapper;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
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
    public List<Map> selectListGuild(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return guld00Mapper.selectListGuild(searchMap);
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
