Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  })

 Object.defineProperty(String.prototype, 'endsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || this.length;
            position = position - searchString.length;
            var lastIndex = this.lastIndexOf(searchString);
            return lastIndex !== -1 && lastIndex === position;
        }
    })


function Ofuscated_msg(msg, alg){
	this.SHA1 = 0 ;



	var value = CryptoJS.SHA1(msg);

	this.algorith = alg;

	this.toString = function toString(){
		return Ofuscated_msg.init + value + "\n" + Ofuscated_msg.end;
	}

	this.desofuscar = function desofuscar(){
		return value;
	}
}

Ofuscated_msg.init = "----------Ofuscated_msg: SHA1----------\n";
Ofuscated_msg.end = "----------end----------";


/*
function isOfuscated(msg){
	return msg.startsWith(Ofuscated_msg.init) && msg.endsWith(Ofuscated_msg.end);
}
*/
function isOfuscated(msg){
	return msg.startsWith(Ofuscated_msg.init.substring(0,Ofuscated_msg.init.length-2)) && msg.endsWith(Ofuscated_msg.end);
}

/*
function desofuscar(ofs_msg){
        //alert(ofs_msg.length - Ofuscated_msg.end.length);
	return ofs_msg.substring(Ofuscated_msg.init.length, ofs_msg.length - Ofuscated_msg.end.length);
}
*/
function desofuscar(ofs_msg){
        //alert(ofs_msg.length - Ofuscated_msg.end.length);
	return ofs_msg.substring(Ofuscated_msg.init.length-1, ofs_msg.length - Ofuscated_msg.end.length);
}

function replaceSelectedText(replacementText) {    
	var sel, range;    
	if (window.getSelection) {        
		sel = window.getSelection();        
		if (sel.rangeCount) { 
			range = sel.getRangeAt(0);  
			range.deleteContents(); 
			range.insertNode(document.createTextNode(replacementText)); 
		}    
	} else if (document.selection && document.selection.createRange) {        
		range = document.selection.createRange();        
		range.text = replacementText;
	}
} 


function ofuscateAllTextArea(){
	var allTextArea = document.getElementsByTagName("textarea");
	var num = allTextArea.length;
	var desofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		ofus_msg = new Ofuscated_msg(allTextArea[i].value.toString(), Ofuscated_msg.SHA1); 
		allTextArea[i].value = ofus_msg.toString();
	}
}

function ofuscateSelTextArea(){
	var allTextArea = document.getElementsByTagName("textarea");
	var num = allTextArea.length;
	var desofus_msg;
	var selection;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allTextArea[i].selectionStart != allTextArea[i].selectionEnd){
			 
			selection = allTextArea[i].value.substring(allTextArea[i].selectionStart, allTextArea[i].selectionEnd);
			ofus_msg = new Ofuscated_msg(selection, Ofuscated_msg.SHA1);
			allTextArea[i].value = allTextArea[i].value.substring(0, allTextArea[i].selectionStart) + 
												ofus_msg +
					       allTextArea[i].value.substring(allTextArea[i].selectionEnd, allTextArea[i].value.toString().length);
		}
	}
}

function desofuscateAllTextArea(){
	var allTextArea = document.getElementsByTagName("textarea");
	var num = allTextArea.length;
	var desofus_msg;
	var t;
	var i;
	for(i = 0 ; i < num ; i++){
		t = allTextArea[i].value.toString();
		if(isOfuscated(t)){
			desofus_msg = desofuscar(t);  
			allTextArea[i].value = desofus_msg;
		}
		
	}
}

function desofuscateSelTextArea(){
	var allTextArea = document.getElementsByTagName("textarea");
	var num = allTextArea.length;
	var desofus_msg;
	var t;
	var i;
	for(i = 0 ; i < num ; i++){
		t = allTextArea[i].value.toString();
		if(isOfuscated(t)){
			desofus_msg = desofuscar(t);  
			allTextArea[i].value = desofus_msg;
		}
		
	}
}

function ofuscateAllInput(){
	var allInput = document.getElementsByTagName("input");
	var num = allInput.length;
	var desofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if((allInput[i].type.toString() !== 'submit') && (allInput[i].type.toString() !== 'hidden')){
			ofus_msg = new Ofuscated_msg(allInput[i].value.toString(), Ofuscated_msg.SHA1); 
			allInput[i].value = ofus_msg.toString();
		}
	}
}

function ofuscateSelInput(){
	var allInput = document.getElementsByTagName("input");
	var num = allInput.length;
	var desofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allInput[i].type === "text" && allInput[i].selectionStart != allInput[i].selectionEnd){
			selection = allInput[i].value.substring(allInput[i].selectionStart, allInput[i].selectionEnd);
			ofus_msg = new Ofuscated_msg(selection, Ofuscated_msg.SHA1);
			allInput[i].value = allInput[i].value.substring(0, allInput[i].selectionStart) + 
			         							      ofus_msg +
			      allInput[i].value.substring(allInput[i].selectionEnd, allInput[i].value.toString().length);
		}
		
	}
}

function desofuscateAllInput(){

	var allInput = document.getElementsByTagName("input");
	var num = allInput.length;
	var desofus_msg;
	var t;
	var i;
	for(i = 0 ; i < num ; i++){
		if((allInput[i].type.toString() !== 'submit') && (allInput[i].type.toString() !== 'hidden')){
			t = allInput[i].value.toString();
			if(isOfuscated(t)){ 
				desofus_msg = desofuscar(t);  
				allInput[i].value = desofus_msg;
			}
		}
	}
}

function desofuscateSelInput(){

	var allInput = document.getElementsByTagName("input");
	var num = allInput.length;
	var desofus_msg;
	var t;
	var i;
	for(i = 0 ; i < num ; i++){
		if((allInput[i].type.toString() !== 'submit') && (allInput[i].type.toString() !== 'hidden')){
			t = allInput[i].value.toString();
			if(isOfuscated(t)){ 
				desofus_msg = desofuscar(t);  
				allInput[i].value = desofus_msg;
			}
		}
	}
}

function ofuscateAllOutlook(){
	var allIframe = document.getElementsByTagName("iframe");
	var num = allIframe.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allIframe[i].title === 'Cuerpo del mensaje'){
			var body = allIframe[i].contentDocument.getElementsByTagName("body");
			ofus_msg = new Ofuscated_msg(body[0].innerText.toString(), Ofuscated_msg.SHA1); 
			body[0].innerText = ofus_msg.toString();
		}
	}
}

function ofuscateSelOutlook(){
	var allIframe = document.getElementsByTagName("iframe");
	var num = allIframe.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allIframe[i].title === 'Cuerpo del mensaje'){
			var body = allIframe[i].contentDocument.getElementsByTagName("body");
			ofus_msg = new Ofuscated_msg(body[0].innerText.toString(), Ofuscated_msg.SHA1); 
			body[0].innerText = ofus_msg.toString();
		}
	}
}

function desofuscateAllOutlook(){
	var allIframe = document.getElementsByTagName("iframe");
	var num = allIframe.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allIframe[i].title === 'Cuerpo del mensaje'){
			var body = allIframe[i].contentDocument.getElementsByTagName("body");
			t = body[0].innerText.toString();
			if(isOfuscated(t)){
				desofus_msg = desofuscar(t);  
				body[0].innerText = desofus_msg;
			}
		}
	}
}

function desofuscateSelOutlook(){
	var allIframe = document.getElementsByTagName("iframe");
	var num = allIframe.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allIframe[i].title === 'Cuerpo del mensaje'){
			var body = allIframe[i].contentDocument.getElementsByTagName("body");
			t = body[0].innerText.toString();
			if(isOfuscated(t)){
				desofus_msg = desofuscar(t);  
				body[0].innerText = desofus_msg;
			}
		}
	}
}

function ofuscarAll(){

	var text = window.getSelection().toString();
	ofus_msg = new Ofuscated_msg(text, Ofuscated_msg.SHA1); 
	replaceSelectedText(ofus_msg.toString());
	ofuscateAllTextArea();
	ofuscateAllInput();
	ofuscateAllOutlook();
}

function ofuscarSel(){
/*
	var text = window.getSelection().toString();
	ofus_msg = new Ofuscated_msg(text, Ofuscated_msg.SHA1); 
	replaceSelectedText(ofus_msg.toString());
*/
	ofuscateSelTextArea();
	ofuscateSelInput();
	//ofuscateSelOutlook();
}

function desofuscarAll(){
	
	desofuscateAllInput();
	desofuscateAllTextArea();
	desofuscateWebOutlook();
}

function desofuscarSel(){
	
	desofuscateSelInput();
	desofuscateSelTextArea();
	desofuscateSelOutlook();
}