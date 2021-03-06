package com.goldentemple.springboot.web.book;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goldentemple.springboot.config.auth.LoginUser;
import com.goldentemple.springboot.config.auth.dto.SessionUser;
import com.goldentemple.springboot.service.comn.Comn00Service;
import com.goldentemple.springboot.utils.CustmJavaUtils;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class Book00Controller extends CustmJavaUtils {

    private final Comn00Service comn00Service;

    @GetMapping("/vw/book00_charItem.vw")
    public String book00_charItem(Model model, @LoginUser SessionUser user){

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

        Map searchResult2 = comn00Service.selectS3ImgInfo();
        JSONObject s3config = convertMapToJson(searchResult2);
        model.addAttribute("s3config", s3config);

        ObjectMapper mapper = new ObjectMapper();

        return "app/book/book00_charitem";
    }

    @GetMapping("/vw/book00_dmgCalc.vw")
    public String book00_dmgCalc(Model model, @LoginUser SessionUser user){
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

        return "app/book/book00_dmgCalc";
    }

    @GetMapping("/vw/book00_evMatch.vw")
    public String book00_evMatch(Model model, @LoginUser SessionUser user){
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

        return "app/book/book00_evMatch";
    }
}
