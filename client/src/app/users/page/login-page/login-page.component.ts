import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, take } from 'rxjs';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  @ViewChild('upload_image_input', { static: true, read: ElementRef }) private inputFile!: ElementRef;
  private userService = inject(UserService);
  private router = inject(Router);
  private lastUserIdClicked = '';
  protected users$ = this.userService.getUsers();

  refreshUsers() {
    this.users$ = this.userService
      .getUsers()
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      )
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files as FileList;

    if (selectedFile.length === 0) {
      return
    };

    const file = selectedFile[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const fileInBytes = reader.result as ArrayBuffer;
      this.userService.uploadUserImage(this.lastUserIdClicked, fileInBytes)
        .subscribe(() => {
          this.refreshUsers();
        });
    }
  }

  onImageButtonClicked(event: Event, userId: string) {
    event.stopPropagation();
    this.lastUserIdClicked = userId;
    this.inputFile.nativeElement.click();
  }

  onClickUser(user: User) {
    this.userService.login(user.id)
      .pipe(take(1))
      .subscribe(response => {
        this.userService.setCurrentUser({
          ...user,
          token: response.token
        });

        this.router.navigate(["chat"]);
      });
  }
}
