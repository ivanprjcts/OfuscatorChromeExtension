

function sendMessage(message) {
   chrome.tabs.executeScript(null,
    {code:"executeAll();"})
}





chrome.browserAction.onClicked.addListener(function() { 
 sendMessage("hol");
      
});





