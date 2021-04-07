package com.goldentemple.springboot.web;

import com.goldentemple.springboot.service.posts.PostsService;
import com.goldentemple.springboot.web.dto.PostsResponceDto;
import com.goldentemple.springboot.web.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PostsApiController {

    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto rqDto){
        return postsService.save(rqDto);
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsSaveRequestDto rqDto){
        return postsService.update(id, rqDto);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id){
        postsService.delete(id);
        return id;
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponceDto findById(@PathVariable Long id){
        return postsService.findById(id);
    }

}
