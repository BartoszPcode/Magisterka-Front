import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminPanelService } from 'src/app/services/admin-panel.service';
import { UserForAdminPanel } from 'src/app/models/usersForAdminPanel';
import { IgxTreeGridComponent, IgxGridComponent } from 'igniteui-angular';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { StudentGroup } from 'src/app/models/studentGroup';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  usersForPanel: UserForAdminPanel[] = [];
  loaded: boolean = false;
  number: number = 1;
  displayedColumns: string[] = ['imie', 'nazwisko', 'login', 'studentGroup', 'albumNo', 'registerDate', 'admin', 'teacher'];
  dataSource: MatTableDataSource<UserForAdminPanel>;

  newGroupName = new FormControl('', Validators.required);
  studentGroupsDTO: StudentGroup[] = [];
  studentGroups: string[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private adminPanelService: AdminPanelService,
              private alertifyService: AlertifyService) 
  {
    this.getAllGroups();
    this.getAllUsers();
  }

  ngOnInit() {
    
  }

  convertDate(dateParameter: Date): string{
    let dateLocal = "" + dateParameter;
    let dateConverted = dateLocal.replace("T", " ");
    dateConverted = dateConverted.substring(0, dateConverted.length - 4);
    
    return dateConverted;
  }
  
  newGroup(){
    let newGroup = this.newGroupName.value;
    if(this.newGroupName.invalid != true){
      this.adminPanelService.addGroup(this.newGroupName.value).subscribe( 
        data => {
          this.getAllGroups();
          this.newGroupName.setValue("");
          this.newGroupName.markAsUntouched();
          this.alertifyService.success("Dodano grupe");
      },
        errors => {
          this.alertifyService.errorServerConnection();
      });
    }
  }

  checkAdmin(element, flag){    
    if(element.teacher == true){
      element.teacher = false;
    }
    let user = new UserForAdminPanel();
    user.admin = !flag;
    user.albumNo = element.albumNo;
    user.idUser = element.idUser;
    user.imie = element.imie;
    user.login = element.login;
    user.nazwisko = element.nazwisko;
    user.studentGroup = element.studentGroup;
    user.teacher = element.teacher;

    this.updateData(user);
  }

  checkTeacher(element, flag){
    if(element.admin == true){
      element.admin = false;
    }

    //jest tak zapis usera bo był problem z przekazywaniem elementu (miał starą wartosć admina)
    let user = new UserForAdminPanel();
    user.admin = element.admin;
    user.albumNo = element.albumNo;
    user.idUser = element.idUser;
    user.imie = element.imie;
    user.login = element.login;
    user.nazwisko = element.nazwisko;
    user.studentGroup = element.studentGroup;
    user.teacher = !flag;
    
    this.updateData(user);
  }

  updateData(element: UserForAdminPanel){
    this.adminPanelService.updateUser(element).subscribe( 
      users => {
        this.alertifyService.success("Zapisano");
    },
      errors => {
        this.alertifyService.error("Wystąpił błąd podczas zapisu");
    });
  }

  updateDataAfterGroupChange(element: UserForAdminPanel){
    this.adminPanelService.updateUser(element).subscribe( 
      users => {
        //this.alertifyService.success("Zapisano");
    },
      errors => {
        this.alertifyService.error("Wystąpił błąd podczas zapisu");
    });
  }

  findStudentGroupId(studentGroupName){
    let elem = this.studentGroupsDTO.find(x => x.groupName == studentGroupName);
    return elem.idStudentGroup;
  }

  findStudentGroup(studentGroupName){
    return this.studentGroupsDTO.find(x => x.groupName == studentGroupName);
  }

  studentGroupChange(value, element){
    if(value != null){
      if(element.studentGroup != null){
        element.studentGroup.idStudentGroup = this.findStudentGroupId(value);
      }else{
        let x = {idStudentGroup: this.findStudentGroupId(value), groupName: value};

        element.studentGroup = x;
      }   
    }else{
      element.studentGroup = {idStudentGroup: -1, groupName: ""};;
    }    
    this.updateDataAfterGroupChange(element);
  }

  getAllGroups(){
    this.adminPanelService.getAllGroups().subscribe( 
      groups => {
        this.studentGroupsDTO = groups;
        
        for(let i = 0; i < this.studentGroupsDTO.length; i++){
          this.studentGroups.push(this.studentGroupsDTO[i].groupName);
        }
    },
      errors => {
        this.alertifyService.errorServerConnection();
    });
  }

  getAllUsers(){
    this.usersForPanel = [];
    this.adminPanelService.getAllUsers().subscribe( 
      users => {
        this.usersForPanel = users;
        this.dataSource = new MatTableDataSource(this.usersForPanel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    },
      errors => {
        this.alertifyService.errorServerConnection();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}