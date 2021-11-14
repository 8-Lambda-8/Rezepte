import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from './models/userData';
import { AuthService } from './service/auth.service';
import { UserDataService } from "./service/user-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rezepte';
  myUserData: UserData = { uid: "", name: "", permissionClass: 0, photoURL: "", email: "", simpleRecipeMode: false };
  constructor(
    userDataService: UserDataService,
    private db: AngularFirestore,
    private readonly auth: AuthService
  ) {
    userDataService.getMyUserData().subscribe(data => {
      this.myUserData = data;
    });
  }
}
