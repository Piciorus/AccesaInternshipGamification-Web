import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  GuiCellView,
  GuiColumn,
  GuiDataType,
  GuiPaging,
  GuiPagingDisplay,
  GuiRowColoring,
} from '@generic-ui/ngx-grid';
import { User } from 'src/app/libs/models/user';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RankingComponent implements OnInit {
  users: User[] = [];
  coloring = GuiRowColoring.ODD;
  source: Array<any> = [];
  sorting = {
    enabled: true,
    multiSorting: true,
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

  constructor(
    private readonly userService: UserService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  public getAllUser(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.source = response;
    });
  }

  getInitials(name: string): string {
    const initials = name.substr(0, 2); // Get the first two characters of the name
    return initials.toUpperCase();
  }
  ngOnInit() {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.source = response;
      console.log('Source:', this.source);
      // Generate random colors
      this.randomColors = this.generateRandomColors(this.source.length);
      console.log('Random colors:', this.randomColors);
    });
  }
  
  
  generateRandomColors(count: number): string[] {
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
  
  backgroundColor: string = '';

  getRandomColor(rowIndex: number): string {
    console.log('lista de culori',this.randomColors)
    console.log('index',rowIndex)
    console.log('sa vedem',this.randomColors[rowIndex])
    const randomIndex = Math.floor(Math.random() * this.randomColors.length);
    return this.randomColors[randomIndex];  }
  
  

  columns: Array<GuiColumn> = [
    {
      field: (item) => item,
      header: 'Username',
      type: GuiDataType.STRING,
      view: (cellValue: any) => {
        const initials = this.getInitials(cellValue.username);
        // const backgroundColor = this.getRandomColor(cellValue.username);
        // console.log(backgroundColor)
        let template = `
          <div class="user-avatar" style="background-color: ${cellValue.avatar}">
            <span>${initials}</span>
          </div>
          <div class="gui-user-info">
            <span class="gui-user-info-name">${cellValue.username}</span>
            <span class="gui-user-info-position">${cellValue.email}</span>
          </div>
        `;
        return template;
      },
      
      sorting: {
        enabled: true,
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
      view: GuiCellView.ITALIC,
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
}
