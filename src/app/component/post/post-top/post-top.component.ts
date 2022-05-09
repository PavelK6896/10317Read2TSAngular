import { Component, Input } from '@angular/core';
import { PostResponseDto } from "../../../utill/interfaceUtill";

@Component({
  selector: 'app-post-top',
  templateUrl: './post-top.component.html',
  styleUrls: ['./post-top.component.css']
})
export class PostTopComponent {

  @Input() post!: PostResponseDto;

}
