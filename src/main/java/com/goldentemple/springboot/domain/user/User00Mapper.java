package com.goldentemple.springboot.domain.user;

import com.goldentemple.springboot.config.auth.dto.OAuthAttributes;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface User00Mapper {
    public List<HashMap> selectListUser(HashMap searchMap);
    public HashMap selectUser(HashMap searchMap);
    public HashMap selectUserByEmail(HashMap searchMap);
    public HashMap selectUserByKakaoId(HashMap searchMap);
    public void insertUser(HashMap searchMap);
    public void updateUserByEmail(HashMap searchMap);
    public void updateUserByKakaoId(HashMap searchMap);

}
