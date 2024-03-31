import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() name: string = '';

  initials: string = '';
  backgroundColor: string = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.name);
    this.backgroundColor = this.getRandomColor();
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map(n => n.charAt(0)).join('').toUpperCase();
  }

  getRandomColor(): string {
    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#673AB7', '#FF5722', '#795548', '#607D8B'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
