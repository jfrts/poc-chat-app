import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private http = inject(HttpClient);
  private usersEndpoint = `${environment.urlApi}/users`;

  public getUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.usersEndpoint);
    return users;
  }

  public uploadUserImage(userId: string, image: ArrayBuffer) {
    const blobImage = new Blob([image]);
    const formData = new FormData();

    formData.append('image', blobImage); 

    const userImagesEndpoint = `${this.usersEndpoint}/${userId}/image`;
    return this.http.put(userImagesEndpoint, formData);
  }
}