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
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(`http://localhost:3000/api/${id}`);
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
      postData = { id, title, content, imagePath: image };
    }

    this.http.put(`http://localhost:3000/api/${id}`, postData)
      .subscribe((res: Post) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = this.posts.findIndex(p => p.id === id);
        const post: Post = {
          id,
          title,
          content,
          imagePath: res.imagePath
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
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
        const post = {
          id: responseData.post.id,
          title: responseData.post.title,
          content: responseData.post.content,
          imagePath: responseData.post.imagePath
        };

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
