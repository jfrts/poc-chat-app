import { Component, inject } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';
import { UserService } from '../../../users/user.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-conversation-modal',
  standalone: true,
  imports: [AsyncPipe, UserThumbnailComponent],
  templateUrl: './new-conversation-modal.component.html',
  styleUrl: './new-conversation-modal.component.scss'
})
export class NewConversationModalComponent {
  protected _userService = inject(UserService);
  protected users$ = this.getAllUsersExceptLoggedInUser();

  private getAllUsersExceptLoggedInUser() {
    const loggedUser = this._userService.getUserInfoSignal();
    const contactsList = this._userService
      .getLocalUsers()
      .pipe(
        map(users => users.filter(user => user.id !== loggedUser()!.id))
      );
    return contactsList;
  }
}
