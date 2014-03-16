function click(e) {
    
    chrome.tabs.executeScript(null, {code:"var plugin = new Obfuscator(10,10,obfuscator_alg1,deobfuscator_alg1);"});
    
    if(e.target.id === 'ofuscarButton'){

        if(myonoffswitch.checked){
            chrome.tabs.executeScript(null, {code:"plugin.obfuscateSelected();"});
        }else{
            chrome.tabs.executeScript(null,{code:"plugin.obfuscateAll();"});
	}

    }
    if(e.target.id === 'desofuscarButton'){
                
	if(myonoffswitch2.checked){
            chrome.tabs.executeScript(null, {code:"plugin.deobfuscateSelected();"});
	}else{
            chrome.tabs.executeScript(null, {code:"plugin.deobfuscateAll();"});
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




