import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
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
  public selectedLanguage: string;
  public isOpen = false;
  public resize: Subscription;
  public title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;
  public isMobile = true;
  public isCollapsed = true;
  @HostListener('document:click', ['$event']) onClick(event: { target: any }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.checkIfNavDropDown();
    }
  }
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
  public imageData = [
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
  public categories: any[] = [];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(
    private observer: BreakpointObserver,
    private readonly authService: AuthService,
    private elementRef: ElementRef,
    private readonly dialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService,
    private readonly translateService: TranslateService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.getUser();
    this.selectedLanguage =
      this.localStorage.retrieve('selectedLanguage') ||
      this.translateService.currentLang;

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
      this.isAdmin = this.hasAdminRole(user);
    });

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

  ngOnDestroy() {
    this.resize.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

  public getUser(): void {
    this.user = this.authService.getUser();
    this.username = this.user.username;
  }

  public openMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  public changeLanguage(language: string): void {
    this.translateService.use(language);
    this.localStorage.store('selectedLanguage', language);
    this.selectedLanguage = language;
  }

  private hasAdminRole(user: any): boolean {
    return (
      user &&
      user.roles &&
      user.roles.some((role: any) => role.name === ERole.Admin)
    );
  }

  public checkIfNavDropDown() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  public onMenu() {
    this.isOpen = !this.isOpen;
  }

  public toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  public initCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.categories = response;
      });
  }

  publicselectCategory(category: any): void {
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
        data: { selectedCategory },
      });

    dialogRef.afterOpened().subscribe(() => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });

    return dialogRef.afterClosed();
  }

  public openModalCreateQuestion(): any {
    this.dialog.open(CreateQuestionModalComponent, {
      width: '38rem',
      disableClose: true,
    });
  }
}
