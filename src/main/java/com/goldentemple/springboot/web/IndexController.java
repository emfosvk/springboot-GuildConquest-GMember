package com.goldentemple.springboot.web;


import com.goldentemple.springboot.config.auth.LoginUser;
import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.service.posts.PostsService;
import com.goldentemple.springboot.web.dto.PostsResponceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user){
        model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "main/main";
    }

    @GetMapping("/posts/save")
    public String postsSave(){
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsSave(@PathVariable Long id, Model model){
        PostsResponceDto dto = postsService.findById(id);
        model.addAttribute("post", dto);
        return "posts-update";
    }

    private Map<String, Object> getUserInfo(SessionUser user){
        Map<String, Object> rtnMap = new HashMap<>();

        rtnMap.put("name"   , user.getName()   );
        rtnMap.put("email"  , user.getEmail()  );
        rtnMap.put("picture", user.getPicture());
        rtnMap.put("role"   , user.getRole()   );

        return rtnMap;
    }

    //toast grid 테스트용.
    @GetMapping("/vw/toastgrid.vw")
    public String jqueryui(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "template/toastgrid";
    }

}
