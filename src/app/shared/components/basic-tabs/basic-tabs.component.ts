import { Component, Output, EventEmitter, Input } from '@angular/core';

export class Tab {
  id: string;
  label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }
}

@Component({
  selector: 'app-basic-tabs',
  templateUrl: './basic-tabs.component.html',
  styleUrls: ['./basic-tabs.component.scss']
})
export class BasicTabsComponent {
  @Input()
  public tabs: Tab[];

  @Input()
  public tabSelected: Tab;

  @Output()
  public tabChanges = new EventEmitter<Tab>();
}
