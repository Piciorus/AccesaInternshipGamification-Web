import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Observable,
  Subscription,
  filter,
  fromEvent,
  of,
  throttleTime,
} from 'rxjs';
import { CreateQuestionModalComponent } from 'src/app/apps/home/create-question-modal/create-question-modal.component';
import { PlayTestComponent } from 'src/app/apps/play-test/play-test.component';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { ERole } from 'src/app/libs/models/erole';

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
    private readonly dialog: MatDialog
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

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  categories: any[] = [
    { id: '67d61204-f4e5-4c14-8d18-e8a3cfcc3c1e', name: 'Society & Culture' },
    {
      id: '3a847d75-4584-467e-b34b-83cf467d9259',
      name: 'Science & Mathematics',
    },
    { id: 'd167f742-44fb-4a74-9399-8396bf65a5a4', name: 'Health' },
    {
      id: 'e5956468-bfda-43cb-9bde-e6f57633702c',
      name: 'Education & Reference',
    },
    {
      id: 'bba75ce0-4fb4-42bd-a110-d4e92b743550',
      name: 'Computers & Internet',
    },
    { id: 'd19ff812-9ec5-4eaa-b971-6aabfd61314c', name: 'Sports' },
    { id: '42bdd086-d384-451a-9357-899a8d51fdd7', name: 'Business & Finance' },
    {
      id: '67dbd6d6-5952-4f50-b5ce-3d111d0a06a6',
      name: 'Entertainment & Music',
    },
    {
      id: '5f47cc48-ccba-4790-902a-16d98bf81c81',
      name: 'Family & Relationships',
    },
    {
      id: 'b67945ad-3d73-449b-8824-baa08c9479b6',
      name: 'Politics & Government',
    },
  ];
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

  openModalCreateQuestion(): Observable<boolean | undefined> {
    if (this.dialogOpen) {
      return of();
    }

    const dialogRef: MatDialogRef<CreateQuestionModalComponent, boolean> =
      this.dialog.open(CreateQuestionModalComponent, {
        width: '38rem',
        disableClose: true,
      });

    dialogRef.afterOpened().subscribe(() => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });

    return dialogRef.afterClosed();
  }
}
