package com.example.skystWaffleunivServer.dto

import com.example.skystWaffleunivServer.domain.SongRequestEntity

class SongPlayDto(
    val id: Long? = null,
    var title: String,
    var artist: String,
    var videoId: String,
    var comment: String,
    var fullStory: String,
) {
    companion object {
        fun fromEntity(entity: SongRequestEntity): SongPlayDto {
            return SongPlayDto(
                id = entity.id,
                title = entity.title,
                artist = entity.artist,
                videoId = entity.videoId,
                comment = entity.comment,
                fullStory = entity.fullStory,
            )
        }
    }
}
