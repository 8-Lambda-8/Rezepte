import { Injectable } from '@angular/core';
import { UserData } from "../models/userData";
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private user: firebase.User;

  myUserData: UserData = { uid: "", name: "", permissionClass: 0, photoURL: "", email: "", simpleRecipeMode: false };
  myUserDataChange: Subject<UserData> = new Subject();

  myUserDataObservable: Observable<UserData>;

  constructor(
    private db: AngularFirestore,
    private readonly auth: AuthService,
  ) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      console.log("uid:" + user.uid);
      this.myUserDataObservable = this.db.collection('users').doc<UserData>(user.uid).valueChanges();
      this.myUserDataObservable.subscribe(data => {
        this.myUserData = data;
        this.myUserDataChange.next(data);
      });
    });
  }

  getMyUserData(): Observable<UserData> {
    return this.myUserDataChange.asObservable();
  }

  getUserData(id: string): Observable<UserData> {
    return this.db.collection('users').doc<UserData>(id).valueChanges();
  }

  updateUserData(data: UserData) {
    this.db.collection('users').doc<UserData>(data.uid).update(data);
  }

}
