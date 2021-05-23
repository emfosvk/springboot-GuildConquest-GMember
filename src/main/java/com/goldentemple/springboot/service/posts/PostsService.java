package com.goldentemple.springboot.service.posts;

import com.goldentemple.springboot.domain.posts.Posts;
import com.goldentemple.springboot.domain.posts.Posts00Mapper;
import com.goldentemple.springboot.domain.posts.PostsRepository;
import com.goldentemple.springboot.web.dto.PostsListResponseDto;
import com.goldentemple.springboot.web.dto.PostsResponceDto;
import com.goldentemple.springboot.web.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {

    private final PostsRepository postsRepository;
    private final Posts00Mapper posts00Mapper;

    @Transactional
    public Long save(PostsSaveRequestDto rqDto){
        //return postsRepository.save(rqDto.toEntity()).getId();
        return null;
    }

    @Transactional
    public Long update(Long id, PostsSaveRequestDto rqDto){
       // Posts posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID= " + id));
        //posts.update(rqDto.getTitle(), rqDto.getContent());
        return null;
    }

    @Transactional
    public void delete(Long id){
        //Posts posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID= " + id));
        //postsRepository.delete(posts);
    }

    public PostsResponceDto findById(Long id){
        //Posts entity = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID= " + id));
        //return new PostsResponceDto(entity);
        return null;
    }

//    @Transactional(readOnly = true)
//    public List<PostsListResponseDto> findAllDesc(){
//        //JPA 방식
//        return postsRepository.findAllDesc().stream()
//                .map(PostsListResponseDto::new)
//                .collect(Collectors.toList());
//    }

    @Transactional(readOnly = true)
    public List<HashMap> findAllDesc(HashMap searchMap){
        //mybatis
        return posts00Mapper.selectListPosts(searchMap);
    }

}
