package com.goldentemple.springboot.web;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

public class IndexControllerTest {

//    @Autowired
//    private TestRestTemplate restTemplate;

    public void callMainPage(){
        //when
        //String body = this.restTemplate.getForObject("/", String.class);

        //when
        //assertThat(body).contains("스프링부트로 시작하는 웹서비스") ;
    }

}
