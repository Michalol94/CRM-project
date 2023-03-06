import { Router } from '@angular/router';
import { CredentialsRequest } from './../../models/credentials/credentials/credentials.request';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly register: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  onRegisterSubmitted(register: FormGroup): void {
    if (register.invalid) {
      return;
    }
    const credentials: CredentialsRequest = {
      email: register.value.email,
      password: register.value.password,
    };
    this._authService.register(credentials).subscribe({
      next: () => {
        this._authService.login(credentials);
        this._router.navigateByUrl('leads');
      },
    });
  }
}
