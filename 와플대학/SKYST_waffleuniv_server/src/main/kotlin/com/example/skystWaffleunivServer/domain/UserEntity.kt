package com.example.skystWaffleunivServer.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(nullable = false)
    var nickname: String,
    @Column(name = "color_hex", nullable = false)
    var colorHex: String,
    // 감정 라벨: 여러 사용자가 같은 라벨을 가질 수 있으므로 ManyToOne 맵핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "label_id")
    var label: EmotionLabelEntity? = null,
    @Column(name = "record_content", columnDefinition = "TEXT")
    var recordContent: String? = null,
    // 현재 방 정보: 여러 사용자가 같은 방에 있을 수 있으므로 ManyToOne 맵핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_room_id")
    var currentRoom: RoomEntity? = null,
    // 노래 요청: 일대일 관계
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", unique = true)
    val songRequests: List<SongRequestEntity> = listOf(),
    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
)
