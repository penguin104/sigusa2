
console.log(location.href);
// 要素
const menu = document.getElementById("menu-value");//ハンバーガー要素のulタグ
const programs = document.getElementById("program-view");// プログラム表示させてる要素


const create_dialog = document.getElementById("create-program-dialog");
const projectListView = document.getElementById("select-list");
// ここに作ったプログラムの情報が入る
var programList = [];
// プロジェクト一時保存リスト
var projects = [];

var select_data = {};


window.addEventListener("load", function () {
    for (let key = 0; key < localStorage.length; key++) {
        sessionStorage.setItem(key, this.localStorage.getItem(key));
        projects.push(JSON.parse(this.sessionStorage.getItem(key)));


    }
    console.log(projects);
    projects.forEach(value => {
        // console.log(value.id);
        let created_project = document.createElement("li");
        let cnt = value.id;
        created_project.setAttribute("id", "project" + cnt);//id付与
        created_project.classList.add("list");
        created_project.innerHTML = value.projectName;
        created_project.addEventListener("click", function () {
            select_data = { ...value };
            sessionStorage.setItem("select", JSON.stringify(select_data));
            programList = select_data.program;
            console.log(value);
            window.location.href = "html/editView.html";
        });

        projectListView.appendChild(created_project);
    });


    console.log("aaa");
    console.log(select_data);
});




function createProgram() {
    //ダイアログ表示・データベースに情報を追加・リストタグに追加
    create_dialog.show();
}

function close_dialog() {
    create_dialog.close();
}



function form_submit() {
    var textfield_value = document.getElementById("form").projectName.value;//テキストフィールドの値
    var data = { "id": projects.length, "projectName": textfield_value, "program": programList };
    projects.push(data);
    localStorage.setItem(data.id, JSON.stringify(data));//ローカルストレージにプロジェクトデータ保存

    let created_project = document.createComment("li");
    created_project.setAttribute("id", "project" + projects.length);
    created_project.classList.add("list");
    created_project.innerHTML = localStorage.getItem(projects).projectName;
    projectListView.appendChild(created_project);

    console.log(localStorage.getItem(0));
};


