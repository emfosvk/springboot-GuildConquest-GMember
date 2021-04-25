package com.goldentemple.springboot.web.comn;

import com.goldentemple.springboot.service.comn.Comn00Service;
import com.goldentemple.springboot.web.dto.ToastGridParamDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class Comn00ApiController {

    private final Comn00Service comn00Service;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/comn/api/searchClass.api")
    public Map<String, Object> searchClass(ToastGridParamDto searchMap){

        List<Map> searchResult = comn00Service.selectListClass(searchMap);

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

    @PostMapping("/comn/api/modifyClass.api")
    public Map<String, Object> modifyClass(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        comn00Service.modifyClass(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }

    @GetMapping("/comn/api/searchComnCode.api")
    public Map<String, Object> searchCode(ToastGridParamDto searchMap){

        List<Map> searchResult = comn00Service.selectListComnCode(searchMap);

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

    @PostMapping("/comn/api/modifyComnCode.api")
    public Map<String, Object> modifyCode(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        comn00Service.modifyComnCode(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }

    @GetMapping("/comn/api/searchChar.api")
    public Map<String, Object> searchChar(ToastGridParamDto searchMap){

        List<Map> searchResult = comn00Service.selectListChar(searchMap);

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

    @PostMapping("/comn/api/modifyChar.api")
    public Map<String, Object> modifyChar(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        comn00Service.modifyChar(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }

    @GetMapping("/comn/api/searchItem.api")
    public Map<String, Object> searchItem(ToastGridParamDto searchMap){

        List<Map> searchResult = comn00Service.selectListItem(searchMap);

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

    @PostMapping("/comn/api/modifyItem.api")
    public Map<String, Object> modifyItem(HttpSession session, @RequestParam Map<String, Object> commandMap) throws Exception{

        comn00Service.modifyItem(session, commandMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);

        return rtnMap;
    }

}
