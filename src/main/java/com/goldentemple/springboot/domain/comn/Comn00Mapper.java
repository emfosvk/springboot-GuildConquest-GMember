package com.goldentemple.springboot.domain.comn;

import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface Comn00Mapper {

    // comn code
    public List<Map> selectListClassForDropDown();
    public List<Map> selectListComnCodeForDropDown(ToastGridParamDto searchMap);

    public List<Map> selectListClass(ToastGridParamDto searchMap);
    public void insertClass(Map insertMap);
    public void updateClass(Map updateMap);
    public void deleteClass(Map deleteMap);

    public List<Map> selectListComnCode(ToastGridParamDto searchMap);
    public void insertComnCode(Map insertMap);
    public void updateComnCode(Map updateMap);
    public void deleteComnCode(Map deleteMap);

    public List<Map> selectListChar(ToastGridParamDto searchMap);
    public void insertChar(Map insertMap);
    public void updateChar(Map updateMap);
    public void deleteChar(Map deleteMap);

    public List<Map> selectListItem(ToastGridParamDto searchMap);
    public void insertItem(Map insertMap);
    public void updateItem(Map updateMap);
    public void deleteItem(Map deleteMap);

}
