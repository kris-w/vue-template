import { ref, computed } from 'vue'


let tokenSet = ref(false);

let token = ref(null)
let tokenDecoded = ref(null)


// by convention, composable function names start with "use"
export function useTokens() {
    // expose managed state as return value

    //WHen the page reloads, try to get the token
    function recallTokens() {
        //console.log("Recalling tokens");
        try {
            var t = sessionStorage.getItem('token') || localStorage.getItem('token');
            var tD = sessionStorage.getItem('tokenDecoded') || localStorage.getItem('tokenDecoded');
            if (t && tD) {
                token.value = t;
                tokenDecoded.value = JSON.parse(tD);
                tokenSet.value = true;
                //console.log('Token recalled from sessionStorage:', token.value);
                //console.log('Decoded token recalled from sessionStorage:', tokenDecoded.value);
            }
        } catch (error) {
            console.error('Error recalling tokens:', error);
            return null;
        }

    }

    function setTokens(t, tD) {
        //console.log("Setting token:", t);
        //console.log("Setting decoded token:", tD);        
        sessionStorage.setItem('token', t);
        sessionStorage.setItem('tokenDecoded', JSON.stringify(tD));
        localStorage.setItem('token', t); // Store in local storage as well
        localStorage.setItem('tokenDecoded', JSON.stringify(tD));
        token.value = t;
        tokenDecoded.value = tD;
        tokenSet.value = true;       
    }

    function unsetTokens() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenDecoded');
        localStorage.removeItem('token'); // Remove from local storage as well
        localStorage.removeItem('tokenDecoded');
        token.value = null;
        tokenDecoded.value = null;
        tokenSet.value = false;
    }

    return {
        tokenSet, token, tokenDecoded, recallTokens, setTokens, unsetTokens
    }
}