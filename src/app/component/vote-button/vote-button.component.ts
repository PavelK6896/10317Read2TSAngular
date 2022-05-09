import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { PostResponseDto, VoteDto, VoteType } from "../../utill/interfaceUtill";
import { VoteService } from "../../service/vote.service";
import { AuthService } from "../../service/auth.service";
import { logUtil } from "../../utill/logUtill";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent {


  @Input() post!: PostResponseDto;
  voteDto: VoteDto;
  up = VoteType.UP_VOTE
  down = VoteType.DOWN_VOTE

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

  upVotePost() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login').then(r => logUtil("r+ ", r))
      return;
    }
    this.voteDto.voteType = VoteType.UP_VOTE;
    this.post.vote = this.up
    this.vote();
  }

  downVotePost() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login').then(r => logUtil("r+ ", r))
      return;
    }
    this.voteDto.voteType = VoteType.DOWN_VOTE;
    this.post.vote = this.down
    this.vote();
  }

  private vote() {
    this.voteDto.postId = this.post.id;
    this.voteService.vote(this.voteDto)
      .subscribe({
        next: (data) => {
          logUtil("vote+ ", data)
          this.post.voteCount = data
        }, error: error => {
          logUtil("vote- ", error)
        }
      });
  }
}
