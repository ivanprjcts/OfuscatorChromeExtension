function click(e) {
  if(e.target.id === 'ofuscarButton'){
    chrome.tabs.executeScript(null,
      {code:"ofuscarAll();"});
  }
  if(e.target.id === 'desofuscarButton'){
    chrome.tabs.executeScript(null,
      {code:"desofuscarAll();"});
  }
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.getElementsByTagName('button');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);
  }
});




