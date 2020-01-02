import { Component, OnInit } from '@angular/core';
import { PostingService } from '../posting.service';

@Component({
  selector: 'app-postings-list',
  templateUrl: './postings-list.component.html',
  styleUrls: ['./postings-list.component.css']
})
export class PostingsListComponent implements OnInit {

  description: string;
  firstDate: Date;
  lastDate: Date;
  postings = [];

  ngOnInit() {
    this.list();
  }

  constructor(private postingService: PostingService) {}

  list() {
    this.postingService.search({description: this.description})
    .then(postings => this.postings = postings);
  }

}
