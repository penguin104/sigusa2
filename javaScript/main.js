
// 要素
const menu = document.getElementById("menu-value");//ハンバーガー要素のulタグ
const programs = document.getElementById("program-view");// プログラム表示させてる要素

// ここに作ったプログラムの情報が入る
var programList = [];

// 処理一覧
const menu_values = [
    { id: 0, action: "前に進む", action_kind: "forwd" },
    { id: 1, action: "後ろに進む", action_kind: "back" },
    { id: 2, action: "右に回る", action_kind: "right" },
    { id: 3, action: "左に回る", action_kind: "left" },
    { id: 4, action: "首を振る", action_kind: "head_action" },
    { id: 5, action: "羽をパタパタさせる", action_kind: "flipper_action" },
];
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
            process.setAttribute("id", "num" + programList.length + 1);//id付与
            process.classList.add(value_ham.action_kind);//class付与
            process.innerHTML = value_ham.action;

            programList.push(value_ham.action_kind);//リストに追加

            programs.appendChild(process);
            console.log(programList);
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