import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  postId: string;
  isLoading: boolean = false;
  private mode: string = 'create';

  constructor(
    private postService: PostService,
    public activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe((postData) => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
            this.isLoading = false;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        this.postService.addPost(form.value.title, form.value.content);
      } else {
        console.info(form.value.title, form.value.content);
        this.postService.updatePost(this.postId, form.value.title, form.value.content);
      }

      form.resetForm();
    }
  }


}
