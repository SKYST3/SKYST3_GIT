package skyst.dopamine.domain.member.api.dto;


public record KakaoTokenRes(String token_type, String access_token, Integer expires_in, String refresh_token, Integer refresh_token_expires_in) {
}

