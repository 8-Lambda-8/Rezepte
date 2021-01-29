import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from './models/userData';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rezepte';
  myUserData: UserData =  {uid:"",name:"",permissionClass:0,photoURL:"",email:""};
  constructor(
    private db: AngularFirestore,
    private readonly auth: AuthService
  ){
    this.auth.user$.subscribe(user =>{
      this.db.collection('users').doc<UserData>(user.uid).valueChanges().subscribe(data=>this.myUserData=data)
    });
  }
}
