let todoList = []; //1.투두들을 넣어둘 배열생성
function 투두입력받아서추가하기(todoText) {
    

    if (todoText !== "") {
        const todo = {
            text: todoText,
            done: false,
        };
        todoList.push(todo); //2.투두배열에 입력한 데이터 추가
    } else {
        alert("입력창에 할일을 입력해라");
    }
}

function 투두토글하기(변수) {
    if (todoList[변수].done === true) {
        todoList[변수].done = false;
    } else {
        todoList[변수].done = true;
    }
}

function 투두수정하기(인덱스, editText) {
    //텍스트가 있을때만 수정
    if (editText !== "") {
        // 배열에서 객체를 선택학고 텍스트속성을 변경
        todoList[인덱스].text = editText;
    } else {
        alert("수정할 내용을 입력하세요.");
    }
}
// 인덱스를 받아 삭제
function 투두삭제하기(인덱스) {
    // 배열에서 객체 순서에 맞는 부분을 삭제 (입력인덱스부터 1개만큼삭제)
    todoList.splice(인덱스, 1);
}

function 투두저장하기(todoList) {
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function 투두초기화하기() {
    const todos = localStorage.getItem("todos");
    if (todos === null) {
        //투두배열을 초기화해준다.
        todoList = [];
    } else {
        todoList = JSON.parse(todos);
    }
}

function 투두화면에그려주기(todoList) {
    const todoListUl = document.querySelector("#todo-list");
    todoListUl.innerHTML = "";
    if (todoList.length < 1) {
        todoListUl.innerHTML = "할일이 없습니다.";
    } else {
        for (let 변수 = 0; 변수 < todoList.length; 변수++) {
            const newLi = document.createElement("li");
            newLi.innerText = todoList[변수].text;
            // 완료 또는 취소 토글버튼 추가
            const toggleBtn = document.createElement("button");
            // todo객체의 완료여부에 따라 텍스트가 바뀜
            // true일때는 이미 완료상태이니 "취소"
            // false일때는 완료를 아직 하지않았으니 "완료"를 보여줘야함
            if (todoList[변수].done === true) {
                toggleBtn.innerText = "취소";
                newLi.style.textDecoration = "line-through";
                newLi.style.color = "red";
            } else {
                toggleBtn.innerText = "완료";
                newLi.style.textDecoration = "none";
                newLi.style.color = "black";
            }
            // 토글버튼에 이벤트 추가
            // 데이터를 조작하고 조작된 데이터에 기반하여 새로그려주도록하기.
            toggleBtn.addEventListener("click", function () {
                투두토글하기(변수);
                투두저장하기(todoList);
                투두화면에그려주기(todoList);
            });

            const edit_btn = document.createElement('button');
            edit_btn.innerText = '수정';

            edit_btn.addEventListener('click', () => {
                const edit_text = prompt('수정할 내용을 입력하세요');
                투두수정하기(변수, edit_text);
                투두저장하기(todoList);
                투두화면에그려주기(todoList);
            })

            const remove_btn = document.createElement('button');
            remove_btn.innerText = '삭제';

            remove_btn.addEventListener('click', () => {
                const remove_confirm = confirm('삭제하시겠습니까?');
                if (remove_confirm) {
                    투두삭제하기(변수);
                    투두저장하기(todoList);
                    투두화면에그려주기(todoList);
                }                
            })


            // 버튼들을 묶을 div태그 생성
            const btnDiv = document.createElement("div");
            // div에 토글버튼 추가
            btnDiv.appendChild(toggleBtn);
            btnDiv.appendChild(edit_btn);
            btnDiv.appendChild(remove_btn);
            // newLi의 자식요소로 btnDiv추가
            newLi.appendChild(btnDiv);

            // todoListUl의 자식요소로 만든 li를 추가한다
            todoListUl.appendChild(newLi);
        }
    }
}

function 추가버튼클릭이벤트() {
    
    const todoText = document.querySelector("#input-task").value;

    투두입력받아서추가하기(todoText);
    투두저장하기(todoList);
    document.querySelector("#input-task").value = "";
    투두화면에그려주기(todoList);

}
document.querySelector('#input-task').addEventListener('keyup', () => {
    if (window.event.keyCode == 13) {
        추가버튼클릭이벤트();
    }
});

document.querySelector("#btn-add").addEventListener("click", 추가버튼클릭이벤트);
function init() {
    투두초기화하기();
    투두화면에그려주기(todoList);
    const todoListUl = document.querySelector("#todo-list");
    if (todoListUl.childElementCount < 1) {
        todoListUl.innerText = "할일이 없습니다.";
    }
}
init();