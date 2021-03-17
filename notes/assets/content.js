var notes= [];
var interval;
function notify() {
    chrome.runtime.sendMessage(chrome.runtime.id, {type: "content"},function(callback) {
        notes = callback;
    });
    let t = new Date();
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();
    notes.forEach((arr) => {
        let timeNote  = arr.time.split(":");
        if (parseInt(timeNote[0]) == h && parseInt(timeNote[1]) == m && s == 0) {
            let div = document.createElement("div");
            div.className = "notify";
            document.body.insertBefore(div,document.body.childNodes[0]);
            div.innerHTML = '<div class="timeNote">'+arr.time+'</div>';
            div.innerHTML += '<div class="textNote">'+arr.text+'</div>';
            div.innerHTML += '<audio autoplay loop> <source src="https://pic.pikbest.com/00/23/20/12E888piCBtn.mp3" type="audio/mpeg"></source> </audio>';
            div.addEventListener("click", function() {
                div.remove();
            });

        }
    });
}
document.body.addEventListener("mouseover", function() {
    clearInterval(interval);
    interval = setInterval(notify,1000);

});
document.body.addEventListener("mouseleave",function() {
    notes = [];
    clearInterval(interval);
});