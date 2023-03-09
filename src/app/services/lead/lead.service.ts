import { ResponseModel } from './../../models/response.model';
import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadModel } from 'src/app/models/lead/lead.model';
import { ActivityModel } from 'src/app/models/activity/activity.model';

@Injectable({ providedIn: 'root' })
export class LeadService {
  constructor(private _httpClient: HttpClient) {}
  getAllLeads(): Observable<LeadModel[]> {
    return this._httpClient
      .get<ResponseModel<LeadModel[]>>(
        'https://us-central1-courses-auth.cloudfunctions.net/leads'
      )
      .pipe(
        tap((resp) => console.log(resp.data)),
        map((resp) => resp.data)
      );
  }
  getAllLeadsActivities(): Observable<ActivityModel[]> {
    return this._httpClient
      .get<ResponseModel<ActivityModel[]>>(
        'https://us-central1-courses-auth.cloudfunctions.net/leads/activities'
      )
      .pipe(map((resp) => resp.data));
  }
}
