function click(e) {
      
    if(e.target.id === 'ofuscarButton'){
        chrome.tabs.executeScript(null, {code:"var plugin = new Obfuscator(new MaskedAES());"});

        var scrpt = "plugin.setMask(" + slider1.value + ");";     
        chrome.tabs.executeScript(null, {code:scrpt});
        
        if(obf_sel.checked){          
            chrome.tabs.executeScript(null, {code:"plugin.obfuscateSelected();"});
        };
        if(obf_all.checked){
            chrome.tabs.executeScript(null,{code:"plugin.obfuscateAll();"});
        };
    };

    
    if(e.target.id === 'desofuscarButton'){
        chrome.tabs.executeScript(null, {code:"var plugin = new Deobfuscator();"});
        
	    if(deobf_sel.checked){
            chrome.tabs.executeScript(null, {code:"plugin.deobfuscateSelected();"});
	    }
        if(deobf_all.checked){
            chrome.tabs.executeScript(null, {code:"plugin.deobfuscateAll();"});
	    }

    }
    window.close();
}

function change(e){
    document.querySelector('#rangeValue1').value = slider1.value;
}


document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.getElementsByTagName('button');
  var slider1 = document.getElementById('slider1');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);
  };
  
  slider1.addEventListener('change', change);
  
});


