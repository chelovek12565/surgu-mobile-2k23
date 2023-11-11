import config from "@/config";
import { default as axios } from "axios";
// import { Cookies } from "react-cookie";

export async function Login(props)
{
  const {email, password} = props;
  let success = false
  let error;

  try {
    let res;
    await axios.post(`auth/login/`, {email: email, password: password})
        .then((response) => res = response);


    console.log(res.data)
    console.log(res.status != 200)

    const accessToken = res.data.accessToken;

    let validationResult = await axios.post(`auth/validateOrganisationToken`, {}, 
      { headers: { Authorization: `Bearer ${accessToken}`} }
    )
    
    // Cookies.prototype.set('access_token', accessToken, {
    //   path: '/',
    //   httpOnly: true,
    //   secure: true // Set to true if using HTTPS
    // });
    localStorage.setItem('access_token', accessToken)
    
    success = validationResult.status == 200;
  } catch(e){
    console.log(e);
  }finally {
    return success
  }

}

export async function isLoggedIn()
{
  try
  {
    if(localStorage.getItem('access_token') == undefined || '') return false

    const token = localStorage.getItem('access_token')
    let res = await axios.post('auth/validateToken',{}, 
    { headers: { Authorization: `Bearer ${token}`} }
    )

    console.log(res.status + ' auth valid')
    return true
  }
  catch
  {
    return false
  }


}

export async function ChangePassword(newPassword, reset_token)
{
  let success = false;
  try {
    let res;
    res = await axios.post(`auth/changePassword`, {password: newPassword}, {
      headers: 
      { 
        Authorization: `Bearer ${reset_token}`
      }
    }).catch((reason) => {console.log('error occured: ' + reason); return false})

    console.log(res.data)
    console.log(res.status != 200)

    success = res.status == 200;
  } catch(e){
    console.log(e);
    return false
  }finally {
    return success
  }
}

export function logOut(router)
{
  localStorage.clear()
  console.log("logged out")
  router.push("/")
}
