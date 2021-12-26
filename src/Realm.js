import realm from 'realm';
export const TODOLIST_SCHEMA = "TODOLIST_SCHEMA";
export const TODO_SCHEMA = "TODO_SCHEMA";

export const TodoSchema = {
    name:TODO_SCHEMA,
    primaryKey:'id',
    properties:{
        id:'string',
        title:'string',
        description:'string',
        startDate:'string',
        endDate:'string',
        createdDate:'string',
        updatedDate:'string',
        status: { type: 'bool', default: false },
    }
}

export const TodoListSchema = {
    name:TODOLIST_SCHEMA,
    primaryKey:'userName',
    properties:{
        userName:'string',
        todos:{ type: 'list', objectType:TODO_SCHEMA},
    }
}

const databaseOptions = {
    path:'assignment4.realm',
    schema: [TodoListSchema,TodoSchema],
}


export  async function getTodoList (userName) {
    return Realm.open(databaseOptions).then(realm => {
     const user=realm.objectForPrimaryKey(TODOLIST_SCHEMA,userName);
     if(user==undefined){
         return false;
     }else{
         const tempobj={
             userName:user.userName,
             todos: ((user.todos).sorted("endDate")),
         }
         return tempobj;
     }
     }).catch((error) => {
        return false;
     });
 }
export  async function insertUser (userName) {
   return Realm.open(databaseOptions).then(realm => {
    let user=realm.objectForPrimaryKey(TODOLIST_SCHEMA,userName);
    if(user==undefined){
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA,{userName:userName,todos:[]});
        });
        return true;
    }else{
        return true;
    }
    }).catch((error) => {
       return false;
    });
}
export  async function insertTodoItem (userName,todoItem) {
   return Realm.open(databaseOptions).then(realm => {
        let item = realm.objectForPrimaryKey(TODO_SCHEMA,todoItem.id);
        if(item==undefined){
            realm.write(() => {
                let user=realm.objectForPrimaryKey(TODOLIST_SCHEMA,userName);
                user.todos.push(todoItem);
            });
            return true;
        }else{
            realm.write(() => {
                item.title = todoItem.title;
                item.description=todoItem.description;
                item.startDate=todoItem.startDate;
                item.endDate=todoItem.endDate;
                item.updatedDate=todoItem.updatedDate
                item.status=todoItem.status;
            });
            return true;
        }
    }).catch((error) => {
        return false;
        
    });
 }

 export  async function deleteTodoItem (todoItem) {
    return Realm.open(databaseOptions).then(realm => {
        const item=realm.objectForPrimaryKey(TODO_SCHEMA, todoItem.id)
        realm.write(() => {
            realm.delete(item);
            return true;
        });
        }).catch((error) => {
            return false;
           
        });
 }

/*export const InsertNewTodoItem = (userName,TodoItem) => new Promise((resolve,reject) =>{
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatedList = realm.objectForPrimaryKey(TODOLIST_SCHEMA,userName);
            updatedList.todos.push(TodoItem);
            let item = realm.objectForPrimaryKey(TODO_SCHEMA,'string5');
            //realm.delete(updatedList.todos[0]);
            console.log("resolve : " ,item);
        });
    }).catch((error) => {
        console.log("Error : " ,error)
    });
})

export const updateTodoList = Name => new Promise((resolve,reject) =>{
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
           let updatedList = realm.objectForPrimaryKey(TODOLIST_SCHEMA,Name.userName);
           console.log("objects : ",updatedList);
           updatedList.userName="hello";
        });
    }).catch((error) => {
        console.log("Error : " ,error)
    });
})*/