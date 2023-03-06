import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AuthUserModel } from './../../models/auth-me/auth-me.model';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-leads',
  styleUrls: ['./leads.component.scss'],
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsComponent {
  readonly me$: Observable<AuthUserModel | undefined | unknown> =
    this._userService.getMe();

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  logout(): void {
    this._authService
      .logout()
      .subscribe({ next: () => this._router.navigateByUrl('logged-out') });
  }
}
