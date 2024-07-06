import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './store/todos.store';
import { JsonPipe } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JsonPipe,TodoListComponent,MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    store=inject(TodoStore)
    ngOnInit(){
      this.store.todo()
      this.loadTodos().then(()=>console.log('loaded'))
    }
    async loadTodos(){
      await this.store.loadAll()
    }
}
