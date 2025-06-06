package com.example.skystWaffleunivServer.controller

import com.example.skystWaffleunivServer.dto.RoomDto
import com.example.skystWaffleunivServer.service.EmotionLabelService
import com.example.skystWaffleunivServer.service.ReactionService
import com.example.skystWaffleunivServer.service.RoomService
import com.example.skystWaffleunivServer.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/rooms")
class RoomController(
    private val userService: UserService,
    private val roomService: RoomService,
    private val reactionService: ReactionService,
    private val emotionLabelService: EmotionLabelService,
) {
//    @PostMapping
//    fun createRoom(
//        @AuthenticationPrincipal userId: Long,
//        @RequestBody dto: RoomCreateDto,
//    ): ResponseEntity<RoomCreateResponseDto> {
//        val room = roomService.createRoom(user)
//        return ResponseEntity.ok(RoomCreateResponseDto(room.id!!))
//    }

    @GetMapping
    fun getAllRooms(): ResponseEntity<List<RoomDto>> {
        val rooms = roomService.findAllRooms()
        return ResponseEntity.ok(rooms)
    }

    /**
     * 단일 방 정보 조회
     */
    @GetMapping("/{roomId}")
    fun getRoom(
        @PathVariable roomId: Long,
    ): ResponseEntity<RoomDto> {
        val room = roomService.findRoomById(roomId)
        return ResponseEntity.ok(room)
    }
}

data class RoomCreateDto(
    val roomName: String,
    val emotionLabel: String,
) {
    // Add a no-args constructor for Jackson
    constructor() : this("", "")
}

data class RoomCreateResponseDto(
    val roomId: Long,
) {
    // Add a no-args constructor for Jackson
    constructor() : this(0L)
}
