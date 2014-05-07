var KEY_LENGTH = 128;

var masks = ['00000000','00000001','00000003','00000007',
             '0000000f','0000001f','0000003f','0000007f',
             '000000ff','000001ff','000003ff','000007ff',
             '00000fff','00001fff','00003fff','00007fff',
             '0000ffff','0001ffff','0003ffff','0007ffff',
             '000fffff','001fffff','003fffff','007fffff',
             '00ffffff','01ffffff','03ffffff','07ffffff',
             '0fffffff','1fffffff','3fffffff','7fffffff',
             'ffffffff'];

function MaskedAES128(){   
    this.name = "Masked-AES128";
}

function mask_key(key, m){
    var masked_key= key.clone();
    var r = m % 32;
    var div = Math.floor(m/32);
    for(var i=0; i<div ; i++){
        masked_key = key.words[i] & '00000000';
    }
    var mask = CryptoJS.enc.Hex.parse(masks[32-r]);
    masked_key.words[div] = key.words[div] & mask.words[0];
    
    return masked_key;
}
    
    
MaskedAES128.prototype.obfuscateAlgorithm = function(msg, mask){
        
        var key = CryptoJS.lib.WordArray.random(128/8);
        var iv  = CryptoJS.lib.WordArray.random(128/8);       
        var proof  = CryptoJS.lib.WordArray.random(64/8);
        
        var encrypted = CryptoJS.AES.encrypt(msg, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });
        var enc_proof = CryptoJS.AES.encrypt(proof, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });
       
        var km = mask_key(key, mask);
        var ml = mask.toString(16);
        var masklength = CryptoJS.enc.Hex.parse(ml.lpad('0',8));
       
        var km_b64 = CryptoJS.enc.Base64.stringify(km);
        var masklength_b64 = CryptoJS.enc.Base64.stringify(masklength);
        var proof_b64 = CryptoJS.enc.Base64.stringify(proof);
        var enc_proof_b64 = CryptoJS.enc.Base64.stringify(enc_proof.ciphertext);
        var iv_b64 = CryptoJS.enc.Base64.stringify(iv);
        var encrypted_b64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        
        return km_b64 + masklength_b64 + proof_b64 + enc_proof_b64 + iv_b64 + encrypted_b64;
    };

MaskedAES128.prototype.deobfuscateAlgorithm = function(obs_msg_b64){

        var key_mask = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(0,24));
        var mask_words = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(24,32));
        var mask = mask_words.words[0];
        var proof = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(32,44));
        var enc_proof = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(44,68));
        var iv  = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(68,92));   
        var cipher_text = CryptoJS.enc.Base64.parse(obs_msg_b64.substring(92));   
        
        var key = brute_force(key_mask, mask, proof, enc_proof, iv);
        
        var decrypted = CryptoJS.AES.decrypt({ ciphertext: cipher_text }, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
};

function brute_force(key_mask, mask, proof, searched_enc_proof, iv){
    
    var key;
    var enc_proof;
    var key_str;
    var binary_key;
    var var_key;
    var hex_km = CryptoJS.enc.Hex.stringify(key_mask);
    var binary_km = hexToBinary(hex_km);
    var base_key = binary_km.substring(mask);
    var end = Math.pow(2, mask);
    for(var i = 0 ; i < end ; i++){
        var_key = i.toString(2);// decimal 2 binary
        binary_key = var_key + base_key;
        
        key_str = binaryToHex(binary_key.lpad('0',128));      
        key = CryptoJS.enc.Hex.parse(key_str);

        enc_proof = CryptoJS.AES.encrypt(proof, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });

        if(enc_proof.ciphertext.toString() === searched_enc_proof.toString()){
            return key;
        }
    }
    return null; 
}