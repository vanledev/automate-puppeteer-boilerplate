
async function isSiteUp(url){
    try {
     
        const res = await fetch(url);
        
        if (res.status === 200){
            
            
            return 1;
        } else {
           
            
            return 0;
        }
    } catch (e){
        
        
        return 0;
    
    }
}
