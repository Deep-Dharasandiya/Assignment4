import { types, getSnapshot,flow,applySnapshot,cast, detach } from "mobx-state-tree";
import { insertUser, insertTodoItem, getTodoList, deleteTodoItem} from './Realm';
import {observable} from 'mobx-react-lite'
function todayDate() {
    const tempdate = new Date();
    let date = tempdate.getDate() < 10 ? ('0' + tempdate.getDate()) : tempdate.getDate();
    let month = (tempdate.getMonth() + 1) < 10 ? ('0' + (tempdate.getMonth() + 1)) : (tempdate.getMonth() + 1);
    let year = tempdate.getFullYear();
    return (year + '-' + month + '-' + date);
}
function tomorrowDate() {
    let tempdate = new Date();
    let date = (tempdate.getDate() + 1) < 10 ? ('0' + (tempdate.getDate() + 1)) : tempdate.getDate() + 1;
    let month = (tempdate.getMonth() + 1) < 10 ? ('0' + (tempdate.getMonth() + 1)) : (tempdate.getMonth() + 1);
    let year = tempdate.getFullYear();
    return (year + '-' + month + '-' + date);
}
const Item = types
.model({
    id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    startDate: types.optional(types.string, ""),
    endDate: types.optional(types.string, ""),
    createdDate: types.optional(types.string, ""),
    updatedDate: types.optional(types.string, ""),
    status: types.optional(types.boolean, false),
})
 const TodoModal = types
    .model({
        userName: types.optional(types.string, ""),
        todoList: types.optional(types.array(Item), []),
        isLoading: types.optional(types.boolean, false),
        isAleart: types.optional(types.boolean, false),
        aleartMessage: types.optional(types.string, ""),
        todayTask: types.optional(types.integer, 0),
        todayCompleteTask: types.optional(types.integer, 0),
        tommorowTask: types.optional(types.integer, 0),
        tommorowCompleteTask: types.optional(types.integer, 0),
        upcomingTask: types.optional(types.integer, 0),
        upcomingComleteTask: types.optional(types.integer, 0),
        lateTask: types.optional(types.integer, 0),
        lateCompleteTask: types.optional(types.integer, 0),
    })
     .actions(self => ({
       
     }))
    .actions(self => ({

        getDetails:flow( function* getDetails(){
            const res=  yield getTodoList(self.userName);
            if(res){
                let result = [];
                const list=res.todos;
                let todayTask=0;
                let todayCompleteTask=0;
                let tommorowTask=0;
                let tommorowCompleteTask=0;
                let upcomingTask=0;
                let upcomingComleteTask=0;
                let lateTask=0;
                let lateCompleteTask=0;
                for (var i in list) {
                    if (list[i].endDate == todayDate()){
                        todayTask = todayTask+1;
                        if (list[i].status){
                            todayCompleteTask = todayCompleteTask+1;
                        }
                    }
                    if (list[i].endDate == tomorrowDate()) {
                        tommorowTask = tommorowTask + 1;
                        if (list[i].status) {
                            tommorowCompleteTask = tommorowCompleteTask + 1;
                        }
                    }
                    if (list[i].endDate > tomorrowDate()) {
                        upcomingTask = upcomingTask + 1;
                        if (list[i].status) {
                            upcomingComleteTask = upcomingComleteTask + 1;
                        }
                    }
                    if (list[i].endDate < todayDate()) {
                        lateTask = lateTask + 1;
                        if (list[i].status) {
                            lateCompleteTask = lateCompleteTask + 1;
                        }
                    }
                    const obj = {
                        id: list[i].id,
                        title: list[i].title,
                        description: list[i].description,
                        startDate: list[i].startDate,
                        endDate: list[i].endDate,
                        createdDate: list[i].createdDate,
                        updatedDate: list[i].updatedDate,
                        status: list[i].status,
                    }
                    result.push(obj);
                }
                detach(self.todoList);
                self.todayTask=todayTask;
                self.todayCompleteTask=todayCompleteTask;
                self.tommorowTask=tommorowTask;
                self.tommorowCompleteTask=tommorowCompleteTask;
                self.upcomingTask=upcomingTask;
                self.upcomingComleteTask=upcomingComleteTask;
                self.lateTask=lateTask;
                self.lateCompleteTask=lateCompleteTask;
                self.todoList.replace(result);
                return true;
            }else{
                return false;
            }
        }),
        setTodoList(list){
            self.todoList = list;
        },
      insertUser(user){
          this.setLoader(true);
            const flag=insertUser(user);
            if(flag){
                self.userName = user;
                const res=this.getDetails();
                if(res){
                    this.setLoader(false);
                    return true;
                }else{
                    this.setLoader(false)
                    return false;
                }
            }else{
                this.setLoader(false);
                return false;
            }
        },

        insertTodoItem(item){
            this.setLoader(true);
            const flag=insertTodoItem(self.userName,item);
            if(flag){
                const res = this.getDetails();
                if (res) {
                    this.setLoader(false);
                    return true;
                } else {
                    this.setLoader(false);
                    return false;
                }
            }
            else{
                this.setLoader(false);
                return flag;
            }
            
        },
        deleteTodoItem(item) {
            this.setLoader(true);
            const flag = deleteTodoItem(item);
            if (flag) {
                const res = this.getDetails();
                if (res) {
                    this.setLoader(false);
                    return true;
                } else {
                    this.setLoader(false);
                    return false;
                }
            }
            else {
                this.setLoader(false);
                return flag;
            }

        },
        setAleart(msg){
            self.isAleart=true;
            self.aleartMessage=msg;
        },
        closeAleart(){
            self.aleartMessage="";
            self.isAleart=false;
        },
       
        setLoader(flag) {
            self.isLoading = flag;
        },
    }))
    const i =Item.create({
        id: "",
    title:'' ,
    description: '',
    startDate:'',
    endDate: '',
    createdDate: '',
    updatedDate: '',
    status: false,
    })
    const store= TodoModal.create({
        userName:'',
        todoList:[],
           /* {
                id: "",
                title:'' ,
                description: '',
                startDate:'',
                endDate: '',
                createdDate: '',
                updatedDate: '',
                status: '',
            },*/
        isLoading:false,
        aleartMessage:'',
        isAleart:false,
    })
    export default store;
