import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    this.http.get<{ message: string; posts: any, maxPosts: number }>('http://localhost:3000/api' + queryParams)
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
    }>(`http://localhost:3000/api/${id}`);
  }

  getPostsUpdateListened() {
    return this.postsUpdated.asObservable();
  }

  updatePost(id: string, title: string, content: string, image: string | File) { console.info(image, 'image');
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

    this.http.put(`http://localhost:3000/api/${id}`, postData)
      .subscribe((res: Post) => {
        this.router.navigate(['/']);
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api', postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete(`http://localhost:3000/api/${id}`);
  }
}
