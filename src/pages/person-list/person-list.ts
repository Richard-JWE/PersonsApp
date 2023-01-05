import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';



/**
 * Generated class for the PersonListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person-list',
  templateUrl: 'person-list.html',
})
//@Injectable({ providedIn: 'root' })
export class PersonListPage {
  persons: string[];
  results: any = [];
  isFetching = false;
  //results: object<any>;
    @Output() personCreate = new EventEmitter<string>();   
    enteredPersonName = '';
    personsChanged = new Subject<string[]>();
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  
  }
  fetchPersons() {
    this.http.get<any>('https://swapi.dev/api/people').pipe(map(resData => {
      return resData.results.map(character => character.name);

    })
    )
    .subscribe(resData => {
      this.personsChanged.next(resData);
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonListPage');
  }

 
    

  onCreatePerson(personName: string){
      console.log("Created a person: " + this.enteredPersonName);
      this.personCreate.emit(this.enteredPersonName);
      this.persons.push(this.enteredPersonName);
      this.enteredPersonName = '';
      
  }
  ngOnInit() {
    this.fetchPersons();
    this.personsChanged.subscribe(persons => {
      this.persons = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.fetchPersons();
  }

  addPerson(enteredPersonName: string) {
    this.persons.push(enteredPersonName);
    this.personsChanged.next(this.persons);
    console.log(this.persons);
  }
  removePerson(enteredPersonName: string) {
    this.persons = this.persons.filter(person => {
      return person !== enteredPersonName;
    });
    this.personsChanged.next(this.persons);
    console.log(this.persons);
  }

  onRemovePerson(enteredPersonName: string) {
    this.removePerson(enteredPersonName);
  }
  // ngOnDestroy() {
  //   this.personListSub.unsubscribe();
  // }

}
