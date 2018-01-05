import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(url: string) {
    //debugger;
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: 'http://localhost:8012/Ascentic/API/src/aspnet.json', name: 'Asp.Net' },
      { id: 'http://localhost:8012/Ascentic/API/src/data/csharp.json', name: 'C Sharp' },
      { id: 'http://localhost:8012/Ascentic/API/src/data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

}
