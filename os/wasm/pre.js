//current command in ascii decimal
let currentcmd = [0,0,0] 
let currentfile = "";
const sleep = ms => new Promise(r => setTimeout(r,ms));
var loaded = false;
Module['print'] = function(text){console.log(text);}
Module['preRun'] = function()
{
    
    function stdin(){return 10};
    var stdout = null;
    var stderr = null; 
    FS.init(stdin,stdout,stderr);
    FS.mount(IDBFS,{},"/home/web_user/");
    
}
Module['noInitialRun'] = true

function keyev(ev) {
        home = "/home/web_user/fallout2"
        if(ev.key == "`"){
        file_selector.click()
        }
        else if(ev.key == "="){
            FS.syncfs(false,function(){alert("save attempted")});
        }
        else if(ev.key == "\\"){
            readfrom = home.concat('',prompt("Read which directory?"))
            alert(readfrom)
            alert(FS.readdir(readfrom))
            
            
        } else if(ev.key == "]"){
            FS.syncfs(true,function(){
                try {
                    FS.mkdir("/home/web_user/fallout2")
                    FS.mkdir("/home/web_user/fallout2/data")
                    
                } catch (error) {
                    
                }
                alert("Previous data loaded. You may now make changes.")
                loaded = true;
            });
        }
    
    
    
}

document.addEventListener('keydown', keyev, true);

document.addEventListener('click', (ev) => {
    console.log("event is captured only once.");
    args = []
    if(!loaded){
    FS.syncfs(true,function(){
        try {
            FS.mkdir("/home/web_user/fallout2/")
            FS.mkdir("/home/web_user/fallout2/data")
        } catch (error) {
            
        }
        FS.chdir("/home/web_user/fallout2");
        document.removeEventListener("keydown",keyev,true);
        document.getElementById("Instructions").remove();
        Module.callMain(args);
});}
    else{
        FS.chdir("/home/web_user/fallout2");
        document.removeEventListener("keydown",keyev,true);
        document.getElementById("Instructions").remove();
        Module.callMain(args);
    }
    
  }, { once: true });

