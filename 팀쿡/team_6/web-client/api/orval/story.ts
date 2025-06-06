/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Starry Night API
 * Starry Night API
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import type {
  StarrynightComServerInternalStoryApplicationDtoCreateStoryDTO,
  StarrynightComServerInternalStoryApplicationDtoCreateStoryReplyDTO,
  StarrynightComServerInternalStoryDomainEntityStory,
  StarrynightComServerInternalStoryDomainEntityStoryReply
} from './schemas';





  export const getStory = () => {
/**
 * Retrieves all stories in a specific channel.
 * @summary Get stories by channel ID
 */
const getV1ChannelChannelIDStories = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory[]>>(
    channelID: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/v1/channel/${channelID}/stories`,options
    );
  }
/**
 * Creates a new story in a channel.
 * @summary Create a new story
 */
const postV1Story = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory>>(
    starrynightComServerInternalStoryApplicationDtoCreateStoryDTO: StarrynightComServerInternalStoryApplicationDtoCreateStoryDTO, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/v1/story`,
      starrynightComServerInternalStoryApplicationDtoCreateStoryDTO,options
    );
  }
/**
 * Deletes a story reply by its ID.
 * @summary Delete a story reply
 */
const deleteV1StoryReplyReplyID = <TData = AxiosResponse<void>>(
    replyID: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.delete(
      `/v1/story/reply/${replyID}`,options
    );
  }
/**
 * Retrieves all stories created by the authenticated user.
 * @summary Get stories by user ID
 */
const getV1StoryUser = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/v1/story/user`,options
    );
  }
/**
 * Retrieves all story replies created by the authenticated user.
 * @summary Get story replies by user ID
 */
const getV1StoryUserReplies = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/v1/story/user/replies`,options
    );
  }
/**
 * Retrieves a story by its ID.
 * @summary Get a specific story
 */
const getV1StoryStoryID = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory>>(
    storyID: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/v1/story/${storyID}`,options
    );
  }
/**
 * Deletes a story by its ID.
 * @summary Delete a story
 */
const deleteV1StoryStoryID = <TData = AxiosResponse<void>>(
    storyID: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.delete(
      `/v1/story/${storyID}`,options
    );
  }
/**
 * Retrieves all replies for a specific story.
 * @summary Get replies for a story
 */
const getV1StoryStoryIDReplies = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply[]>>(
    storyID: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/v1/story/${storyID}/replies`,options
    );
  }
/**
 * Creates a new reply to an existing story.
 * @summary Create a reply to a story
 */
const postV1StoryStoryIDReply = <TData = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply>>(
    storyID: number,
    starrynightComServerInternalStoryApplicationDtoCreateStoryReplyDTO: StarrynightComServerInternalStoryApplicationDtoCreateStoryReplyDTO, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/v1/story/${storyID}/reply`,
      starrynightComServerInternalStoryApplicationDtoCreateStoryReplyDTO,options
    );
  }
return {getV1ChannelChannelIDStories,postV1Story,deleteV1StoryReplyReplyID,getV1StoryUser,getV1StoryUserReplies,getV1StoryStoryID,deleteV1StoryStoryID,getV1StoryStoryIDReplies,postV1StoryStoryIDReply}};
export type GetV1ChannelChannelIDStoriesResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory[]>
export type PostV1StoryResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory>
export type DeleteV1StoryReplyReplyIDResult = AxiosResponse<void>
export type GetV1StoryUserResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory[]>
export type GetV1StoryUserRepliesResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply[]>
export type GetV1StoryStoryIDResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStory>
export type DeleteV1StoryStoryIDResult = AxiosResponse<void>
export type GetV1StoryStoryIDRepliesResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply[]>
export type PostV1StoryStoryIDReplyResult = AxiosResponse<StarrynightComServerInternalStoryDomainEntityStoryReply>
