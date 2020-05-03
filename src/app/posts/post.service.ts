import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/api`;

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ maxPosts: number, posts: Post[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(
        map((postsData) => {
          return {
            posts: postsData.posts.map((post) => {
                return {
                  ...post,
                  id: post._id
                };
              }),
            maxPosts: postsData.maxPosts
          };
        })
      )
      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({ maxPosts: transformedPostsData.maxPosts, posts: [...this.posts] });
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`${BACKEND_URL}/${id}`);
  }

  getPostsUpdateListened() {
    return this.postsUpdated.asObservable();
  }

  updatePost(id: string, title: string, content: string, image: string | File) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = { id, title, content, imagePath: image, creator: null };
    }

    this.http.put(`${BACKEND_URL}/${id}`, postData)
      .subscribe((res: Post) => {
        this.router.navigate(['/']);
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete(`${BACKEND_URL}/${id}`);
  }
}
