import { observable, autorun, reaction, action, runInAction } from "mobx";
import { fetchPosts, fetchComments } from "./api";
import React from "react";
import { enableLogging } from "mobx-logger";

enableLogging();

export class HNStore {
  @observable posts = [];
  @observable type = "news";
  @observable page;
  @observable postsLoading = false;
  @observable itemId;
  @observable selectedPost;
  @observable comments = [];
  @observable commentsLoading = false;

  constructor() {
    reaction(
      () => this.type + this.page,
      () => this.fetchPosts()
    );

    reaction(
      () => this.itemId,
      () => this.fetchComments()
    );
  }

  @action
  async fetchPosts() {
    this.postsLoading = true;
    const response = await fetchPosts(this.type, this.page);
    runInAction(() => {
      this.posts = response;
      this.postsLoading = false;
    });
  }

  @action
  async fetchComments() {
    this.commentsLoading = true;
    const response = await fetchComments(this.itemId);
    runInAction(() => {
      const {comments, ...post} = response;
      this.comments = comments;
      this.selectedPost = post;
      this.commentsLoading = false;
    });
  }

  @action
  setType(type) {
    this.type = type;
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  setItemId(id) {
    this.itemId = id;
  }
}

export const HNStoreContext = React.createContext(new HNStore());
