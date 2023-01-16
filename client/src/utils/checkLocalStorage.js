const ISSERVER = typeof window === 'undefined';


export function checkUser(){
    var res = false
    if (!ISSERVER) {
        const user = localStorage.getItem('user');
        console.log(user)
        if (user != ""){
            const token = JSON.parse(user)?.token;

            user ? res = true : res = false;
            token ? res = true : res = false;
            
        }
    }
    return res
}