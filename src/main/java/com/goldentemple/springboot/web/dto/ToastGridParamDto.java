package com.goldentemple.springboot.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ToastGridParamDto {
    //페이징
    private Integer perPage;
    private Integer page;
    private Integer startRowNum;

    private String paramStr1;
    private String paramStr2;
    private String paramStr3;
    private String paramStr4;
    private String paramStr5;

    private Integer paramInt1;
    private Integer paramInt2;
    private Integer paramInt3;
    private Integer paramInt4;
    private Integer paramInt5;

    private List<Object> paramList1;
    private List<Object> paramList2;

    public void setPageRowNum(){
        if(page == null && perPage == null){
            return;
        }
        //startRowNum = ((page - 1) * perPage);
    }


}
