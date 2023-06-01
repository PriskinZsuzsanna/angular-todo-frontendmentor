import { Component} from '@angular/core';
import { Todo } from './todo';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {
  title = 'angular-todo-frontendmentor';
  localTodos: Array<Todo> = new Array<Todo>
  todos: Array<Todo> = new Array<Todo>
  actual: Todo = new Todo()
  active: Array<Todo> = new Array<Todo>
  completed: Array<Todo> = new Array<Todo>
  left: number = 0;
  isFilterAll: boolean = true
  isFilterActive: boolean = false
  isFilterCompleted: boolean = false
  light: boolean = true
  dark: boolean = false

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.load()
    this.sortCompleted()
    
  }


  add() {
    console.log(this.actual)
    //this.todos.push(this.actual)
    this.localTodos.push(this.actual)
    this.actual = new Todo()
    this.sortCompleted()
    this.save()
  }

  load() {
    this.localTodos = JSON.parse(localStorage.getItem("todos") ?? '[]')
    this.todos = this.localTodos
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.localTodos))
  }

  sortCompleted() {
    this.active = this.todos.filter(todo => {
      return todo.completed == false
    })
    this.completed = this.todos.filter(todo => {
      return todo.completed == true
    })
    this.left = this.active.length
  }

  getFilter(filter: string) {
    this.isFilterActive = false;
    this.isFilterAll = false;
    this.isFilterCompleted = false;

    if (filter == "completed") {
      this.todos = this.completed
      this.isFilterCompleted = true
    } else if (filter == "active") {
      this.todos = this.active
      this.isFilterActive = true
    } else {
      this.todos = this.localTodos
      this.isFilterAll = true
    }
  }

  toggleCompleted(todo: Todo) {
    console.log(todo.completed)
    todo.completed = !todo.completed
    this.save()
    this.load()
    this.sortCompleted()
    this.isFilterActive = false
    this.isFilterCompleted = false
    this.isFilterAll = true
  }

  clearCompleted() {
    this.todos.map(todo => {
      todo.completed = false
      this.save()
      this.sortCompleted()
      this.getFilter("all")
      this.isFilterActive = false
      this.isFilterCompleted = false
      this.isFilterAll = true
    })
  }

  delete(t: Todo) {
    this.todos = this.todos.filter(todo => {
      return todo.id != t.id
    })
    this.localTodos = this.localTodos.filter(todo => {
      return todo.id != t.id
    })
    this.save()
    this.getFilter("all")
    this.isFilterActive = false
    this.isFilterCompleted = false
    this.isFilterAll = true
    this.sortCompleted()
  }

  changeMode(){
    this.document.body.classList.toggle("dark");
    this.light = !this.light
    this.dark = !this.dark
  }

}
