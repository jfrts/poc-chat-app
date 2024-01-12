import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private userService = inject(UserService);
  protected users$ = this.userService.getUsers();
}
