package com.goldentemple.springboot.domain.guld;

import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Guld00Mapper {

    // comn code
    public List<Map> selectListGuildForDropDown(ToastGridParamDto searchMap);
    public List<Map> selectListGuildRoleForDropDown(ToastGridParamDto searchMap);

    public List<Map> selectListGuild(ToastGridParamDto searchMap);
    public void insertGuild(Map insertMap);
    public void updateGuild(Map updateMap);
    public void deleteGuild(Map deleteMap);

    public List<Map> selectListGuildRegist(ToastGridParamDto searchMap);
    public Map selectGuildRegist(Map commnadMap);
    public void insertGuildRegist(Map insertMap);
    public void updateGuildRegistRenew(Map updateMap);
    public void updateGuildRegist(Map updateMap);
    public void updateUserRole(Map updateMap);
    public void deleteGuildRegist(Map deleteMap);

    public List<Map> selectListMember(ToastGridParamDto searchMap);
    public void insertMember(Map insertMap);
    public void updateMember(Map updateMap);
    public void deleteMember(Map deleteMap);

}
