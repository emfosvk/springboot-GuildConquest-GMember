package com.goldentemple.springboot.domain.book;

import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Book00Mapper {

    // comn code
    public List<Map> selectListBookCharEquip(ToastGridParamDto searchMap);

}
