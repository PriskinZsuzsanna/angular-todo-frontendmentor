import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-frontendmentor';
  localTodos: Array<Todo> = new Array<Todo>
  todos: Array<Todo> = new Array<Todo>
  actual:Todo = new Todo ()
  active:  Array<Todo> = new Array<Todo>
  completed:  Array<Todo> = new Array<Todo>
  left: number = 0;
  isFilterAll:boolean = true
  isFilterActive:boolean = false
  isFilterCompleted:boolean = false

  constructor(){
    this.load()
    this.sortCompleted()
  }

  add(){
    console.log(this.actual)
    this.todos.push(this.actual)
    this.actual= new Todo ()
    this.save()
  }

  load(){
    this.localTodos = JSON.parse(localStorage.getItem("todos") ?? '[]')
    this.todos = this.localTodos
  }

  save(){
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  sortCompleted(){
    this.active = this.todos.filter(todo => {
      return todo.completed == false
    })
    this.completed= this.todos.filter(todo => {
      return todo.completed == true
    })
    this.left = this.active.length
  }

  getFilter(filter:string){
    this.isFilterActive = false;
    this.isFilterAll = false;
    this.isFilterCompleted = false;

    if(filter == "completed"){
      this.todos = this.completed
      this.isFilterCompleted = true
    } else if (filter == "active"){
      this.todos = this.active
      this.isFilterActive = true
    } else {
      this.todos = this.localTodos
      this.isFilterAll = true
    }
  }

  toggleComplete(todo:Todo){
    console.log(todo.completed)
    todo.completed = !todo.completed

  }

}
