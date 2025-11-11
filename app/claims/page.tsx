"use client"

let _authMessage = "Something went wrong!";
let _surnameMessage

function GetClaimsPrincipalData(_authMessage?:any, _surnameMessage?:any){
    // let authState = await (wait for the api to return the authstate the api)
    // let user = authState.User
        
    /* if (user.identity.IsAuthenticated){

        (return a message to say that the user is authenticated)
        alert("The user is authenticated")

        _claims = user.Claims

        _surnameMessage = "Surname: {user.FindFirst(c => c.Type == ClaimTypes.Surname)?.Value}"; (direct from blazor)

    }
    
    else{
        _authmessage = "The User is Not authenticated"
        }
    */

    alert(_authMessage) 
}

function authmessage(){
    return "AUTHMESSAGE";
}

export default function Claims() {
    let authmessages=authmessage()

    return (
    <>
        <h3>ClaimsPrincipal Data</h3>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => {GetClaimsPrincipalData(_authMessage, _surnameMessage)}}>Get ClaimsPrincipal Data</button>
        <p>{authmessages}</p>
    </>
  );
}
