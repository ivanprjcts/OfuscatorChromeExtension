function click(e) {
      
    if(e.target.id === 'ofuscarButton'){     
        if(obf_sel.checked){          
            obfuscatePage_only_selection();
        };
        if(obf_all.checked){
            obfuscateAllPage();
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
  //alert("Pagina cargada");
  var buttons = document.getElementsByTagName('button');
  var slider1 = document.getElementById('slider1');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);
  };
  
  slider1.addEventListener('change', change);
  
});

function obfuscatePage_only_selection(){
    chrome.tabs.executeScript(null, {code:"var plugin = new Obfuscator(new MaskedAES128());"});

    var scrpt = "plugin.setMask(" + slider1.value + ");";     
    chrome.tabs.executeScript(null, {code:scrpt});
    chrome.tabs.executeScript(null, {code:"plugin.obfuscateSelected();"});
}

function obfuscateAllPage(){
    chrome.tabs.executeScript(null, {code:"var plugin = new Obfuscator(new MaskedAES128());"});

    var scrpt = "plugin.setMask(" + slider1.value + ");";     
    chrome.tabs.executeScript(null, {code:scrpt});
    chrome.tabs.executeScript(null,{code:"plugin.obfuscateAll();"});
}


