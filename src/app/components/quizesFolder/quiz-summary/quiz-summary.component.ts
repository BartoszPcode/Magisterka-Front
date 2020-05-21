import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizSummaryModel } from 'src/app/models/quizSummaryModel';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.css']
})
export class QuizSummaryComponent implements OnInit {

  quizSummary: any;
  quizPass: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.quizSummary = this.route.snapshot.queryParams;
    });
    this.quizPass = "" +this.quizSummary.passed;
  }
}
