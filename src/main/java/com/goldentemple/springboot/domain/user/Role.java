package com.goldentemple.springboot.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("ROLE_GUEST", "방문자"),
    MEMBER("ROLE_MEMBER", "길드원"),
    MANAGER("ROLE_MANAGER", "관리자"),
    MASTER("ROLE_MASTER", "길드마스터"),
    ADMIN("ROLE_ADMIN", "시스템관리자")
    ;

    private final String key;
    private final String title;

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
