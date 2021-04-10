package com.goldentemple.springboot.domain.posts;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface Posts00Mapper {

    public List<HashMap> selectListPosts();


}
