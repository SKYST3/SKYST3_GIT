package skyst.dopamine.domain.member.api.dto;


public record MemberReq(Long userId, String ageRange, String gender, String religion, String hasExperience) {
}
