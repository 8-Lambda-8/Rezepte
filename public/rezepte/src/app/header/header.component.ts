import { catchError, take } from 'rxjs/operators';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireFunctions } from '@angular/fire/functions';

import { AuthService } from '../service/auth.service';
//import { FEED } from './../../consts/routes.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this.auth.user$;

  @Input() title: string;
  @Output() toggleDrawer = new EventEmitter<string>();

  getRandom: CallableFunction

  constructor(
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private fireFunctions: AngularFireFunctions

  ) {
    this.registerProviderIcons();
    this.getRandom = fireFunctions.httpsCallable('getRandomRecipe');
  }

  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message}`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>
          response &&
          this.snackBar.open(
            'Logged in',
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        //this.router.navigate([`/${FEED}`]);
        this.snackBar.open('Loged out', 'Close', {
          duration: 4000,
        });
      });
  }

  registerProviderIcons() {
    this.iconRegistry
      .addSvgIcon('google-colored', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg'))
      .addSvgIcon('dice', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/dice.svg'))
  }

  getRandomRecipe() {
    let obs: Observable<string> = this.getRandom({ name: 'Bla bla' });
    obs.toPromise().then(randomId => {
      console.log("navigate to " + randomId)
      this.router.navigateByUrl("/recipe/" + randomId).then(() => {
        window.location.reload();
      });
    });

  }

}
