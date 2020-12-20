import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {
  @Input()
  response: Response;

  @Output()
  selectResponse = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {}
}
