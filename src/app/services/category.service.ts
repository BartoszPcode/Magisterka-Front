import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryAddDTO } from '../models/categoryAddDTO';
import { GroupToCategoryEditDTO } from '../models/groupToCategoryEditDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public addCategory(categoryAddDTO: CategoryAddDTO ){
    return this.http.put(`${environment.apiURL}Category/addCategory`, categoryAddDTO);
  }

  public addGroupToCategory(groupToCategoryEditDTO: GroupToCategoryEditDTO ){
    return this.http.put(`${environment.apiURL}Category/addGroupToCategory`, groupToCategoryEditDTO);
  }

  public deleteGroupToCategory(groupToCategoryEditDTO: GroupToCategoryEditDTO ){
    return this.http.post(`${environment.apiURL}Category/deleteGroupToCategory`, groupToCategoryEditDTO);
  }

  public getUserCategories(userId: number){
    return this.http.get<any>(`${environment.apiURL}Category/getUserCategories/` + userId);
  }

  public getGroupsForCategory(categoryId: number){
    return this.http.get<any>(`${environment.apiURL}Category/getGroupsForCategory/` + categoryId);
  }

  public getCategoriesWithQuizes(userId: number){
    return this.http.get<any>(`${environment.apiURL}Category/getCategoriesWithQuizes/` + userId);
  }
}
