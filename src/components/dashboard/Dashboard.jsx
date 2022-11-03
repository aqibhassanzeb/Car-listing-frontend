import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import { deleteCar, showCar, showCategories } from '../../apis/Cars';
import CreateUpdate from '../createUpdate/CreateUpdate'


const Dashboard = () => {
    const [createUpdate, setCreateUpdate] = useState(false);
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [carsData, setCarsData] = useState([])
    const [typelist, setTypelist] = useState([])
    const [type, setType] = useState("All")
    const [updateId, setUpdateId] = useState("")
    const [fetchControl, setFetchControl] = useState(false)
   
    // for pagination 
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [endoffsetRange, setEndoffsetRange] = useState("")
      
      var serialno=0
      var itemsPerPage=5

    const handleShow = () => setCreateUpdate(true);
    const navigate=useNavigate()
    const handleClose = () => {
        setCreateUpdate(false)
        setUpdate(false)
        setUpdateId("")
    }

    // show car fumction

  const handleShowCar=()=>{
         setLoading(true)
        showCar(type).then(res=>{
          setLoading(false)
          setCarsData(res.data?.cars)
        }).catch(err=>{
          setLoading(false)
            console.log(err)
        })
  }

  // Delete car function 

  const handleDeleteCar=(_id)=>{
    deleteCar(_id).then(res=>{
      toast.success(res.data?.message)
      setFetchControl(!fetchControl)
    }).catch(err=>{
        console.log(err)
    })
  }

    // category show function 

  const handleShowCateg=()=>{
    showCategories().then(res=>{
      setTypelist(res.data?.Category)
    }).catch(err=>{
        console.log(err)
    })
  }

    useEffect(() => {
      handleShowCar()
      handleShowCateg()
    }, [fetchControl])
    
     // for pagination 

     const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % carsData?.length;
      setItemOffset(newOffset);
    };

    // for pagination 
    
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setEndoffsetRange(endOffset)
      setCurrentItems(carsData && carsData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(carsData && carsData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,carsData]);


    return (
    <div className='container'>
       <ToastContainer/>
<div className='text-center mt-5'>
    <h2>List of Cars</h2>
</div>
<div>
    <button className="btn btn-success" onClick={()=>navigate("/categories")}>Categories</button>
</div>
<div className='add_cars float-end mb-3'>
    <button className='btn btn-primary' onClick={()=>setCreateUpdate(!createUpdate)}>Add Car</button>
      <div >
      <select aria-label="default select example"
                            style={{  width: '100%',marginTop:"10px"  }}
                            value={type} onChange={(e) =>{ setType(e.target.value);setFetchControl(!fetchControl)}}>
                              <option value="All" >All</option>
                            {typelist && typelist.map((elem) => (
                              <option key={elem._id} value={elem._id}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>
                            <h5>Filter by type</h5>
      </div>
</div>
<div>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Model</th>
          <th>Colour</th>
          <th>Type</th>
          <th>Reg No</th>
          <th>Delelte/Update</th>
        </tr>
      </thead>
      <tbody>
  {  
  loading ? <h3>loading..</h3>:
  carsData.length > 0 ?
  currentItems && currentItems.map((elm,index)=>{
    return( 
        <tr key={elm._id}>
          <td>{serialno=serialno+1}</td>
          <td>{elm.name}</td>
          <td>{elm.model}</td>
          <td>{elm.colour}</td>
          <td>{elm.type?.name}</td>
          <td>{elm.registerationNo}</td>
          <td>
            <button className='btn btn-danger' onClick={()=>{handleDeleteCar(elm._id)}}>Delete</button>
            <button className='btn btn-success' onClick={()=>{setCreateUpdate(!createUpdate);setUpdate(true);setUpdateId(elm._id)}}>Update Car</button>
            </td>
        </tr>
    )
  })  
  :<h3>Not Found</h3>
}
  </tbody>
    </Table>

    <div className='d-flex justify-content-center '>
  <p>List from {itemOffset} to {currentItems?.length ==5 ?endoffsetRange :"so on.."}</p>

    </div>
   <div style={{border:"1px solid blue", color:"black",alignContent:"center"}}>

    <ReactPaginate
        className= 'd-flex justify-content-evenly react-pagnation'
        
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
        </div>

</div>

  {/* modal  */}

{createUpdate && <CreateUpdate Close={handleClose} Show={handleShow} update={update}
setFetchControl={setFetchControl} fetchControl={fetchControl} updateId={updateId}
/>}
    </div>
  )
}

export default Dashboard