package com.goldentemple.springboot.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class CustmJavaUtils {

    protected boolean checkIsNotNullObject(Object param) throws Exception
    {
        if(param == null){
            return false;
        }
        return true;
    }

    protected boolean checkIsNotNullMap(Map param) throws Exception
    {
        if(param == null){
            return false;
        }
        return true;
    }

    protected boolean checkIsNotNullList(List param) throws Exception
    {
        if(param == null || param.size() == 0){
            return false;
        }
        return true;
    }


    @SuppressWarnings("deprecation")
    protected List<Map> getJsonDataToList(Map commandMap, String pramName) throws Exception
    {
		/*----------------------------------------------
		 * JSON Data가 존재하는 경우 JSONArray로 만들어서 전달한다.
		 ----------------------------------------------*/
        List<Map> objList = null;
        try{
            String model = ((String)commandMap.get(pramName));
            if(model != null){
                ObjectMapper mapper = new ObjectMapper();
                objList = mapper.readValue(model, new TypeReference<List<Map<String, Object>>>(){});
            }
        }catch(Exception e)
        {
            throw new Exception("'"+pramName+"' - Error : Json to List<Map>");
        }

        return objList;
    }

    //list 처리
    public JSONArray convertListToJson(List<Map> list) {

        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> map : list) {
            jsonArray.add(convertMapToJson(map));
        }
        return jsonArray;
    }

    //map 처리
    public JSONObject  convertMapToJson(Map<String, Object> map) {

        JSONObject json = new JSONObject();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            json.put(key, value);
        }

        return json;
    }
}

