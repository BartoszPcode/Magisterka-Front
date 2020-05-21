import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserForAdminPanel } from '../models/usersForAdminPanel';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private http: HttpClient) { }

  public getAllUsers(){
    return this.http.get<any>(`${environment.apiURL}AdminPanel/getAllUsers`);
  }

  public updateUser(user: UserForAdminPanel){
    return this.http.post<any>(`${environment.apiURL}AdminPanel/updateUser`, user);
  }

  public getAllGroups(){
    return this.http.get<any>(`${environment.apiURL}AdminPanel/getAllGroups`);
  }

  public addGroup(groupName: string ){
    return this.http.put<any>(`${environment.apiURL}AdminPanel/addGroup/${groupName}`, null);
  }
}
