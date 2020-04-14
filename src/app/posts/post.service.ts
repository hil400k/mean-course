import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { strict } from 'assert';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ) {
  }

  getPosts() {
    this.http.get<{ message: string; posts: any }>('http://localhost:3000/api')
      .pipe(
        map((postsData) => {
          return postsData.posts.map((post) => {
            return {
              ...post,
              id: post._id
            };
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListened() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post = {
      id: null,
      title,
      content
    };
    this.http.post<{message: string}>('http://localhost:3000/api', post)
      .subscribe((responseData) => {
        console.info(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
