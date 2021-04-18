import { UiService } from 'src/app/shared/services/ui.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private quizRoomUrlRe = new RegExp(
    '/(quiz)/(0[1-9]|[12][0-9]|3[01])(0[1-9]|[12][1-2])(202[1-9])-([A-Za-z0-9]{6})'
  );

  constructor(
    private utilsService: UtilsService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.checkClipboard();
  }

  private checkClipboard() {
    this.utilsService.getClipboardValue().then((text: string) => {
      const res = this.quizRoomUrlRe.exec(text);

      if (!res) {
        return;
      }

      this.uiService
        .displayConfirmationPopup({
          main: 'Voulez-vous rejoindre le quiz copé dans le presse-papier ?'
        })
        .afterClosed()
        .subscribe({
          next: (state: boolean) => {
            if (state) {
              this.router.navigate([res[0]]);
            }
          }
        });
    });
  }
}
