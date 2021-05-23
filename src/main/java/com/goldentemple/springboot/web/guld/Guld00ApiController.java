package com.goldentemple.springboot.web.guld;

import com.goldentemple.springboot.service.comn.Comn00Service;
import com.goldentemple.springboot.service.guld.Guld00Service;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class Guld00ApiController {

    private final Guld00Service guld00Service;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/guld/openapi/searchGuild.api")
    public Map<String, Object> searchGuild(ToastGridParamDto searchMap){

        List<Map> searchResult = guld00Service.selectListGuild(searchMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();
        HashMap<String, Object> dataMap  = new HashMap<String, Object>();
        HashMap<String, Object> pageInfo = new HashMap<String, Object>();

        if(searchResult.size() > 0){
            pageInfo.put("page", searchMap.getPage());
            pageInfo.put("totalCount", searchResult.get(0).get("totalcount"));
        } else {
            pageInfo.put("page", 1);
            pageInfo.put("totalCount", 0);
        }

        dataMap.put("contents"  , searchResult);
        dataMap.put("pagination", pageInfo);

        rtnMap.put("result", true);
        rtnMap.put("data", dataMap);

        return rtnMap;
    }

    @PostMapping("/guld/api/modifyGuild.api")
    public Map<String, Object> modifyGuild(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        guld00Service.modifyGuild(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }

    @PostMapping("/guld/openapi/registerGuild.api")
    public Map<String, Object> registerGuild(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        Map result = guld00Service.registerGuild(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", result.get("result"));
        rtnMap.put("msg", result.get("msg"));

        return rtnMap;
    }

    @PostMapping("/guld/openapi/cancelRegisterGuild.api")
    public Map<String, Object> cancelRegisterGuild(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        Map result = guld00Service.cancelRegisterGuild(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", result.get("result"));
        rtnMap.put("msg", result.get("msg"));

        return rtnMap;
    }

    @PostMapping("/guld/api/modifyRegist.api")
    public Map<String, Object> modifyRegist(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        Map result = guld00Service.modifyRegist(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", result.get("result"));
        rtnMap.put("msg", result.get("msg"));

        return rtnMap;
    }

    @GetMapping("/guld/api/searchRegist.api")
    public Map<String, Object> searchRegist(ToastGridParamDto searchMap){

        List<Map> searchResult = guld00Service.selectListRegist(searchMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();
        HashMap<String, Object> dataMap  = new HashMap<String, Object>();
        HashMap<String, Object> pageInfo = new HashMap<String, Object>();

        if(searchResult.size() > 0){
            pageInfo.put("page", searchMap.getPage());
            pageInfo.put("totalCount", searchResult.get(0).get("totalcount"));
        } else {
            pageInfo.put("page", 1);
            pageInfo.put("totalCount", 0);
        }

        dataMap.put("contents"  , searchResult);
        dataMap.put("pagination", pageInfo);

        rtnMap.put("result", true);
        rtnMap.put("data", dataMap);

        return rtnMap;
    }

    @GetMapping("/guld/api/searchMember.api")
    public Map<String, Object> searchMember(ToastGridParamDto searchMap){

        List<Map> searchResult = guld00Service.selectListMember(searchMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();
        HashMap<String, Object> dataMap  = new HashMap<String, Object>();
        HashMap<String, Object> pageInfo = new HashMap<String, Object>();

        if(searchResult.size() > 0){
            pageInfo.put("page", searchMap.getPage());
            pageInfo.put("totalCount", searchResult.get(0).get("totalcount"));
        } else {
            pageInfo.put("page", 1);
            pageInfo.put("totalCount", 0);
        }

        dataMap.put("contents"  , searchResult);
        dataMap.put("pagination", pageInfo);

        rtnMap.put("result", true);
        rtnMap.put("data", dataMap);

        return rtnMap;
    }

    @PostMapping("/guld/api/modifyMember.api")
    public Map<String, Object> modifyMember(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        guld00Service.modifyMember(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }


}
