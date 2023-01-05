import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//importing the HTTP client for use
import { Observable } from 'rxjs';


@Injectable()

export class PersonService {
    result: any = [];
    resData: Observable<any>;
    constructor(private http: HttpClient) { }
    getAllQuotes() {
        this.http.get('https://swapi.dev/api/people').subscribe((resData) => console.log(resData));
        console.log(this.getAllQuotes);
    }

    getData() {
        var url = 'https://swapi.dev/api/people';
        this.resData = this.http.get(url);
        this.resData.subscribe(resData => {
            this.result = resData;
        });
    }
}
