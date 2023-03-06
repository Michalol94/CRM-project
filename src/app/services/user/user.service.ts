import { AuthUserModel } from './../../models/auth-me/auth-me.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  shareReplay,
  tap,
  map,
  catchError,
  throwError,
  of,
} from 'rxjs';
import { ResponseModel } from './../../models/response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  completeProfile(content: string): Observable<void> {
    return this._httpClient.post<void>(
      'https://us-central1-courses-auth.cloudfunctions.net/auth/add-bio',
      { data: { content } }
    );
  }

  isVerified(): Observable<boolean> {
    return this._httpClient
      .get<boolean>(
        'https://us-central1-courses-auth.cloudfunctions.net/auth/my-bio'
      )
      .pipe(
        tap((resp) => console.log('metoda isVerified', resp)),
        catchError((e) => {
          if (e.status === 404) {
            return of(false);
          }
          return of(true);
        })
      );
  }

  private meInfo$: Observable<AuthUserModel | undefined> = this._httpClient
    .get<ResponseModel<{ user: { context: AuthUserModel } }>>(
      'https://us-central1-courses-auth.cloudfunctions.net/auth/me'
    )
    .pipe(
      shareReplay(1),
      map((resp) => resp.data.user.context),
      catchError((err) => of(undefined))
    );

  getMe(): Observable<AuthUserModel | undefined> {
    return this.meInfo$.pipe(
      tap((resp) => console.log('jestem w funkcji getMe', resp))
    );
  }
}
