chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    if (request.type == "popup") {
        localStorage.setItem("request",JSON.stringify(request));
    } else if (request.type == "content") {
        sendResponse(JSON.parse(localStorage.request).notes);
    }
    
});
