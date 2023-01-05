import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { HomeService } from './home.service';
// import { ngOnInit } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // Injectable: 'home.service'
})

// @Injectable({providedIn: 'root'})
//   export class HomeService {}


export class HomePage {
    @Output() personCreate = new EventEmitter<string>();   
    enteredPersonName = '';
    personsChanged = new Subject<string[]>();
    persons = ['Max', 'Manuel', 'Anna'];
    

  onCreatePerson(personName: string){
      console.log("Created a person: " + this.enteredPersonName);
      this.personCreate.emit(this.enteredPersonName);
      this.persons.push(this.enteredPersonName);
      this.enteredPersonName = '';
      
  }
    ngOnInit() {
    this.personsChanged.subscribe();
  }


  constructor(public navCtrl: NavController) {
    //this.navCtrl.setRoot(HomeService);
  }

  // ngOnInit() {
  //   this.persons;
  // }

  addPerson(enteredPersonName: string) {
    this.persons.push(enteredPersonName);
    this.personsChanged.next(this.persons);
    console.log(this.persons);
  }
  removePerson(enteredPersonName: string) {
    this.persons = this.persons.filter(person => {
      return person !== enteredPersonName;
    });
    console.log(this.persons);
  }

  onRemovePerson(enteredPersonName: string) {
    this.removePerson(enteredPersonName);
  }

  navigateToInputPage() {
    this.navCtrl.push("InputPage");
  }
  navigateToPersonList() {
    this.navCtrl.push("PersonListPage");
  }


}
