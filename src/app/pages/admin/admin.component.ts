import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/components/basic-tabs/basic-tabs.component';
import { User } from 'src/app/shared/classes/models/user.class';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public tabs: Tab[] = [
    new Tab('questions-list', 'Questions'),
    new Tab('responses-list', 'Réponses'),
    new Tab('users-list', 'Utilisateurs'),
    new Tab('data', 'Données')
  ];
  public tabSelected: Tab = this.tabs[0];
  public currentUser: User;

  public tabChanges(tab: Tab) {
    this.tabSelected = tab;
  }
}
