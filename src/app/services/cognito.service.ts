import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, Amplify } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public async signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }

  public async getUser(): Promise<any> {
    return await Auth.currentUserInfo();
  }

  public updateUser(user: User): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}
