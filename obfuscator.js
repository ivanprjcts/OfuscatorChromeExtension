var API_INIT = "-----BEGIN OBS MESSAGE-----";
var API_END = "-----END OBS MESSAGE-----";

var API_ALG = "Algorithm: ";

function Obfuscator(obs_algorithm){
    
    var mask ;
    
    var algorithm = obs_algorithm;
    
    this.setMask = function(mask_){
        mask = mask_;
    };
    
    
    var obfuscate = function(text){
        if(algorithm.name === "Masked-AES128"){
            return API_INIT + API_ALG + algorithm.name + " " + algorithm.obfuscateAlgorithm(text, mask) + API_END;
        }
        return API_INIT + algorithm.obfuscateAlgorithm(text) + API_END;
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
}