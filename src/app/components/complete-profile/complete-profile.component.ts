import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-complete-profile',
  styleUrls: ['./complete-profile.component.scss'],
  templateUrl: './complete-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteProfileComponent {
  readonly completeProfile: FormGroup = new FormGroup({
    bio: new FormControl(),
  });

  constructor(private _userService: UserService, private _router: Router) {}

  onCompleteProfileSubmitted(completeProfile: FormGroup): void {
    if (completeProfile.invalid) {
      return;
    }
    this._userService
      .completeProfile(completeProfile.value.bio)
      .subscribe({ next: () => this._router.navigateByUrl('leads') });
  }
}
