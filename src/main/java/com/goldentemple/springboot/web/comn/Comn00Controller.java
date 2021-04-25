package com.goldentemple.springboot.web.comn;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goldentemple.springboot.config.auth.LoginUser;
import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.service.comn.Comn00Service;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class Comn00Controller extends CustmJavaUtils {

    private final Comn00Service comn00Service;

    //toast grid 테스트용.
    @GetMapping("/vw/comn00_class.vw")
    public String comn00_class(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        return "app/comn/comn00_class";
    }

    @GetMapping("/vw/comn00_code.vw")
    public String comn00_code(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        ToastGridParamDto searchMap = new ToastGridParamDto();
        List<Map> searchResult = (List<Map>) comn00Service.selectListClassForDropDown();

        JSONArray searchResultJSON = convertListToJson(searchResult);
        model.addAttribute("typeCodeList", searchResultJSON);

        ObjectMapper mapper = new ObjectMapper();

        return "app/comn/comn00_code";
    }

    @GetMapping("/vw/comn00_char.vw")
    public String comn00_char(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        ToastGridParamDto searchMap = new ToastGridParamDto();
        searchMap.setParamStr1("CLASS");
        List<Map> searchResult = (List<Map>) comn00Service.selectListComnCodeForDropDown(searchMap);
        JSONArray searchResultJSON = convertListToJson(searchResult);
        model.addAttribute("classList", searchResultJSON);

        searchMap.setParamStr1("ATCK_TYPE");
        List<Map> searchResult2 = (List<Map>) comn00Service.selectListComnCodeForDropDown(searchMap);
        JSONArray searchResultJSON2 = convertListToJson(searchResult2);
        model.addAttribute("atkTypeList", searchResultJSON2);


        ObjectMapper mapper = new ObjectMapper();

        return "app/comn/comn00_char";
    }

    @GetMapping("/vw/comn00_item.vw")
    public String comn00_item(Model model, @LoginUser SessionUser user){
        //model.addAttribute("posts", postsService.findAllDesc(null));
        //SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null){
            //아래 정보는 인터셉터로 뺴버림.
            //모든 url Path 리턴될 예정.
            //model.addAttribute("userInfo", getUserInfo(user));
        }

        ToastGridParamDto searchMap = new ToastGridParamDto();
        searchMap.setParamStr1("EQUIP_TYPE");
        List<Map> searchResult = (List<Map>) comn00Service.selectListComnCodeForDropDown(searchMap);
        JSONArray searchResultJSON = convertListToJson(searchResult);
        model.addAttribute("itemTypeList", searchResultJSON);

        ObjectMapper mapper = new ObjectMapper();

        return "app/comn/comn00_item";
    }

}
