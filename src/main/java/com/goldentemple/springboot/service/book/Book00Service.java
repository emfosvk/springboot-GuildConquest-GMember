package com.goldentemple.springboot.service.book;

import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.domain.book.Book00Mapper;
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
public class Book00Service extends CustmJavaUtils {

    private final Book00Mapper book00Mapper;

    @Transactional(readOnly = true)
    public List<Map> selectListBookCharEquip(Map<String, Object> commandMap){
       //mybatis
       return book00Mapper.selectListBookCharEquip(commandMap);
    }

    @Transactional(readOnly = true)
    public List<Map> selectListEtcItem(Map<String, Object> commandMap){
        //mybatis
        return book00Mapper.selectListEtcItem(commandMap);
    }

    @Transactional(readOnly = true)
    public List<Map> searchListEvChar(){
        //mybatis
        return book00Mapper.searchListEvChar();
    }

    public void modifyEvChar(HttpSession session, Map<String, Object> commandMap) throws Exception {

        List<Map> updatedRows = this.getJsonDataToList(commandMap, "updatedRows");

        SessionUser ssuser = (SessionUser) session.getAttribute("user");

        Long userId = ssuser.getId();

        if(checkIsNotNullList(updatedRows)){
            updatedRows.forEach(updatedMap -> {
                updatedMap.put("id", userId);
                book00Mapper.updateEvChar(updatedMap);
            });
        }
    }

}
