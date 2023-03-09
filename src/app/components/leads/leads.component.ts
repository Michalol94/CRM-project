import { ActivityModel } from './../../models/activity/activity.model';
import { LeadModel } from './../../models/lead/lead.model';
import { LeadService } from './../../services/lead/lead.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AuthUserModel } from './../../models/auth-me/auth-me.model';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { LeadsQueryModel } from 'src/app/query-models/leads/leads.query-model';

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
    private _router: Router,
    private _leadsService: LeadService
  ) {}

  logout(): void {
    this._authService
      .logout()
      .subscribe({ next: () => this._router.navigateByUrl('logged-out') });
  }

  leads$: Observable<LeadsQueryModel[]> = combineLatest([
    this._leadsService.getAllLeads(),
    this._leadsService.getAllLeadsActivities(),
  ]).pipe(
    map(([leads, activities]) => this._mapToLeadsQueryModel(leads, activities))
  );

  leadsOnly$: Observable<LeadModel[]> = this._leadsService.getAllLeads();

  activitiesOnly$: Observable<ActivityModel[]> =
    this._leadsService.getAllLeadsActivities();

  private _mapToLeadsQueryModel(
    leads: LeadModel[],
    activities: ActivityModel[]
  ): LeadsQueryModel[] {
    const activityMap = activities.reduce(
      (a, c) => ({ ...a, [c.id]: c }),
      {} as Record<string, ActivityModel>
    );

    return leads.map((lead) => ({
      name: lead.name,
      industry: lead.industry,
      size: lead.companySize,
      annualRevenue: lead.annualRevenue,
      location: lead.location,
      hiring: lead.hiring,
      salesStage: '',
      scope: (lead.activityIds ?? []).map((id) => activityMap[id].name),
    }));
  }
}
