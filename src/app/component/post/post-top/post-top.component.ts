import { Component, Input, OnInit } from '@angular/core';
import { PostResponseDto } from "../../../utill/interface1";

@Component({
  selector: 'app-post-top',
  templateUrl: './post-top.component.html',
  styleUrls: ['./post-top.component.css']
})
export class PostTopComponent implements OnInit {

  @Input() post!: PostResponseDto;

  constructor() {
  }

  ngOnInit(): void {
  }

}
