import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  GuiCellView,
  GuiColumn,
  GuiDataType,
  GuiPaging,
  GuiPagingDisplay,
  GuiRowColoring,
} from '@generic-ui/ngx-grid';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { User } from 'src/app/libs/models/user';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RankingComponent implements OnInit {
  columns: Array<GuiColumn> = [
    {
      field: (item) => item,
      header: 'Username',
      type: GuiDataType.STRING,
      view: (cellValue: any) => {
        const initials = this.getInitials(cellValue.username);
        const name = this.authService.getUser().username;

        this.loggedInUser = this.source.find((user) => user.username === name);
        let template = `
          <div class="user-avatar" style="background-color: ${
            cellValue.avatar
          }">
            <span>${initials}</span>
          </div>
          <div class="gui-user-info ${
            this.loggedInUser &&
            cellValue.username === this.loggedInUser.username
              ? 'logged-in'
              : ''
          }">
            <span class="gui-user-info-name ${
              this.loggedInUser &&
              cellValue.username === this.loggedInUser.username
                ? 'logged-in'
                : ''
            }"">${cellValue.username}</span>
            <span class="gui-user-info-position ${
              this.loggedInUser &&
              cellValue.username === this.loggedInUser.username
                ? 'logged-in'
                : ''
            }""${cellValue.username}">${cellValue.email}</span>
          </div>
        `;
        return template;
      },

      cellEditing: {
        enabled: false,
      },
      matcher: (item) => item.name,
    },
    {
      field: 'tokens',
      header: 'Tokens',
      type: GuiDataType.STRING,
      view: GuiCellView.TEXT,
      cellEditing: {
        enabled: true,
      },
    },
    {
      field: 'threshold',
      header: 'Threshold',
      type: GuiDataType.STRING,
      view: GuiCellView.TEXT,
      cellEditing: {
        enabled: true,
      },
    },
    {
      field: 'badges',
      header: 'Badges',
      type: GuiDataType.STRING,
      view: (cellValue: any) => {
        if (cellValue && cellValue.length > 0) {
          return cellValue.map((badge: any) => badge.name).join(', ');
        } else {
          return '';
        }
      },
      cellEditing: {
        enabled: true,
      },
    },
  ];
  users: User[] = [];
  coloring = GuiRowColoring.ODD;
  source: Array<any> = [];
  sorting = {
    enabled: true,
  };
  columnMenu = {
    enabled: true,
    columnsManager: true,
  };
  paging: GuiPaging = {
    enabled: true,
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 25, 50],
    display: GuiPagingDisplay.ADVANCED,
  };
  randomColors: string[] = [];
  loggedInUser: any;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllUser();
  }

  private generateRandomColors(count: number): string[] {
    const colors = [
      '#2196F3',
      '#4CAF50',
      '#FF9800',
      '#9C27B0',
      '#673AB7',
      '#FF5722',
      '#795548',
      '#607D8B',
    ];
    const randomColors = [];
    for (let i = 0; i < count; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      randomColors.push(colors[colorIndex]);
    }
    return randomColors;
  }

  private getInitials(name: string): string {
    const initials = name.substr(0, 2);
    return initials.toUpperCase();
  }

  private getAllUser(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.source = response;
      this.randomColors = this.generateRandomColors(this.source.length);
      const name = this.authService.getUser().username;
      this.loggedInUser = this.source.find((user) => user.username === name);
    });
  }
}
