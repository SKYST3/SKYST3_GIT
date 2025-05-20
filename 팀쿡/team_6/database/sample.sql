-- 1. channels
INSERT INTO channels (status, preferred_language_code, host_interface, speech_interface)
VALUES 
(
  'active', 
  'en', 
  '{"type": "web"}', 
  '{"type": "voice_v1"}'
),
(
  'inactive', 
  'ko', 
  '{"type": "mobile"}', 
  '{"type": "voice_v2"}'
),
(
  'archived', 
  'en', 
  '{"type": "tv"}', 
  '{"type": "voice_v3"}'
);

-- 2. channel_translations (en/ko 각각 존재 보장)
INSERT INTO channel_translations (channel_id, language_code, name, description)
VALUES
(7, 'en', 'Global News Channel', 'Covers world events and stories.'),
(7, 'ko', '글로벌 뉴스 채널', '세계 주요 사건과 이야기를 다룹니다.'),
(8, 'ko', '모바일 한국 채널', '모바일 전용 한국어 콘텐츠 제공.'),
(9, 'en', 'Archived English Channel', 'This channel contains archived stories.');

-- 3. stories
INSERT INTO stories (user_id, channel_id, language_code, title, content)
VALUES
(1, 7, 'en', 'Breaking News', 'An event has just occurred.','Generated summary: Breaking event.'),
(1, 7, 'ko', '긴급 속보', '방금 막 사건이 발생했습니다.', '요약: 사건 발생.'),
(1, 8, 'ko', '모바일 이야기', '모바일에서 본 이야기입니다.', NULL),
(1, 9, 'en', 'Old Memories', 'This is a story from the archives.', NULL);

-- 4. story_replies
INSERT INTO story_replies (story_id, user_id, content)
VALUES
(15, 1, 'Thanks for the update!'),
(16, 1, '흥미로운 기사네요.'),
(17, 1, '재밌게 읽었습니다.'),
(18, 1, 'Very nostalgic!');
