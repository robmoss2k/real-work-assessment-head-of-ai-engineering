// Using Angular and a provided ApiService from the '@realworld/core/http-client', create a service named RosterService. The service should:
// Import necessary Angular dependencies and the ApiService.
// Be injectable at the root level.
// Have a method getUsers which returns an observable of users using the apiService.
// Have another method getArticles which returns an observable of articles using the same apiService.
import { ApiService } from '@realworld/core/http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<{ users: any }> {
    return this.apiService.get('/users');
  }

  getArticles(): Observable<any> {
    return this.apiService.get('/articles');
  }
}
