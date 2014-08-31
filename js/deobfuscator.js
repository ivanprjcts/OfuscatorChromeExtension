var API_INIT = "-----BEGIN OBS MESSAGE-----";
var API_END = "-----END OBS MESSAGE-----";

var API_ALG = "Algorithm: ";

function Deobfuscator(){
        
    var deobfuscate = function(text){
        var msg = new String(text);
        var i = msg.indexOf(API_INIT, 0);
        var j = msg.indexOf(API_ALG, 0);
        var k = msg.indexOf(" ", j + API_ALG.length + 1);
        var q = msg.indexOf(API_END, 0);
        if(i < j && j < k && k < q){  //is obfuscated
            var alg = msg.substring(j + API_ALG.length, k);
            var ret = msg.substring(k + 1, q);
            if(ret.charAt(0) === '\n'){
                ret = ret.substring(1, ret.length);
            }
            if(alg === "Masked-AES128"){
                var deobs = new MaskedAES128();
                return msg.substring(0, i) + deobs.deobfuscateAlgorithm(ret) + msg.substring(q + API_END.length);
            }
            return "null";
        }
        return text;
    };

    this.deobfuscateAll = function(){      
        deobfuscateAll_Input();
        deobfuscateAll_TextArea();
        deobfuscateAll_Outlook();
        deobfuscateAll_HTML();
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

    var deobfuscateAll_HTML = function() {   
        document.body.innerHTML = deobfuscate(document.body.innerHTML);
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