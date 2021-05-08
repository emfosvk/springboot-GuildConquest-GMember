package com.goldentemple.springboot.domain.guld;

import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Guld00Mapper {

    // comn code
    public List<Map> selectListGuildForDropDown(ToastGridParamDto searchMap);

    public List<Map> selectListGuild(ToastGridParamDto searchMap);
    public void insertGuild(Map insertMap);
    public void updateGuild(Map updateMap);
    public void deleteGuild(Map deleteMap);

    public List<Map> selectListMember(ToastGridParamDto searchMap);
    public void insertMember(Map insertMap);
    public void updateMember(Map updateMap);
    public void deleteMember(Map deleteMap);

}
