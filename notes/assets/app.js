//Extension for Notes
//Code by Ari Vu
window.onload = function() {
    //Lan dau cai extension
    if (localStorage.notes === undefined)
        localStorage.setItem("notes", JSON.stringify(
            {
                notes: [
                    {text: "Chúc mừng bạn đã cài đặt thành công Work Notes",isFinish: false, time: "06:00", type: "popup"},
                    {text: "Hãy thử tạo cho mình lịch làm việc hiệu quả với Work Notes nhé!",isFinish: false, time: "09:00",type: "popup"},
                ],
                type: "popup"
            }
        ));
    var app = {
        content: document.querySelectorAll(".content")[0],
        obj: JSON.parse(localStorage.notes),
        show: function() {
            this.content.innerHTML = "";
            this.obj.notes.reverse().forEach((arr,key) => {
                this.content.innerHTML += '<div class="note" style="background: #'+(key%2==0? 'f6efa6': 'f6ab6c')+'"><div class="time">'+arr.time+'</div><div class="text">'+arr.text+'</div><button class="del">DEL</button></div>'
            });
            this.obj.notes.reverse();
        },
        add: function() {
            let text = document.querySelector("#text");
            let time = document.querySelector("#time");
            var note = {
                text: text.value,
                isFinish: false,
                time: time.value
            };
            this.obj.notes.push(note);
            this.update();
            text.value = "";
            time.value = "06:00";
            chrome.runtime.sendMessage(chrome.runtime.id, this.obj);
        },
        del: function() {
            document.querySelectorAll(".del").forEach((e,key) => {
                e.addEventListener("click",() => {
                    this.obj.notes.splice(this.obj.notes.length-key-1,1);
                    this.update();
                    chrome.runtime.sendMessage(chrome.runtime.id, this.obj);
                });
            });
            
        },
        update: function() {
            localStorage.setItem("notes",JSON.stringify(this.obj));
            this.show();
            this.del();
            
        }
    };
    app.show();
    app.del();
    document.querySelector("#add").addEventListener("click",() => {
        app.add();
    });
    chrome.runtime.sendMessage(chrome.runtime.id, app.obj);
}