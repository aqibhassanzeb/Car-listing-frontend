import React, { useState } from 'react'
import { userRegister } from '../../apis/Auth'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Error1, setError1] = useState(false)
    const [Error2, setError2] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!name){
        return setError1(true)
      }
      if(!email){
        return setError2(true)
      }
      setLoading(true)
        const payload={name,email}
        userRegister(payload).then(res=>{
          alert('Registered successfully please check you email for password')
          navigate("/login")
        }).catch(err=>{
          setLoading(false)
          toast.error(err.response?.data?.message)
            console.log(err)
        })
    }

  return (
    <div>
        <div className='container mt-5' style={{width:"50%"}}>
    <ToastContainer/>
        <div  className='text-center'>
          <h2>  SignUp </h2>
        </div>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
  <label  className="form-label">Name</label>
  <input type="text" className="form-control" style={{border:Error1 ?"1px solid red":"none"}} 
  onChange={(e)=>{setName(e.target.value);setError1(false)}}
  placeholder="Name" />
</div>
<div className="mb-3">
<label  className="form-label">Email address</label>
  <input type="email"  className="form-control"  placeholder="name@example.com" style={{border:Error2 ?"1px solid red":"none"}}
   onChange={(e)=>{setEmail(e.target.value);setError2(false)}}
  />
</div>
<div className='text-center'>
    <button className='btn btn-primary' disabled={loading} type='submit' style={{width:"70%"}}>{loading ? "Loading...":"Submit"}</button>
</div>
        </form>
        </div>
    </div>
  )
}

export default SignUp