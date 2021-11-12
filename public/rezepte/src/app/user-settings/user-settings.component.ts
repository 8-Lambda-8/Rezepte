import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/userData';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  userData: UserData = {
    uid: "",
    name: "",
    permissionClass: 0,
    email: "",
    photoURL: "",
    simpleRecipeMode: false
  }

  constructor(
    private userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    this.subUserData();
  }

  subUserData() {
    this.userDataService.getMyUserData().subscribe(userData => this.userData = userData);
  }

  onSubmit() {
    console.log("Save");
    if (this.userData.name != "") {
      this.userDataService.updateUserData(this.userData);
    }
  }

}
