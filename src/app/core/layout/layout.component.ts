import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Subscription,
  filter,
  fromEvent,
  of,
  take,
  throttleTime,
} from 'rxjs';
import { CreateQuestionModalComponent } from 'src/app/apps/home/create-question-modal/create-question-modal.component';
import { PlayTestComponent } from 'src/app/apps/play-test/play-test.component';
import { QuestsComponent } from 'src/app/apps/quests/quests.component';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { ERole } from 'src/app/libs/models/erole';
import { CategoryService } from 'src/app/libs/services/category.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public username!: string;
  public user: any;
  public isAdmin = false;
  protected readonly ERole = ERole;
  private dialogOpen = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private observer: BreakpointObserver,
    private readonly authService: AuthService,
    private elementRef: ElementRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService
  ) {}
  public logout(): void {
    this.authService.logout();
  }

  public getUser(): void {
    this.user = this.authService.getUser();

    this.username = this.user.username;
  }
  isOpen = false;
  resize: Subscription;
  openMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  /**
   * Listens for a click in document and then check for isOpen to be true.
   * If so, then close it
   */
  @HostListener('document:click', ['$event']) onClick(event: { target: any }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.checkIfNavDropDown();
    }
  }

  ngOnDestroy() {
    this.resize.unsubscribe();
  }
  private hasAdminRole(user: any): boolean {
    return (
      user &&
      user.roles &&
      user.roles.some((role: any) => role.name === ERole.Admin)
    );
  }

  // Menu items definition
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      iconCss: 'em-icons e-file',
      items: [
        { text: 'Open', iconCss: 'em-icons e-open' },
        { text: 'Save', iconCss: 'em-icons e-save' },
        { separator: true },
        { text: 'Exit' },
      ],
    },
    {
      text: 'Edit',
      iconCss: 'em-icons e-edit',
      items: [
        { text: 'Cut', iconCss: 'em-icons e-cut' },
        { text: 'Copy', iconCss: 'em-icons e-copy' },
        { text: 'Paste', iconCss: 'em-icons e-paste' },
      ],
    },
    {
      text: 'View',
      items: [
        {
          text: 'Toolbars',
          items: [
            { text: 'Menu Bar' },
            { text: 'Bookmarks Toolbar' },
            { text: 'Customize' },
          ],
        },
        {
          text: 'Zoom',
          items: [{ text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Reset' }],
        },
        { text: 'Full Screen' },
      ],
    },
    {
      text: 'Tools',
      items: [
        { text: 'Spelling & Grammar' },
        { text: 'Customize' },
        { separator: true },
        { text: 'Options' },
      ],
    },
    {
      text: 'Help',
    },
  ];
  ngOnInit() {
    this.getUser();
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAdmin = this.hasAdminRole(user);
    });
    /**
     * Although the application doesn't use this.resize. it is used for unsubscribing (memory cleanup)
     */
    this.resize = fromEvent(window, 'resize')
      .pipe(
        throttleTime(500),
        filter(() => !!this.elementRef)
      )
      .subscribe(() => this.checkIfNavDropDown());
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.initCategories();
  }

  checkIfNavDropDown() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  onMenu() {
    this.isOpen = !this.isOpen;
  }
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
  imageData = [
    { src: '../../../assets/society.png', category: 'Society & Culture' },
    { src: '../../../assets/science.png', category: 'Science & Mathematics' },
    { src: '../../../assets/health.png', category: 'Health' },
    { src: '../../../assets/education.png', category: 'Education & Reference' },
    { src: '../../../assets/computer.png', category: 'Computers & Internet' },
    { src: '../../../assets/sports.png', category: 'Sports' },
    { src: '../../../assets/business.png', category: 'Business & Finance' },
    { src: '../../../assets/music.png', category: 'Entertainment & Music' },
    { src: '../../../assets/family.png', category: 'Family & Relationships' },
    { src: '../../../assets/politics.png', category: 'Politics & Government' },
  ];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  public initCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.categories = response;
      });
  }
  categories: any[] = [];
  selectCategory(category: any): void {
    // console.log('Selected category:', category);
    this.menuTrigger.closeMenu();
  }
  public openModal(selectedCategory: any): Observable<boolean | undefined> {
    if (this.dialogOpen) {
      return of();
    }
    const dialogRef: MatDialogRef<PlayTestComponent, boolean> =
      this.dialog.open(PlayTestComponent, {
        width: '35rem',
        disableClose: true,
        data: { selectedCategory }, // Pass the selected category as data
      });

    dialogRef.afterOpened().subscribe(() => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });

    return dialogRef.afterClosed();
  }

  openModalCreateQuestion(): any {
    const dialogRef: MatDialogRef<CreateQuestionModalComponent, boolean> =
      this.dialog.open(CreateQuestionModalComponent, {
        width: '38rem',
        disableClose: true,
      });
  }
}
