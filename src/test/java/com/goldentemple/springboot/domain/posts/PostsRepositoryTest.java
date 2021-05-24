package com.goldentemple.springboot.domain.posts;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.List;


public class PostsRepositoryTest {

//    @Autowired
//    PostsRepository postsRepository;

    //@After
    //public void cleanup(){
    //    postsRepository.deleteAll();
    //}

    public void callPosts(){
//        String title = "테스트 게시글 제목";
//        String content = "테스트 본문";

//        postsRepository.save(Posts.builder()
//                    .title(title)
//                    .content(content)
//                    .author("rosa12")
//                    .build());
//
//        List<Posts> postsList = postsRepository.findAll();
//
//        Posts posts = postsList.get(0);
//        assertThat(posts.getTitle()).isEqualTo(title);
//        assertThat(posts.getContent()).isEqualTo(content);

    }

    public void insertBaseTimeEntity (){
        // given
//        LocalDateTime now = LocalDateTime.of(2021,4,6,16,0,0);
//        postsRepository.save(Posts.builder()
//                .title("title")
//                .content("content")
//                .author("author")
//                .build());
//
//        //when
//        List<Posts> postsList = postsRepository.findAll();
//
//        //then
//        Posts posts =  postsList.get(0);
//
//        System.out.println(">>>>>>>>> createDate=" + posts.getCreatedDate() + " / modifiedDate =" + posts.getModifiedDate());
//
//        assertThat(posts.getCreatedDate()).isAfter(now);
//        assertThat(posts.getModifiedDate()).isAfter(now);

    }

}
