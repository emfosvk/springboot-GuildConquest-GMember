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
    public List<Map> selectListBookCharEquip(ToastGridParamDto searchMap){
       //mybatis
       return book00Mapper.selectListBookCharEquip(searchMap);
    }


}
