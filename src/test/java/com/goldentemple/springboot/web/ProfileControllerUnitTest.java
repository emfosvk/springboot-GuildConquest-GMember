package com.goldentemple.springboot.web;

import org.junit.Test;
import org.springframework.mock.env.MockEnvironment;

import static org.assertj.core.api.Assertions.assertThat;

public class ProfileControllerUnitTest {

    public void load_aws_profile(){
//        //given
//        String expectedProfile = "aws";
//        MockEnvironment env = new MockEnvironment();
//        env.addActiveProfile(expectedProfile);
//        env.addActiveProfile("oauth");
//        env.addActiveProfile("aws-db");
//
//        ProfileController controller = new ProfileController(env);
//
//        // when
//        String profile = controller.profile();
//
//        //then
//        assertThat(profile).isEqualTo(expectedProfile);
    }

    public void load_first_profile_when_no_aws_profile(){
//        //given
//        String expectedProfile = "oauth";
//        MockEnvironment env = new MockEnvironment();
//
//        env.addActiveProfile(expectedProfile);
//        env.addActiveProfile("aws-db");
//
//        ProfileController controller = new ProfileController(env);
//
//        // when
//        String profile = controller.profile();
//
//        //then
//        assertThat(profile).isEqualTo(expectedProfile);
    }

    public void load_default_profile_when_no_active_profile(){
//        //given
//        String expectedProfile = "default";
//        MockEnvironment env = new MockEnvironment();
//
//        ProfileController controller = new ProfileController(env);
//
//        // when
//        String profile = controller.profile();
//
//        //then
//        assertThat(profile).isEqualTo(expectedProfile);
    }

}
