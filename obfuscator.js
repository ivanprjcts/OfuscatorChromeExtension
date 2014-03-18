var API_INIT = "-----BEGIN OBS MESSAGE-----";
var API_END = "-----END OBS MESSAGE-----";

function Obfuscator(size, time, obfuscate_alg, deobfuscate_alg){
    this.size = size;
    this.time = time;
    
    var obfuscateAlgorithm = obfuscate_alg;
    var deobfuscateAlgorithm = deobfuscate_alg;
    
    
    function obfuscate(text){
        return API_INIT + obfuscateAlgorithm(text) + API_END;
    };
    
    function deobfuscate(text){
        var msg = new String(text);
        var i = msg.indexOf(API_INIT, 0);
        var j = msg.indexOf(API_END, 0);
        if(i !== -1 && j > i){  //is obfuscated
            var ret = msg.substring(i + API_INIT.length, j);
            if(ret.charAt(0) === '\n'){
                ret = ret.substring(1, ret.length);
            }
        
            return deobfuscateAlgorithm(ret);
        }
        return text;
    };

    
    this.obfuscateAll = function(){
        obfuscateAll_TextArea();
        obfuscateAll_Input();
        obfuscateAll_Outlook();
    };
    
    function obfuscateAll_TextArea(){
        var allTextArea = document.getElementsByTagName("textarea");
        var num = allTextArea.length;
        var obf_msg;
        var i;
        for(i = 0 ; i < num ; i++){
            obf_msg = obfuscate(allTextArea[i].value.toString()); 
            allTextArea[i].value = obf_msg.toString();
        }
    };
    
    function obfuscateAll_Input(){
        var allInput = document.getElementsByTagName("input");
        var num = allInput.length;
        var obf_msg;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allInput[i].type.toString() === 'text') {
                obf_msg = obfuscate(allInput[i].value.toString()); 
                allInput[i].value = obf_msg;
            }
        }
    };
    
    function obfuscateAll_Outlook(){
        var allIframe = document.getElementsByTagName("iframe");
        var num = allIframe.length;
        var obf_msg;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allIframe[i].title === 'Cuerpo del mensaje'){
                var body = allIframe[i].contentDocument.getElementsByTagName("body");
                obf_msg = obfuscate(body[0].innerText.toString()); 
                body[0].innerText = obf_msg;
            }
        }
    };
    
    this.obfuscateSelected = function(){
        if(!obfuscateSelected_TextArea() && !obfuscateSelected_Input() && !obfuscateSelected_Outlook()){
            obfuscateSelected_Text();
        } 
    };

    function obfuscateSelected_Text(){    
        var sel, range; 
        var obf_msg;
        if (window.getSelection) {        
            sel = window.getSelection();   
            obf_msg = obfuscate(sel.toString());
            if (sel.rangeCount) { 
                range = sel.getRangeAt(0);  
                range.deleteContents(); 
                range.insertNode(document.createTextNode(obf_msg)); 
            }    
        } else if (document.selection && document.selection.createRange) {        
            range = document.selection.createRange();    
            obf_msg = obfuscate(range.text.toString());
            range.text = obf_msg;
        }
    };
    
    var obfuscateSelected_TextArea = function(){
        var allTextArea = document.getElementsByTagName("textarea");
        var num = allTextArea.length;
        var obf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allTextArea[i].selectionStart !== allTextArea[i].selectionEnd){
			 
                sel = allTextArea[i].value.substring(allTextArea[i].selectionStart, allTextArea[i].selectionEnd);
                obf_msg = obfuscate(sel);
            
                allTextArea[i].value = allTextArea[i].value.substring(0, allTextArea[i].selectionStart) + 
                                       obf_msg +
                                       allTextArea[i].value.substring(allTextArea[i].selectionEnd, allTextArea[i].value.toString().length);
                return true;
            }
        }
        return false;
    };

    var obfuscateSelected_Input =  function(){
        var allInput = document.getElementsByTagName("input");
        var num = allInput.length;
        var obf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allInput[i].type === "text" && allInput[i].selectionStart !== allInput[i].selectionEnd){
                sel = allInput[i].value.substring(allInput[i].selectionStart, allInput[i].selectionEnd);
                obf_msg = obfuscate(sel);
                allInput[i].value = allInput[i].value.substring(0, allInput[i].selectionStart) + 
                                    obf_msg +
                                    allInput[i].value.substring(allInput[i].selectionEnd, allInput[i].value.toString().length);
                return true;
            }		
        }
        return false;
    };
    
    var obfuscateSelected_Outlook = function(){
        var allIframe = document.getElementsByTagName("iframe");
        var num = allIframe.length;
        var obf_msg;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allIframe[i].title === 'Cuerpo del mensaje'){
                var body = allIframe[i].contentDocument.getElementsByTagName("body");
                obf_msg = obfuscate(body[0].innerText.toString()); 
                body[0].innerText = obf_msg;
                return true;
            }
        }
        return false;
    };

    this.deobfuscateAll = function(){      
        deobfuscateAll_Input();
        deobfuscateAll_TextArea();
        deobfuscateAll_Outlook();
    };
    
    var deobfuscateAll_TextArea = function(){
        var allTextArea = document.getElementsByTagName("textarea");
        var num = allTextArea.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            sel = allTextArea[i].value.toString();
            deobf_msg = deobfuscate(sel);  
            allTextArea[i].value = deobf_msg;	
        }
    };    
    
    var deobfuscateAll_Input = function(){
        var allInput = document.getElementsByTagName("input");
        var num = allInput.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allInput[i].type.toString() === 'text') {
                sel = allInput[i].value.toString();
                deobf_msg = deobfuscate(sel);  
                allInput[i].value = deobf_msg;
            }
        }
    };
    
    var deobfuscateAll_Outlook = function(){
        var allIframe = document.getElementsByTagName("iframe");
        var num = allIframe.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allIframe[i].title === 'Cuerpo del mensaje'){
                var body = allIframe[i].contentDocument.getElementsByTagName("body");
                sel = body[0].innerText.toString();
                deobf_msg = deobfuscate(sel);  
                body[0].innerText = deobf_msg;
            }
        }
    };

    this.deobfuscateSelected = function(){     
        if(!deobfuscateSelected_TextArea() && !deobfuscateSelected_Input() && !deobfuscateSelected_Outlook()){
            deobfuscateSelected_Text();
        }
    };
    
    var deobfuscateSelected_Text = function() {    
        var sel, range; 
        var obf_msg;
        if (window.getSelection) {        
            sel = window.getSelection();   
            obf_msg = deobfuscate(sel.toString());
            if (sel.rangeCount) { 
                range = sel.getRangeAt(0);  
                range.deleteContents(); 
                range.insertNode(document.createTextNode(obf_msg)); 
            }    
        } else if (document.selection && document.selection.createRange) {        
            range = document.selection.createRange();    
            obf_msg = deobfuscate(range.text.toString());
            range.text = obf_msg;
        }
    };
        
    var deobfuscateSelected_TextArea = function(){
        var allTextArea = document.getElementsByTagName("textarea");
        var num = allTextArea.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allTextArea[i].selectionStart !== allTextArea[i].selectionEnd){
                sel = allTextArea[i].value.substring(allTextArea[i].selectionStart, allTextArea[i].selectionEnd);
                deobf_msg = deobfuscate(sel);  
                allTextArea[i].value = allTextArea[i].value.substring(0, allTextArea[i].selectionStart) + 
                                       deobf_msg +
                                       allTextArea[i].value.substring(allTextArea[i].selectionEnd, allTextArea[i].value.toString().length);
                return true;
            }
        }
        return false;
    };

    var deobfuscateSelected_Input = function(){
        var allInput = document.getElementsByTagName("input");
        var num = allInput.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allInput[i].type.toString() === 'text' && allInput[i].selectionStart !== allInput[i].selectionEnd) {
                sel = allInput[i].value.substring(allInput[i].selectionStart, allInput[i].selectionEnd);
                deobf_msg = deobfuscate(sel);  
                allInput[i].value = allInput[i].value.substring(0, allInput[i].selectionStart) + 
                                    deobf_msg +
                                    allInput[i].value.substring(allInput[i].selectionEnd, allInput[i].value.toString().length);
                return true;
            }
        }
        return false;
    };

    var deobfuscateSelected_Outlook = function(){
        var allIframe = document.getElementsByTagName("iframe");
        var num = allIframe.length;
        var deobf_msg;
        var sel;
        var i;
        for(i = 0 ; i < num ; i++){
            if(allIframe[i].title === 'Cuerpo del mensaje'){
                var body = allIframe[i].contentDocument.getElementsByTagName("body");
                sel = body[0].innerText.toString();
                deobf_msg = deobfuscate(sel);  
                body[0].innerText = deobf_msg;
                return true;
            }
        }
        return false;
    };    

}