import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  constructor(
    private postService: PostService
  ) {

  }

  onAddPost(form: NgForm) {
    if (form.valid) {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }


}
