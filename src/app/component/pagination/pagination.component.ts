import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagePostResponseDto } from "../../utill/interfaceUtill";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page!: PagePostResponseDto;
  @Output() updatePage = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateNumberPage(number: number | undefined) {
    return number == undefined ? number : number + 1
  }

  prevPage(number: number | undefined) {
    if (undefined !== number) {
      this.updatePage.emit(number - 1)
    }
  }

  nextPage(number: number | undefined) {
    if (undefined !== number) {
      this.updatePage.emit(number + 1)
    }
  }
}
