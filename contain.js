





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



function Ofuscated_msg(msg, alg){
	this.SHA1 = 0 ;

	var value = CryptoJS.SHA1(msg);
	var init = "----------Ofuscated_msg: SHA1----------\n";
	var end = "----------end----------";

	this.algorith = alg;

	this.toString = function toString(){
		return init + value + "\n" + end;
	}
}




function ofuscateAllTextArea(){
	var allTextArea = document.getElementsByTagName("textarea");
	var num = allTextArea.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		ofus_msg = new Ofuscated_msg(allTextArea[i].value.toString(), Ofuscated_msg.SHA1); 
		allTextArea[i].value = ofus_msg.toString();
	}
}

function ofuscateAllInput(){
	var allInput = document.getElementsByTagName("input");
	var num = allInput.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if((allInput[i].type.toString() !== 'submit') && (allInput[i].type.toString() !== 'hidden')){
			ofus_msg = new Ofuscated_msg(allInput[i].value.toString(), Ofuscated_msg.SHA1); 
			allInput[i].value = ofus_msg.toString();
		}
	}
}


function ofuscateWebOutlook(){
	var allIframe = document.getElementsByTagName("iframe");
	var num = allIframe.length;
	var ofus_msg;
	var i;
	for(i = 0 ; i < num ; i++){
		if(allIframe[i].title === 'Cuerpo del mensaje'){
			var body = allIframe[i].contentDocument.getElementsByTagName("body");
			ofus_msg = new Ofuscated_msg(body[0].text.toString(), Ofuscated_msg.SHA1); 
			body[0].innerText = ofus_msg.toString();
		}
	}
}


function executeAll(){

	var text = window.getSelection().toString();
	ofus_msg = new Ofuscated_msg(text, Ofuscated_msg.SHA1); 
	replaceSelectedText(ofus_msg.toString());
	ofuscateAllTextArea();
	ofuscateAllInput();
	ofuscateWebOutlook();
}