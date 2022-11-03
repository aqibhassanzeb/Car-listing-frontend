import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { addCar, addCategory, fetchbyIdCar, fetchbyIdCateg, showCategories, updateCar, updateCateg } from '../../apis/Cars'

const CreateUpdate = ({Show,Close,update,Categ,fetchControl,setFetchControl,updateId}) => {
  
  const [typelist, setTypelist] = useState([])
  const [type, setType] = useState("")
  const [typeErr, setTypeErr] = useState(false)
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(false)
  const [colour, setColour] = useState("")
  const [colourError, setColourError] = useState(false)
  const [model, setModel] = useState("")
  const [modalErr, setModalErr] = useState(false)
  const [registerationNo, setRegisterationNo] = useState("")
  const [regErr, setRegErr] = useState(false)
  const [loading, setLoading] = useState(false)


  // show category 

  const handleShowCateg=()=>{
    showCategories().then(res=>{
      setTypelist(res.data?.Category)
    }).catch(err=>{
        console.log(err)
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    // new category add 

    if(Categ && !update){
     if(!name){
       return setNameError(true)
      }
      setLoading(true)
      addCategory({name}).then(result=>{
        toast.success("category added successfully")
        setFetchControl(!fetchControl)
        setLoading(false)
        Close()
      }).catch(err=>{
        setLoading(false)
        toast.error(err.response?.data?.message)
        console.log(err)
      })
    }

    // new car add 

    if(!Categ && !update){
     if(!name){
       return setNameError(true)
      }
     if(!colour){
       return setColourError(true)
      }
     if(!model){
       return setModalErr(true)
      }
     if(!registerationNo){
       return setRegErr(true)
      }
     if(!type || type=="Select type"){
       return setTypeErr(true)
      }
      const payload={name,colour,model,registerationNo,type}
      setLoading(true)
      addCar(payload).then(result=>{
        toast.success(result.data?.message)
        setFetchControl(!fetchControl)
        setLoading(false)
        Close()
      }).catch(err=>{
        setLoading(false)
        console.log(err)
      })
    }

    // category update function 

    if(updateId && update && Categ){
      if(!name){
        return setNameError(true)
       }
       setLoading(true)
       const payload ={name,updateId}
       updateCateg(payload).then(result=>{
         toast.success("category updated successfully")
         setFetchControl(!fetchControl)
         setLoading(false)
         Close()
       }).catch(err=>{
         setLoading(false)
         console.log(err)
       })
    }

    //  car update function 

    if(updateId && update && !Categ){
     if(!name){
       return setNameError(true)
      }
     if(!colour){
       return setColourError(true)
      }
     if(!model){
       return setModalErr(true)
      }
     if(!registerationNo){
       return setRegErr(true)
      }
     if(!type || type=="Select type"){
       return setTypeErr(true)
      }
      const payload={name,colour,model,registerationNo,type,updateId}
      setLoading(true)
       updateCar(payload).then(result=>{
         toast.success("car updated successfully")
         setFetchControl(!fetchControl)
         setLoading(false)
         Close()
       }).catch(err=>{
         setLoading(false)
         console.log(err)
       })
    }


  }


  // category fetch by id for update 

    const handleFetchCateg=()=>{
    fetchbyIdCateg(updateId).then(result=>{
      setName(result.data?.Category.name)
    }).catch(err=>{
      console.log(err)
    })
  }

  // car fetch by id for update 

    const handleFetchCar=()=>{
      fetchbyIdCar(updateId).then(result=>{
        setName(result.data?.Car.name)
        setModel(result.data?.Car.model)
        setColour(result.data?.Car.colour)
        setRegisterationNo(result.data?.Car.registerationNo)
        setType(result.data?.Car.type._id)
    }).catch(err=>{
      console.log(err)
    })
  }


useEffect(() => {
  handleShowCateg()
  
  if(updateId && update && Categ){
    handleFetchCateg()
  }
  
  if(updateId && update && !Categ){
    handleFetchCar()
  }
}, [])


  return (
    <div>
       <ToastContainer/>
         <Modal show={Show} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>{update ? `Update ${Categ ? "Category":"Car"}`:`Add ${Categ ? "Category":"Car"}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {  Categ ? 
        <input className="form-control mt-2" type="text" placeholder="Name" aria-label="default input example"
        value={name}
        style={{border:nameError ?"1px solid red":"none"}}
        onChange={(e)=>{setName(e.target.value);setNameError(false)}}
        />
        :
         <>
          <input className="form-control mt-2" type="text" placeholder="Name" aria-label="default input example"
          value={name}
        style={{border:nameError ?"1px solid red":"none"}}
        onChange={(e)=>{setName(e.target.value);setNameError(false)}}
        />
        <input className="form-control mt-2" type="text" placeholder="Colour" aria-label="default input example" 
        value={colour}
         style={{border:colourError ?"1px solid red":"none"}}
         onChange={(e)=>{setColour(e.target.value);setColourError(false)}}
        />
        <input className="form-control mt-2" type="text" placeholder="Model" aria-label="default input example"
        value={model}
          style={{border:modalErr ?"1px solid red":"none"}}
          onChange={(e)=>{setModel(e.target.value);setModalErr(false)}}
        />
        <input className="form-control mt-2" type="text" placeholder="registeration no" aria-label="default input example"
        value={registerationNo}
         style={{border:regErr ?"1px solid red":"none"}}
         onChange={(e)=>{setRegisterationNo(e.target.value);setRegErr(false)}}
        />
        <select aria-label="default select example"
                            style={{  width: '100%',marginTop:"10px",border:typeErr?"1px solid red":"none"  }}
                            value={type} onChange={(e) =>{ setType(e.target.value);setTypeErr(false)}}>
                              <option value={null} > Select type</option>
                            {typelist && typelist.map((elem) => (
                                <option key={elem._id} value={elem._id}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>
        </>
}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={Close}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={(e)=>{handleSubmit(e)}}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateUpdate