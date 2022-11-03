import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { deleteCateg, showCategories } from '../../apis/Cars';
import CreateUpdate from '../createUpdate/CreateUpdate';

const Categories = () => {
  const [createUpdate, setCreateUpdate] = useState(false);
  const [update, setUpdate] = useState(false)
  const [typelist, setTypelist] = useState([])
  const [typeloading, setTypeloading] = useState(false)
  const [fetchControl, setFetchControl] = useState(false)
  const [updateId, setUpdateId] = useState("")

  //  for pagination 
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endoffsetRange, setEndoffsetRange] = useState(0)

  var serialno = 0
  var itemsPerPage = 5


  const handleClose = () => {
    setCreateUpdate(false)
    setUpdate(false)
    setUpdateId("")
  }
  const handleShow = () => setCreateUpdate(true);
  const navigate = useNavigate()
  const handleShowCateg = () => {
    setTypeloading(true)
    showCategories().then(res => {
      setTypelist(res.data?.Category)
      setTypeloading(false)
    }).catch(err => {
      setTypeloading(false)
      console.log(err)
    })
  }

  // Delete category function

  const handleDeleteCateg = (_id) => {
    deleteCateg(_id).then(res => {
      toast.success(res.data?.message)
      setFetchControl(!fetchControl)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    handleShowCateg()
  }, [fetchControl])

  // for pagination 

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % typelist?.length;
    setItemOffset(newOffset);
  };

  // for pagination 

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setEndoffsetRange(endOffset)
    setCurrentItems(typelist && typelist.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(typelist && typelist.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, typelist]);


  return (
    <div className='container'>
      <ToastContainer />
      <div className='text-center mt-5'>
        <h2>List of Categories</h2>
      </div>
      <div>
        <button className="btn btn-success" onClick={() => navigate("/")}>Car List</button>
      </div>
      <div className='add_cars float-end mb-3'>
        <button className='btn btn-primary' onClick={() => setCreateUpdate(!createUpdate)}>Add Category</button>

      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Delete/Update</th>
            </tr>
          </thead>
          <tbody>
            {
              typeloading ? <h3>loading..</h3> :
                currentItems && currentItems.map((elm, index) => {
                  return (
                    <tr key={elm._id}>
                      <td>{serialno = serialno + 1}</td>
                      <td>{elm.name}</td>
                      <td className='d-flex'>
                        <button className='btn-danger' onClick={() => { handleDeleteCateg(elm._id) }}>Delete</button>
                        <button className='btn btn-success' onClick={() => { setCreateUpdate(!createUpdate); setUpdate(true); setUpdateId(elm._id) }}>Update Category</button>
                      </td>
                    </tr>
                  )
                })
            }

          </tbody>
        </Table>
        <div className='d-flex justify-content-center '>
          <p>List from {itemOffset} to {currentItems?.length == 5 ? endoffsetRange : "so on.."}</p>

        </div>
        <div style={{ border: "1px solid blue", color: "black", alignContent: "center" }}>

          <ReactPaginate
            className='d-flex justify-content-evenly react-pagnation'

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

      {/* Modal */}
      
      {createUpdate && <CreateUpdate Close={handleClose} Show={handleShow} update={update} Categ={true}
        setFetchControl={setFetchControl} fetchControl={fetchControl} updateId={updateId}
      />}
    </div>
  )
}

export default Categories