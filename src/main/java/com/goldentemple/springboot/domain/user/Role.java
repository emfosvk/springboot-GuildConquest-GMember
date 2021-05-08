package com.goldentemple.springboot.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST", "방문자", "1"),
    MEMBER("ROLE_MEMBER", "길드원", "3"),
    MANAGER("ROLE_MANAGER", "관리자", "5"),
    MASTER("ROLE_MASTER", "길드마스터", "7"),
    ADMIN("ROLE_ADMIN", "시스템관리자", "9")
    ;

    private final String key;
    private final String title;
    private final String accessLevel;

    public static Role fromString(String text) {
        text = "ROLE_" + text;
        for (Role b : Role.values()) {
            if (b.key.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }

}
