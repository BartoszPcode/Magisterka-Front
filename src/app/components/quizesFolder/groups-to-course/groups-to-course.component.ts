import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CategoryService } from 'src/app/services/category.service';
import { StudentGroupsForCategory } from 'src/app/models/studentGroupsForCategory';
import { GroupToCategoryEditDTO } from 'src/app/models/groupToCategoryEditDTO';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-groups-to-course',
  templateUrl: './groups-to-course.component.html',
  styleUrls: ['./groups-to-course.component.css']
})
export class GroupsToCourseComponent implements OnInit {
  
  @Input() idCategory: number;
  @Output() endAddingGroups: EventEmitter<boolean> = new EventEmitter();
  
  constructor(private categoryService: CategoryService,
              private alertifyService: AlertifyService) { }

  groups: StudentGroupsForCategory;

  ngOnInit() {
    this.loadGroupsForCategory();
  }

  todo = [
    /*'Get to work',
    'Pick up groceries',
    'Go home'*/
  ];

  done = [
    /*'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Get up'*/
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let movedGroupName = event.previousContainer.data[event.previousIndex];
      let movedGroupContainer = event.container.id;
      let movedGroup = this.groups.allGroups.find(x => x.groupName == movedGroupName);
      let editGroupToCategory = new GroupToCategoryEditDTO();
      editGroupToCategory.categoryId = this.idCategory;
      editGroupToCategory.idStudentGroup = movedGroup.idStudentGroup;
      if(movedGroupContainer == "signedGroups"){   
        this.categoryService.addGroupToCategory(editGroupToCategory).subscribe( data => {       
          this.alertifyService.success("Dodano");
        }, error => {
          this.alertifyService.errorServerConnection();
        });
      }else if (movedGroupContainer == "otherGroups")
      {
        this.categoryService.deleteGroupToCategory(editGroupToCategory).subscribe( data => {       
          this.alertifyService.success("Usunięto");
        }, error => {
          this.alertifyService.errorServerConnection();
        });
      }

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  loadGroupsForCategory(){
    this.categoryService.getGroupsForCategory(this.idCategory).subscribe( data => {
      this.groups = data;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  endAdding(){
    this.endAddingGroups.emit(false);
  }
}
