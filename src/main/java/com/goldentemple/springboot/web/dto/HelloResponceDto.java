package com.goldentemple.springboot.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HelloResponceDto {

    private final String name;
    private final int amt;
}
