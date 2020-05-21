import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  homePageInfo: string = "Strona powstała na potrzeby pracy magisterskiej. Strona ma na celu ułatwienie nauki programowania w językach Java oraz Groovy. Umożliwia pisanie i kompilowanie kodu w wyżej wymienionych językach jak i też wyliczenie statystyk napisanego kodu. Dodatkowo możliwym jest przeprowadzanie przez nauczycieli quizów oraz zadawanie ćwiczeń wybranym grupom szkoleniowym.";
  
  constructor(private authService: AuthorisationService) {}

  ngOnInit(){}
}
