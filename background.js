
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {  	
	chrome.tabs.executeScript(null, {code:"var plugin = new Deobfuscator(); plugin.deobfuscateAll();"});	
});
