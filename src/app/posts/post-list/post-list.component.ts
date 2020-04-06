import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  posts = [
    { title: 'title', content: 'content' },
    { title: 'title2', content: 'content2' },
    { title: 'title3', content: 'content3' },
  ];
}
