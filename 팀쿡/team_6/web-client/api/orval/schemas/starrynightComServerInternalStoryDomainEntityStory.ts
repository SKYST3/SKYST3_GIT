/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Starry Night API
 * Starry Night API
 * OpenAPI spec version: 1.0.0
 */
import type { PgtypeTimestamptz } from './pgtypeTimestamptz';
import type { StarrynightComServerInternalSharedValueobjectLanguageCode } from './starrynightComServerInternalSharedValueobjectLanguageCode';

export interface StarrynightComServerInternalStoryDomainEntityStory {
  channelID?: number;
  content?: string;
  createdAt?: PgtypeTimestamptz;
  id?: number;
  languageCode?: StarrynightComServerInternalSharedValueobjectLanguageCode;
  title?: string;
  userID?: number;
}
