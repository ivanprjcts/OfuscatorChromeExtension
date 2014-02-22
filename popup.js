function click(e) {

	if(e.target.id === 'ofuscarButton'){

		if(myonoffswitch.checked){
			chrome.tabs.executeScript(null, {code:"ofuscarSel();"});
		}else{
			chrome.tabs.executeScript(null,{code:"ofuscarAll();"});
		}

	}
	if(e.target.id === 'desofuscarButton'){

		if(myonoffswitch2.checked){
			chrome.tabs.executeScript(null, {code:"desofuscarSel();"});
		}else{
			chrome.tabs.executeScript(null, {code:"desofuscarAll();"});
		}

	}
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.getElementsByTagName('button');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);
  }
});




