const form=document.querySelector("#todo-form");
const toDoInput=document.querySelector("#todo");
const toDoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton= document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addToDo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function addToDo(e){
    const newTodo=toDoInput.value.trim();

    if(newTodo===""){
        showAlert("danger","Lütfen bir todo giriniz!");
    }
    else{
        addTodoToUI(newTodo);
        addToDoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi!");
    }
    
    e.preventDefault();
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            //Bulunamadı
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")) {
        //toDoList.innerHTML="";
        while(toDoList.firstElementChild != null){
            toDoList.removeChild(toDoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function deleteTodo(e){
    if(e.target.className===("fa fa-remove")){
        console.log("Silme İşlemi");
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi!");
    }
   // console.log(e.target);
}

function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos= getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}


function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    //console.log(alert);
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },3000);
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addToDoToStorage(newTodo){
    let todos= getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToUI(newTodo){
    const listItem=document.createElement("li");
    //link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class= 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    toDoList.appendChild(listItem);
    toDoInput.value="";
}
