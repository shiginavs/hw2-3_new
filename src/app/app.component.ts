import { Component, OnInit } from "@angular/core";
import { ITEMS } from "./items";



export class Item {
  surname: string;
  name: string;
  patronymic: string;
  dateBirth: Date;
  averageScore: number;

  constructor(surname: string, name: string, patronymic: string, dateBirth: Date, averageScore: number) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.dateBirth = dateBirth;
    this.averageScore = averageScore;
  }
}


@Component({
  selector: "student-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],

})


export class AppComponent implements OnInit{
  items: Item[] = [];
  title: string = "" ;

  ngOnInit(): void {
    this.items = ITEMS;
  }

  // items: Item[] = [
  //   { surname: 'Иванов', name: 'Иван', patronymic: 'Иванович', date_birth: new Date(1999, 2, 10), average_score: 4.8 },
  //   { surname: 'Сергеев', name: 'Сергей', patronymic: 'Сергеевич', date_birth: new Date(1997, 5, 15), average_score: 3.8 },
  //   { surname: 'Сергеев', name: 'Иван', patronymic: 'Сергеевич', date_birth: new Date(1997, 5, 15), average_score: 3.0 },
  //   { surname: 'Владимиров', name: 'Владимир', patronymic: 'Владимирович', date_birth: new Date(1996, 7, 1), average_score: 2.7 },
  //   { surname: 'Скворцова', name: 'Татьяна', patronymic: 'Ивановна', date_birth: new Date(2000, 12, 12), average_score: 3.5 },
  //   { surname: 'Левашова', name: 'Мария', patronymic: 'Николаевна', date_birth: new Date(1998, 1, 5), average_score: 4.5 },
  // ]

  trColor = false;


  firstname: string = "";
  surname: string = "";
  one: number = 0;
  two: number = 0;
  isFindName = false;
  oneDate = 6 / 15 / 97;
  twoDate = 6 / 15 / 97;



  onFilter(item: Item): boolean{
    if ( this.firstname == null || this.firstname.trim() === ""){
      if ( this.surname?.length && item.surname.includes(this.surname)){
        return true;
      }
    }

    if (this.surname == null || this.surname.trim() === ""){
      if (this.firstname?.length && item.name.includes(this.firstname)){
        return true;
      }
    }


    if ((this.firstname?.length && item.name.includes(this.firstname)) && (this.surname?.length && item.surname.includes(this.surname))){
      return true;
    }
    return false;
  }

  findItem(firstname: string, surname: string, item: Item): void {
    if ( ( firstname == null && surname == null ) || (firstname.trim() === "" && surname.trim() === "") ) {
return;
}
    if (surname == null || surname.trim() === "") {
      if ( item.surname.includes(this.surname) && item.name.includes(this.firstname)){
        this.isFindName = true;
      }
      // this.items.filter(el => el.name == firstname);
      // this.isFindName = true;

    } else if (firstname == null || firstname.trim() === "") {
      console.log(this.items.filter((el) => el.surname === surname));
      } else {
        console.log(this.items.filter((el) => el.surname === surname && el.name === firstname));
      }
  }

  filterColumnSurname(): void {
    this.items.sort((a, b) => {
      if (a.surname > b.surname) {
        return 1;
      }
      if (a.surname < b.surname) {
        return -1;
      }

      return 0;
    });
  }

  filterColumnName(): void {
    this.items.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
  }

  filterColumnPatronymic(): void {
    this.items.sort((a, b) => {
      if (a.patronymic > b.patronymic) {
        return 1;
      }
      if (a.patronymic < b.patronymic) {
        return -1;
      }
      return 0;
    });
  }

  filterColumnBirth(): void {
    this.items.sort((a, b) => {
      if (a.dateBirth > b.dateBirth) {
        return 1;
      }
      if (a.dateBirth < b.dateBirth) {
        return -1;
      }

      return 0;
    });
  }

  filterColumnScore(): void {
    this.items.sort((a, b) => {
      if (a.averageScore > b.averageScore) {
        return 1;
      }
      if (a.averageScore < b.averageScore) {
        return -1;
      }

      return 0;
    });
  }

  display = false;


  deleteStudent(i: number): void{
    this.display = !this.display;
  }

  yesDel(i: number): void {
  this.items.splice(i, 1);
  this.display = !this.display;
}

  noDel(): void {
    this.display = !this.display;
  }

  filterItem(one: number, two: number): void{

  }

  filterDateItem(oneDate: number, twoDate: number): void{

  }

  formOpen = false;


  onAdd(): void {
    this.formOpen = true;
  }

  editItem: Item | undefined ;

  onEdit(item: Item): void {
    this.editItem = item;
    this.formOpen = true;
  }

  closeForm(): void {
    this.formOpen = false;

  }

}
