var obfuscator_alg1 = function(text){
    return CryptoJS.SHA1(text).toString();
};

var deobfuscator_alg1 = function(text){
    return "DEOBFUSCATED MESSAGE (" + text + ")";
};
