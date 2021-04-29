package com.goldentemple.springboot.web.book;

import com.goldentemple.springboot.service.book.Book00Service;
import com.goldentemple.springboot.service.comn.Comn00Service;
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
public class Book00ApiController {

    private final Comn00Service comn00Service;
    private final Book00Service book00Service;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/book/api/searchCharItem.api")
    public Map<String, Object> searchClass(ToastGridParamDto searchMap){

        List<Map> searchResult = book00Service.selectListBookCharEquip(searchMap);

        HashMap<String, Object> rtnMap   = new HashMap<String, Object>();

        rtnMap.put("result", true);
        rtnMap.put("data", searchResult);

        return rtnMap;
    }


}
