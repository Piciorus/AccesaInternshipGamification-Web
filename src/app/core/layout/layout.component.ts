import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription, filter, fromEvent, of, throttleTime } from 'rxjs';
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
  protected readonly ERole = ERole;
  private dialogOpen = false;

  constructor(private observer: BreakpointObserver,private readonly authService: AuthService,private elementRef: ElementRef,private readonly dialog: MatDialog) {}

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
  @HostListener("document:click", ["$event"]) onClick(event: { target: any; }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.checkIfNavDropDown();
    }
  }

  ngOnDestroy() {
    /**
     * It's a good habit to unsubscribe from observable event to prevent memory leak. If your application create 
     * streams without cleaning up it can be a memory hog and will eventually crash. 
     */
    this.resize.unsubscribe();
  }

  ngOnInit() {
    this.getUser();

    /**
     * Although the application doesn't use this.resize. it is used for unsubscribing (memory cleanup)
     */
    this.resize = fromEvent(window, "resize")
      .pipe(
        throttleTime(500),
        filter(() => !!this.elementRef)
      )
      .subscribe(() => this.checkIfNavDropDown());
      this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
        if(screenSize.matches){
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
  isMobile= true;
  isCollapsed = true;

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
  public openModal(): Observable<boolean | undefined> {
    if (this.dialogOpen) {
      return of();
    }

    const dialogRef: MatDialogRef<PlayTestComponent, boolean> =
      this.dialog.open(PlayTestComponent, {
        width: '35rem',
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
