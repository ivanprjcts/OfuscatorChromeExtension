
var SLOW_MASK = 8;
var MEDIUM_MASK = 14;
var STRONG_MASK = 15;

var SLOW_REP = 80;
var MEDIUM_REP = 4;
var STRONG_REP = 1;

var tool = new MaskedAES();



function testMaskedAES_all(){
    
}


function testSlow_maskedAES(){

    var start = new Date().getTime();


    var obs_msg;
    var deobs_msg;
    
    var i;
    for( i = 0 ; i < SLOW_REP ; i++){
        obs_msg = tool.obfuscateAlgorithm("TEST_SLOW", SLOW_MASK);
        deobs_msg = tool.deobfuscateAlgorithm(obs_msg);
        if(deobs_msg !== "TEST_SLOW"){
            return "Error";
        }
    }


    var end = new Date().getTime();
    var time = end - start;
    
    return time;
}

function testMedium_maskedAES(){
    
    var start = new Date().getTime();


    var obs_msg;
    var deobs_msg;
    
    var i;
    for( i = 0 ; i < MEDIUM_REP ; i++){
        obs_msg = tool.obfuscateAlgorithm("TEST_MEDIUM", MEDIUM_MASK);
        deobs_msg = tool.deobfuscateAlgorithm(obs_msg);
        if(deobs_msg !== "TEST_MEDIUM"){
            return "Error";
        }
    }


    var end = new Date().getTime();
    var time = end - start;
    
    return time;   
}

function testStrong_maskedAES(){
    
    var start = new Date().getTime();


    var obs_msg;
    var deobs_msg;
    
    var i;
    for( i = 0 ; i < STRONG_REP ; i++){
        obs_msg = tool.obfuscateAlgorithm("TEST_STRONG", STRONG_MASK);
        deobs_msg = tool.deobfuscateAlgorithm(obs_msg);
        if(deobs_msg !== "TEST_STRONG"){
            return "Error";
        }
    }


    var end = new Date().getTime();
    var time = end - start;
    
    return time;
}
