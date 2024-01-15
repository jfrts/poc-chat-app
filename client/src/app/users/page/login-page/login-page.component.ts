import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  @ViewChild('upload_image_input', { static: true, read: ElementRef })
  private inputFile!: ElementRef;
  private userService = inject(UserService);
  private lastUserIdClicked = '';
  protected users$ = this.userService.getUsers();

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
        .subscribe(() => console.log("DEU BOM!"));
    }
  }

  onImageButtonClicked(userId: string) {
    this.lastUserIdClicked = userId;
    this.inputFile.nativeElement.click();
  }
}
