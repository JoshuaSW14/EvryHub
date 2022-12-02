import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean;
  user: User;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as User;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
