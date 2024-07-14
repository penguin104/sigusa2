
// 要素
const menu = document.getElementById("menu-value");//ハンバーガー要素のulタグ
const programs = document.getElementById("program-view");// プログラム表示させてる要素


const create_dialog = document.getElementById("create-program-dialog");

// ここに作ったプログラムの情報が入る
var programList = [];

var projects = [];

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
            process.classList.add("com-block");//共通class付与
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

function createProgram() {
    //ダイアログ表示・データベースに情報を追加・リストタグに追加
    create_dialog.show();
}

function close_dialog() {
    create_dialog.close();
}



// データベース接続
//コピペ　https://qiita.com/butakoma/items/2c1c956b63fcf956a137


const projectdb = 'project';

var openReq = indexedDB.open(projectdb, 1);
//　DB名を指定して接続。DBがなければ新規作成される。

var dbVersion;
openReq.onsuccess = function (event) {
    let db = event.target.result;
    dbVersion = db.version;
}
openReq.onupgradeneeded = function (event) {
    //onupgradeneededは、DBのバージョン更新(DBの新規作成も含む)時のみ実行
    console.log('db upgrade');
}
openReq.onsuccess = function (event) {
    //onupgradeneededの後に実行。更新がない場合はこれだけ実行
    console.log('db open success');
    let db = event.target.result;
    // 接続を解除する
    db.close();
}
openReq.onerror = function (event) {
    // 接続に失敗
    console.log('db open error');
}


//オブジェクトストア(table)

var projectTable = "projectTeble";
var openReq = indexedDB.open(projectdb, dbVersion);
// オブジェクトストアの作成・削除はDBの更新時しかできないので、バージョンを指定して更新
openReq.onupgradeneeded = function (event) {
    let db = event.target.result;
    db.createObjectStore(projectTable, { keyPath: 'id' });
}

function form_submit() {


    var textfield_value = document.getElementById("form").projectName.value;//テキストフィールドの値
    var data = { id: projects.length, projectName: textfield_value, program: programList };
    projects.push(data);
    console.log(projects[0].projectName);

    var openReq = indexedDB.open(projectdb, dbVersion);

    openReq.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(projectTable, 'readwrite');
        const objectStore = transaction.objectStore(projectTable);
        objectStore.add(data);
        console.log("done tansaction");
    }


};


