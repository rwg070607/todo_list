  function 투두입력받아서추가하기(todoText){
    if(todoText !== "") {
      const todo = {
        text: todoText,
        done: false
      }
      todoList.push(todoText);
    }
    else{
      alert("입력창에 할일을 입력해라");
    }
  }

  function 투두토글하기() {
    if(todoList[i].done === true) {
      todoList[i].done = false;
    } else {
      todoList[i].done = true;
    }
  }

  function 투두수정하기(인덱스, editText) {
    if(editText !== '') {
      todoList[인덱스].text = editText;
    } else {
      alert('수정할 내용을 입력하세요!')
    }
  }

  function 투두화면에그려주기(todoList) {
    const todoListUl = document.querySelector('#todo-list');
    todoListUl.innerHTML = ''

    if (todoList.length < 1) {
        todoListUl.innerHTML = '할일이 없습니다.';
    } else {
        for(let i=0; i<todoList.length; i++){
            const newLi = document.createElement('li');
            newLi.innerText = todoList[i].text;

            const toggle_btn = document.createElement('button');

            if(todoList[i].done === true) {
              toggle_btn.innerText = '취소';
              newLi.style.textDecoration = 'line-through';
              newLi.style.color = 'red';
            } else {
              toggle_btn.innerText = '완료';
              newLi.style.textDecoration = 'none';
              newLi.style.color = 'black';
            }

            toggle_btn.addEventListener('click', function() {
              투두토글하기(i);
              투두화면에그려주기(todoList);
            });

            const btn_div = document.createElement('div');
            btn_div.appendChild(toggle_btn);
            todoListUl.append(newLi);

            todoListUl.append(newLi);
        }
    }
  }

  function 추가버튼클릭이벤트() {
    const todoText = document.querySelector("#input-task").value;
		투두입력받아서추가하기(todoText);
    document.querySelector("#input-task").value = "";
		투두화면에그려주기(todoList);
  }


  document.querySelector("#btn-add").addEventListener("click", 추가버튼클릭이벤트);
  
  function init(){
    const todoListUl = document.querySelector("#todo-list");
    if(todoListUl.childElementCount<1){
      todoListUl.innerText = "할일이 없습니다."
      console.log("조건문 안에 코드가 실행됨!");
    }
    console.log("함수가 실행됨!");
  }
  
init()