import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-frontendmentor';
  todos: Array<Todo> = new Array<Todo>
  actual:Todo = new Todo ()

  constructor(){
    this.load()
  }

  add(){
    console.log(this.actual)
    this.todos.push(this.actual)
    this.actual= new Todo ()
    this.save()
  }

  load(){
    this.todos = JSON.parse(localStorage.getItem("todos") ?? '[]')
    console.log(this.todos)
  }

  save(){
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }
}
