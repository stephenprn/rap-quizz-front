import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../classes/article.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent {
  @Input()
  article: Article;

  @Input()
  editionMode: boolean;

  @Output()
  deleteClicked = new EventEmitter<void>();

  @Output()
  editClicked = new EventEmitter<void>();

  constructor() {
  }
}
