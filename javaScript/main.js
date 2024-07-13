
// 要素
const menu = document.getElementById("menu-value");//ハンバーガー要素のulタグ
const menu_values = [
    "前に進む",
    "後ろに進む",
    "右に回る",
    "左に回る",
    "首を振る",
    "羽をパタパタさせる",
]
menu_values.forEach(value => {
    let cnt = menu_values.indexOf(value);
    let value_block = document.createElement("li");
    value_block.setAttribute("id", "action-block" + cnt);
    value_block.classList.add("action-block");
    value_block.innerHTML = value;
    menu.appendChild(value_block);
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