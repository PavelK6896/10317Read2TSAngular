import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from "../../utill/interfaceUtill";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() page!: Page;
  @Output() updatePage = new EventEmitter<number>();

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

  disabledNext(page: Page) {
    return page?.number >= (page?.totalPages - 1)
  }
}
