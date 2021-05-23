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
    private final Comn00Service comn00Service;

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

    @GetMapping("/vw/guld00_regist.vw")
    public String guld00_regist(Model model, @LoginUser SessionUser user){

        ToastGridParamDto searchMap = new ToastGridParamDto();
        if(user == null){
            searchMap.setParamLong1(Long.parseLong("999999999999999"));
            searchMap.setParamStr1("1");
        } else {
            searchMap.setParamLong1(user.getId());
            searchMap.setParamStr1(user.getRole().getAccessLevel());
        }
        // 길드 목록 조회
        List<Map> searchResult = (List<Map>) guld00Service.selectListGuildForDropDown(searchMap);
        JSONArray searchResultJSON = convertListToJson(searchResult);
        model.addAttribute("guildList", searchResultJSON);

        // 길드권한 조회
        List<Map> searchResult3 = (List<Map>) guld00Service.selectListGuildRoleForDropDown(searchMap);
        JSONArray searchResultJSON3 = convertListToJson(searchResult3);
        model.addAttribute("roleList", searchResultJSON3);

        //길드 가입 상태 코드 조회
        ToastGridParamDto searchMap2 = new ToastGridParamDto();
        searchMap2.setParamStr1("REGIST_STS");
        List<Map> searchResult2 = (List<Map>) comn00Service.selectListComnCodeForDropDown(searchMap2);
        JSONArray searchResultJSON2 = convertListToJson(searchResult2);
        model.addAttribute("registStatusList", searchResultJSON2);



        ObjectMapper mapper = new ObjectMapper();

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "app/guld/guld00_regist";
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
