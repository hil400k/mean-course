import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [
    1, 2, 5, 10
  ];
  private postsSub: Subscription;

  constructor(
    private postService: PostService
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getPostsUpdateListened()
      .subscribe((postData: { posts: Post[], maxPosts: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.maxPosts;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }
}
