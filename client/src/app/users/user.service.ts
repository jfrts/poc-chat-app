import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private http = inject(HttpClient);
  private endpoint = `${environment.urlApi}/users`;

  public getUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.endpoint);
    return users;
  }
}