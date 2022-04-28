import { Component, Input, OnInit } from '@angular/core';
import { throwError } from "rxjs";
// import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { PostResponseDto, VoteDto, VoteType } from "../../utill/interface1";
import { VoteService } from "../../service/vote.service";
import { AuthService } from "../../service/auth.service";
import { logUtil } from "../../utill/log1";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post!: PostResponseDto;
  voteDto: VoteDto;
  // faArrowUp = faArrowUp;
  // faArrowDown = faArrowDown;
  up = 'UP_VOTE'
  down = 'DOWN_VOTE'
  isLoggedIn!: boolean;

  constructor(private voteService: VoteService,
              private authService: AuthService,
              private router: Router
  ) {
    logUtil("VoteButtonComponent!")
    this.voteDto = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
  }

  upVotePost() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login')
      return;
    }
    this.voteDto.voteType = VoteType.UP_VOTE;
    this.post.vote = this.up
    this.vote();
  }

  downVotePost() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login')
      return;
    }
    this.voteDto.voteType = VoteType.DOWN_VOTE;
    this.post.vote = this.down
    this.vote();
  }

  private vote() {
    this.voteDto.postId = this.post.id;
    this.voteService.vote(this.voteDto)
      .subscribe((data) => {
        logUtil("vote+ ", data)
        this.post.voteCount = data
      }, error => {
        logUtil("vote- ", error)
        throwError(error);
      });
  }
}
