import { Component, OnInit } from '@angular/core';
import { QuizCard } from 'src/app/models/quizCard';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  userId: number;

  constructor(private categoryService: CategoryService, 
              private authService: AuthorisationService,
              private alertifyService: AlertifyService){}

  quizCards: QuizCard[]; /* = [ 
    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_1", quizes: [ 
      { quizId: 1, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 10, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 2, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 3, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 9, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 4, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false },
      { quizId: 5, quizTitle: "Quiz_5", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 6, quizTitle: "Quiz_6", maxPoints: 10, userPoints: 8, pointsToPass: 6, userPassed: true, tookPart: true }
    ],
      allPassed: false
    },

    { 
      idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_2", quizes: [ 
      { quizId: 7, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false },
      { quizId: 8, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false },
      { quizId: 9, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false },
      { quizId: 10, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false }
    ],
      allPassed: false
    },

    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_3", quizes: [ 
      { quizId: 11, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 12, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 8, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 13, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 14, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 15, quizTitle: "Quiz_5", maxPoints: 10, userPoints: 8, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 16, quizTitle: "Quiz_6", maxPoints: 10, userPoints: 8, pointsToPass: 6, userPassed: true, tookPart: true }
    ],
      allPassed: true
    },

    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_4", quizes: [ 
      { quizId: 17, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 18, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 19, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 20, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true }
    ],
      allPassed: false
    },
    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_5", quizes: [ 
      { quizId: 1, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true }
    ],
      allPassed: false
    },
    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_6", quizes: [ 
      { quizId: 1, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true }
    ],
      allPassed: true
    },   
    { idCategory: 1,
      quizCategoryTitle: "Tytuł_kategorii_7", quizes: [ 
      { quizId: 1, quizTitle: "Quiz_1", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_2", maxPoints: 10, userPoints: 5, pointsToPass: 6, userPassed: false, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_3", maxPoints: 10, userPoints: 6, pointsToPass: 6, userPassed: true, tookPart: true },
      { quizId: 1, quizTitle: "Quiz_4", maxPoints: 10, userPoints: 0, pointsToPass: 6, userPassed: false, tookPart: false }
    ],
      allPassed: false
    }
  ];*/
  
  ngOnInit() {
    this.userId = this.authService.currentUserValue.idUser;
    this.categoryService.getCategoriesWithQuizes(this.userId).subscribe( data => {
      this.quizCards = data;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

}
