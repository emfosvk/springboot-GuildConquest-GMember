package com.goldentemple.springboot.service.comn;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.comn.Comn00Mapper;
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
public class Comn00Service extends CustmJavaUtils {

    private final Comn00Mapper comn00Mapper;

    @Transactional(readOnly = true)
    public List<Map> selectListClassForDropDown(){
        return comn00Mapper.selectListClassForDropDown();
    }

    @Transactional(readOnly = true)
    public List<Map> selectListComnCodeForDropDown(ToastGridParamDto searchMap){
        return comn00Mapper.selectListComnCodeForDropDown(searchMap);
    }


    @Transactional(readOnly = true)
    public List<Map> selectListClass(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return comn00Mapper.selectListClass(searchMap);
    }

    public void modifyClass(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                comn00Mapper.insertClass(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                comn00Mapper.updateClass(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                comn00Mapper.deleteClass(deleteMap);
            });
        }
    }

    @Transactional(readOnly = true)
    public List<Map> selectListComnCode(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return comn00Mapper.selectListComnCode(searchMap);
    }

    public void modifyComnCode(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                comn00Mapper.insertComnCode(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                comn00Mapper.updateComnCode(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                comn00Mapper.deleteComnCode(deleteMap);
            });
        }
    }

    @Transactional(readOnly = true)
    public List<Map> selectListChar(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return comn00Mapper.selectListChar(searchMap);
    }

    public void modifyChar(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                comn00Mapper.insertChar(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                comn00Mapper.updateChar(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                comn00Mapper.deleteChar(deleteMap);
            });
        }
    }

    @Transactional(readOnly = true)
    public List<Map> selectListItem(ToastGridParamDto searchMap){

        searchMap.setPageRowNum();
        //mybatis
        return comn00Mapper.selectListItem(searchMap);
    }

    public void modifyItem(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> columnData  = this.getJsonDataToList(commandMap, "columnData");
        List<Map> createdRows = this.getJsonDataToList(commandMap, "createdRows");
        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");
        List<Map> deletedRows = this.getJsonDataToList(commandMap, "deletedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(createdRows)){
            createdRows.forEach(createdMap -> {
                createdMap.put("id", userId);
                comn00Mapper.insertItem(createdMap);
            });
        }

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                comn00Mapper.updateItem(updatedMap);
            });
        }

        if(checkIsNotNullList(deletedRows)){
            deletedRows.forEach(deleteMap -> {
                deleteMap.put("id", userId);
                comn00Mapper.deleteItem(deleteMap);
            });
        }
    }

}
