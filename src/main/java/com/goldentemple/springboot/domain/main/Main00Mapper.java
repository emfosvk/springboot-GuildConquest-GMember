package com.goldentemple.springboot.domain.main;

import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Main00Mapper {

    // comn code
    public List<Map> selectListMenuList(Map commandMap);
    public Map checkUriAuth(Map commandMap);

}
