var KEY_LENGTH = 128;

function MaskedAES(){   
    this.name = "Masked-AES";
}

function mask_key(key, mask){
    var binary_mask = hexToBinary(key.toString());
    for(var i = 0 ; i < mask ; i++){
        binary_mask.replace(i,'*');
    }
    return (binary_mask);
}
    
function mask_format(mask){
    if(mask < 10){
        return '0' + mask.toString();
    }
return mask.toString();
}
    
MaskedAES.prototype.obfuscateAlgorithm = function(msg, mask){
        
        var key = CryptoJS.lib.WordArray.random(128/8);
        var iv  = CryptoJS.lib.WordArray.random(128/8);       
        var proof  = CryptoJS.lib.WordArray.random(64/8);
        
        var encrypted = CryptoJS.AES.encrypt(msg, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });
        var enc_proof = CryptoJS.AES.encrypt(proof, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });
       
        return btoa(mask_key(key, mask) + mask_format(mask) + proof.toString() + enc_proof.ciphertext.toString() + iv.toString() + encrypted.ciphertext.toString());
    };

MaskedAES.prototype.deobfuscateAlgorithm = function(obs_msg_b64){
        
        var obs_msg = atob(obs_msg_b64);

        var key_mask = obs_msg.substring(0, 128);
        var mask = parseInt(obs_msg.substring(128, 130));
        var proof = CryptoJS.enc.Hex.parse(obs_msg.substring(130,146));
        //var proof = obs_msg.substring(130,132);
        var enc_proof = obs_msg.substring(146,178);
        var iv  = CryptoJS.enc.Hex.parse(obs_msg.substring(178,210));     
        var cipher_text = CryptoJS.enc.Hex.parse(obs_msg.substring(210));
        
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
    var base_key = key_mask.substring(mask);
    var end = Math.pow(2, mask);
    for(var i = 0 ; i < end ; i++){
        var_key = i.toString(2);// decimal 2 binary
        binary_key = var_key + base_key;
        
        while(binary_key.length < KEY_LENGTH){
            binary_key = '0' + binary_key;
        }
        key_str = binaryToHex(binary_key);      
        key = CryptoJS.enc.Hex.parse(key_str);

        enc_proof = CryptoJS.AES.encrypt(proof, key, { iv: iv }, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923 });

        if(enc_proof.ciphertext.toString() === searched_enc_proof){
            return key;
        }
    }
    return null; 
}