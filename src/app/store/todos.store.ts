import { computed, inject } from "@angular/core";
import { Todo } from "../model/todo.modol";
import { patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import { TodoService } from "../sevices/todo.service";

   export type TodosFilter='all' |'pending'|'completed'

    export interface TodosState{
        todo:Todo[];
        loading:boolean;
        filter:TodosFilter,
    }


    const initalstate:TodosState={
        todo:[],
        loading:false,
        filter:'all',
    }

    export const TodoStore=signalStore(
        {providedIn:'root'},
        withState(initalstate),
        withMethods(
            (store,todoService=inject(TodoService))=>({
                
                    loadAll(){
                        patchState(store,{loading:true});
                        todoService.getTodosData().subscribe((todos)=>{
                            setTimeout(() => {
                                patchState(store,{todo:todos,loading:false}) 
                            }, 1000);
                        })
                    },

                    addToDo(title:string){
                        patchState(store,{loading:true});
                        todoService.addTodo({title,completed:false}).subscribe((todo)=>{
                            setTimeout(() => {
                                patchState(store,(state)=>({
                                    todo:[...state.todo,todo],
                                    loading:false,
                                })) 
                            }, 100);
                        })
                    },

                    deleteTodo(id:string){
                        todoService.deleteTodo(id).subscribe(()=>{
                            patchState(store,(state)=>({todo:state.todo.filter(todo=>todo.id!==id)}))
                        })
                        
                    },
                    updateToDo(id:string,completed:boolean){
                        todoService.updateToDo(id,completed).subscribe((todo)=>{
                            patchState(store,(state)=>({todo:state.todo.map((todo=>todo.id===id?{...todo,completed}:todo))}))
                        })
                    },

                    updateFilter(filter:TodosFilter){
                        patchState(store,{filter})
                    }
                
            })
                
            
        ),
        withComputed((state)=>({
            filteredTodos:computed(()=>{
                const todos=state.todo();
                switch(state.filter()){
                    case "all":
                        return todos;
                    case "pending":
                        return todos.filter(todo=>!todo.completed);
                    case "completed":
                            return todos.filter(todo=>todo.completed);
                 
                }
            })
        }))
    )