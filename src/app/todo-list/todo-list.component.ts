import { Component, effect, inject, viewChild } from '@angular/core';
import {MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import { TodosFilter, TodoStore } from '../store/todos.store';
import {MatListModule} from '@angular/material/list';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgStyle,MatFormFieldModule,MatInputModule,MatIconModule,MatLabel,MatSuffix,MatButtonToggleModule,MatListModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


  store=inject(TodoStore)
  filter=viewChild.required(MatButtonToggleGroup)
  
  constructor(){
    effect(()=>{
      const filter=this.filter()
      filter.value=this.store.filter()
    })
  }

  
  async onAddTodo(title:string) {
   await this.store.addToDo(title)
    }

    async onDeleteToDo(id: string,event: MouseEvent) {
      this.store.deleteTodo(id)
      await event.stopPropagation()
    }
    onTodoToggle(id: string,completed: boolean) {
      this.store.updateToDo(id,completed)
      }

      onFilterChange(event: MatButtonToggleChange) {
        const filter=event.value as TodosFilter
        this.store.updateFilter(filter)
        }
   
}
