export default function auth({ next, to, $auth }){
  const token = localStorage.getItem('token');

  // url that can be accessed without login
  const whiteLists = [
    "login",
    "reset-password",
    "activation",
  ]
  
  // user hasn't logged in yet
  if(!token && !whiteLists.includes(to.name)){
    return next({
      name:'login'
    })
  }

  // user has logged in, but trying to access page on the whiteLists
  if (token && whiteLists.includes(to.name)) {
    return next({
      name:'dashboard'
    })
  }

  return next()
}
