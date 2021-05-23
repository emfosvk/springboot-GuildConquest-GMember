package com.goldentemple.springboot.domain.user;

import com.goldentemple.springboot.config.auth.dto.OAuthAttributes;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface User00Mapper {
    public List<Map> selectListUser(Map searchMap);
    public Map selectUser(Map searchMap);
    public Map selectUserByEmail(Map searchMap);
    public Map selectUserByKakaoId(Map searchMap);
    public void insertUser(Map searchMap);
    public void updateUserByEmail(Map searchMap);
    public void updateUserByKakaoId(Map searchMap);

}
