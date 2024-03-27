import { Component, ElementRef, HostListener } from '@angular/core';
import { Subscription, filter, fromEvent, throttleTime } from 'rxjs';
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

  constructor(private readonly authService: AuthService,private elementRef: ElementRef) {}

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
  }

  checkIfNavDropDown() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  onMenu() {
    this.isOpen = !this.isOpen;
  }
}
