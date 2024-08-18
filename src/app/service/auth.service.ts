import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

}




// import { Injectable } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// FormsModule
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private users: { [username: string]: string } = {};
//   private currentUser: string | null = null;

//   constructor(private router: Router) {}

//   register(username: string,  password?: string,): boolean {
//     if (this.users[username]) {
//       return false;
//     }
//     this.users[username] = password;
//     return true;
//   }

//   login(username: string, password: string): boolean {
//     if (this.users[username] && this.users[username] === password) {
//       this.currentUser = username;
//       return true;
//     }
//     return false;
//   }

//   logout(): void {
//     this.currentUser = null;
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     return this.currentUser !== null;
//   }
// }
