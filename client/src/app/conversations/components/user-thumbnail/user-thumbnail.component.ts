import { Component, inject } from '@angular/core';
import { UserService } from '../../../users/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-thumbnail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-thumbnail.component.html',
  styleUrl: './user-thumbnail.component.scss'
})
export class UserThumbnailComponent {
  private _userService = inject(UserService);
  protected userInfo = this._userService.getUserInfoSignal();
  protected userImageURL$ = this._userService.getCurrentUserImage();
}
