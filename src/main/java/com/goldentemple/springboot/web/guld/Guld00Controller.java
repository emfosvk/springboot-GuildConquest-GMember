package com.goldentemple.springboot.web.guld;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goldentemple.springboot.config.auth.LoginUser;
import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.service.comn.Comn00Service;
import com.goldentemple.springboot.service.guld.Guld00Service;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class Guld00Controller extends CustmJavaUtils {

    private final Guld00Service guld00Service;

    @GetMapping("/vw/guld00_guild.vw")
    public String guld00_guild(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "app/guld/guld00_guild";
    }

    @GetMapping("/vw/guld00_member.vw")
    public String guld00_member(Model model, @LoginUser SessionUser user){

        ToastGridParamDto searchMap = new ToastGridParamDto();
        if(user == null){
            searchMap.setParamLong1(Long.parseLong("999999999999999"));
            searchMap.setParamStr1("1");
        } else {
            searchMap.setParamLong1(user.getId());
            searchMap.setParamStr1(user.getRole().getAccessLevel());
        }

        List<Map> searchResult = (List<Map>) guld00Service.selectListGuildForDropDown(searchMap);

        JSONArray searchResultJSON = convertListToJson(searchResult);
        model.addAttribute("guildList", searchResultJSON);

        ObjectMapper mapper = new ObjectMapper();

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "app/guld/guld00_member";
    }

}
