

function sendMessage(message) {
   chrome.tabs.executeScript(null,
    {code:"function replaceSelectedText(replacementText) {    var sel, range;    if (window.getSelection) {        sel = window.getSelection();        if (sel.rangeCount) { range = sel.getRangeAt(0);  range.deleteContents(); range.insertNode(document.createTextNode(replacementText)); }    } else if (document.selection && document.selection.createRange) {        range = document.selection.createRange();        range.text = replacementText;}} var text = window.getSelection().toString();var hash = CryptoJS.SHA1(text.toString()); replaceSelectedText(hash);"})
}





chrome.browserAction.onClicked.addListener(function() { 
 sendMessage("hol");
      
});





