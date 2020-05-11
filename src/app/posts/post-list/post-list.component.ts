import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [
    1, 2, 5, 10
  ];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService.getPostsUpdateListened()
      .subscribe((postData: { posts: Post[], maxPosts: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.maxPosts;
        this.isLoading = false;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  showActions(post) {
    return this.authService.isAdmin() || (this.userIsAuthenticated && this.userId === post.creator);
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      }, () => {
        this.isLoading = false;
      });
  }

  onChangedPage(pageData: any) {
    this.isLoading = true;
    this.currentPage = pageData.currentPage + 1;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }
}
