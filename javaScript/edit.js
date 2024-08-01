console.log(location.href);
// 要素
const menu = document.getElementById("menu-value");//ハンバーガー要素のulタグ
const programs = document.getElementById("program-view");// プログラム表示させてる要素


const submit_dialog = document.getElementById("submitProgram");

const create_dialog = document.getElementById("create-program-dialog");
const projectListView = document.getElementById("select-list");
// ここに作ったプログラムの情報が入る
var programList = [];
// プロジェクト一時保存リスト
var projects = [];

var select_data = {}

const menu_values = [
    { id: 0, action: "前に進む", action_kind: "forwd" },
    { id: 1, action: "後ろに進む", action_kind: "back" },
    { id: 2, action: "右に回る", action_kind: "right" },
    { id: 3, action: "左に回る", action_kind: "left" },
    { id: 4, action: "首を振る", action_kind: "head_action" },
    { id: 5, action: "羽をパタパタさせる", action_kind: "flipper_action" },
];

window.addEventListener("load", function () {
    for (let key = 0; key < localStorage.length; key++) {
        sessionStorage.setItem(key, this.localStorage.getItem(key));
        projects.push(JSON.parse(this.sessionStorage.getItem(key)));

        console.log(projects[key]);
    }
    if (select_data != null) {
        select_data = { ...JSON.parse(sessionStorage.getItem("select")) };
        programList = [...select_data.program];
    }
    //画面にブロック追加する処理書く
    //リロード時に保存データの再描画
    select_data.program.forEach(
        value => {
            let block_obj;
            let process = document.createElement("div");
            process.setAttribute("id", "num" + menu_values.map(function (obj) {
                menu_values.forEach(menuValue => {
                    if (menuValue.action_kind == value) {
                        block_obj = { ...menuValue };
                        return block_obj.id;
                    }
                });
            }));//id付与
            process.classList.add(value);//class付与
            process.classList.add("com-block");//共通class付与
            process.innerHTML = block_obj.action;
            programs.appendChild(process);
        }
    );

    console.log("aaa");
    console.log(select_data);
});


// 処理一覧


menu_values.forEach((value_ham) => {
    console.log(value_ham);
    let cnt = value_ham.id;
    let value_block = document.createElement("li");

    value_block.setAttribute("id", "action-block" + cnt);//id付与
    value_block.classList.add("action-block");
    value_block.innerHTML = value_ham.action;

    let menu_value = menu.appendChild(value_block);

    // クリックしたときの処理
    menu_value.addEventListener(
        "click", function () {
            // 追加する処理

            let process = document.createElement("div");
            process.setAttribute("id", "num" + programList.length);//id付与
            process.classList.add(value_ham.action_kind);//class付与
            process.classList.add("com-block");//共通class付与
            process.innerHTML = value_ham.action;

            programList.push(value_ham.action_kind);//リストに追加
            select_data.program = programList;
            programs.appendChild(process);
            localStorage.setItem(select_data.id, JSON.stringify(select_data));
            console.log(programList);
            console.log(select_data.program);
        }
    );
});

// ハンバーガーメニュー
const ham = document.querySelector("#ham");
const menu_wrapper = document.querySelector("#menu-wrapper");
var ham_flag = 0;

ham.addEventListener("click", function () {
    if (ham_flag) {
        ham.classList.remove("clicked");
        menu_wrapper.classList.remove("clicked");
        ham_flag = 0;
    } else {
        ham.classList.add("clicked");
        menu_wrapper.classList.add("clicked");
        ham_flag = 1;
    }
});


// ブラウザバック禁止
window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', (e) => {
    history.go(1);
});


//送信時処理周り
function showDialogSubmit() {
    submit_dialog.show();
}

function closeDialog() {
    submit_dialog.close();
}
function submitToSIGUSA() {
    const formSubmit = document.getElementById("submitProgramForm");
    ip_address_input = document.getElementById("ip_text");
    ip = ip_address_input.value;
    sendData = localStorage.getItem(select_data.id, JSON.stringify(select_data));
    // Arduinoでクエリパラメータを取得・確認する
    fetch(
        "http://" + ip + "?data=" + sendData,//URL
    ).then(
        () => {
            console.log(ip + "?data=" + sendData);
        }
    );
    submit_dialog.close();
}