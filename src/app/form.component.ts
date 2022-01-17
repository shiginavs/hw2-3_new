import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {formatDate} from "@angular/common";
import {Item} from "./app.component";
import { ITEMS } from './items';

@Component({
  selector: 'form-app',
  templateUrl: './form.component.html',
  styleUrls: ['./app.component.css'],

})



export class FormComponent implements OnInit{
  myForms : FormGroup;
  constructor(){
    this.myForms = new FormGroup({
      // fio: new FormGroup({
        "surname": new FormControl("", Validators.required),
        "name": new FormControl("", [Validators.required /*, this.studentNameValidator*/]),
        "patronymic": new FormControl("", [Validators.required]),
      // }),
      "date_birth": new FormControl("", [
        Validators.required,
        this.dateValidator
      ]),
      "average_score": new FormControl("", [Validators.required])
    });
  }

  items: Item[] = [];

  @Input() item: Item | undefined;

  ngOnInit(): void {
    this.items = ITEMS;

    if (this.item) {
      this.editingIndex = this.items.indexOf(this.item);
      this.setEditForm(this.item);
    }
  }

  setEditForm(item: Item) {
    this.myForms.patchValue({
      surname: item.surname,
      name: item.name,
      patronymic: item.patronymic,
      date_birth: item.date_birth,
      average_score: item.average_score
    });
  }


  submit(){
    // this.items.push(this.myForms.value as Item);
    // this.myForms.reset();

    const item = this.myForms.value as Item;
    if (this.item) {
      this.items.splice(this.editingIndex, 1, item);
    } else {
      this.items.push(item);
    }
    this.myForms.reset();
    this.onExit.emit();
  }

  editingIndex: number = 0;
  @Output() onExit = new EventEmitter();

  exitForm() {
    this.myForms.reset();
    this.onExit.emit();
  }
  dateValidator(control: FormControl): {[s:string]:boolean}|null{
    let now = new Date().getFullYear();
    let year = new Date(control.value).getFullYear();
    let par = now - year;
    console.log(par);
    if( par < 10){
      return {"date_birth": true};
    }
    return null;
  }

}


