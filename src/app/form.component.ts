import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Item } from "./app.component";
import { ITEMS } from "./items";

@Component({
  selector: "form-app",
  templateUrl: "./form.component.html",
  styleUrls: ["./app.component.css"],

})



export class FormComponent implements OnInit{
  myForms: FormGroup;
  constructor(){
    this.myForms = new FormGroup({
      // fio: new FormGroup({
        "surname": new FormControl("", Validators.required),
        "name": new FormControl("", [Validators.required]),
        "patronymic": new FormControl("", [Validators.required]),
      // }),
      "dateBirth": new FormControl("", [
        Validators.required,
        this.dateValidator,
      ]),
      "averageScore": new FormControl("", [Validators.required])
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

  setEditForm(item: Item): void {
    this.myForms.patchValue({
      surname: item.surname,
      name: item.name,
      patronymic: item.patronymic,
      dateBirth: item.dateBirth,
      averageSore: item.averageScore
    });
  }


  submit(): void{
    // this.items.push(this.myForms.value as Item);
    // this.myForms.reset();

    const item = this.myForms.value as Item;
    if (this.item) {
      this.items.splice(this.editingIndex, 1, item);
    } else {
      this.items.push(item);
    }
    this.myForms.reset();
    this.exit.emit();
  }

  editingIndex: number = 0;
  @Output() exit = new EventEmitter();

  exitForm(): void {
    this.myForms.reset();
    this.exit.emit();
  }
  dateValidator(control: FormControl): { [s: string]: boolean } | null{
    const now = new Date().getFullYear();
    const year = new Date(control.value).getFullYear();
    const par = now - year;
    console.log(par);
    if ( par < 10) {
      return { "dateBirth": true };
    }
    return null;
  }

}


