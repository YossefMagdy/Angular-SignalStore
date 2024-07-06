import { Injectable } from "@angular/core";
import { Todos } from "../model/mock-data";
import { Observable, of } from "rxjs";
import { Todo } from "../model/todo.modol";
import { TodosState } from "../store/todos.store";


@Injectable({
    providedIn:'root'
})
export class TodoService{


     getTodosData(){
        return  of(Todos) ;
    }

    addTodo(todo:Partial<Todo>):Observable<Todo>{
        return of({
            id:Math.floor(Math.random()*100),
            ...todo
        } as Todo) 
    }

    deleteTodo(id:String){
        return of(id);
    }

    updateToDo(id:string,completed:boolean){
        return of({id:id,completed:completed});  
    }


}

async function sleep(ms:number){
    return new Promise(resolve=>setTimeout(resolve,ms))
    
}