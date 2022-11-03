import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { userLogin } from '../../apis/Auth'


const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Error1, setError1] = useState(false)
  const [Error2, setError2] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  


    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!email){
        return setError1(true)
      }
      if(!password){
        return setError2(true)
      }
      setLoading(true)
        const payload={email,password}
        userLogin(payload).then(res=>{
          console.log("result :",res)
          localStorage.setItem("tasktoken", res.data.token)
          localStorage.setItem("taskuser", JSON.stringify(res.data.user))
          navigate("/")
        }).catch(err=>{
          setLoading(false)
          toast.error(err.response?.data?.error)
            console.log(err)
        })


    }

  return (
    <div>
        <div className='container mt-5' style={{width:"50%"}}>
        <ToastContainer/>
        <div  className='text-center'>
          <h2> Login </h2>
        </div>
        <form onSubmit={handleSubmit}> 
<div className="mb-3">
<label  className="form-label">Email address</label>
  <input type="email" className="form-control"  placeholder="name@example.com" style={{border:Error1 ?"1px solid red":"none"}}
  onChange={(e)=>{setEmail(e.target.value);setError1(false)}}
  />
</div>
<div className="mb-3">
  <label  className="form-label" >Password</label>
  <input type="password" className="form-control" style={{border:Error2 ?"1px solid red":"none"}} 
  onChange={(e)=>{setPassword(e.target.value);setError2(false)}}
  />
</div>
<div className='text-center'>
    <button className='btn btn-primary' type='submit' style={{width:"70%"}}>{loading ? "Loading...":"Login"}</button>
</div>
        </form>
        <div className='text-center mt-5'>

        <Link to="/signup"><p>signUp</p></Link>
        </div>
        </div>
    </div>
  )
}

export default Login