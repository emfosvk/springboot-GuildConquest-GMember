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

        Map searchResult2 = comn00Service.selectS3ImgInfo();
        JSONObject s3config = convertMapToJson(searchResult2);
        model.addAttribute("s3config", s3config);

        ObjectMapper mapper = new ObjectMapper();

        return "app/book/book00_charItem";
    }

    //@GetMapping("/vw/comn00_item.vw")
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

        return "app/book/book00_charItem";
    }

}
