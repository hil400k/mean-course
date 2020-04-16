import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
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

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>(`http://localhost:3000/api/${id}`);
  }

  getPostsUpdateListened() {
    return this.postsUpdated.asObservable();
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };

    this.http.put(`http://localhost:3000/api/${id}`, post)
      .subscribe((res) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = this.posts.findIndex(p => p.id === id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  addPost(title: string, content: string) {
    const post = {
      id: null,
      title,
      content
    };
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api', post)
      .subscribe((responseData) => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/api/${id}`)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
