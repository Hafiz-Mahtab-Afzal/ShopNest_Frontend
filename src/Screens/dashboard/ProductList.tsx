import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoIosAddCircle } from "react-icons/io";
import apis from "../../config/apis";
import { getproducts } from '../../redux/actions/ProductAction';
import { errortoast, successtoast } from '../../toastify/toastify';
import { type AppDispatch, type RootState } from '../../redux/store';
import Loader from '../../Layouts/Loader';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import Card from './Card';

const ProductList = () => {
 
  const dispatch = useDispatch<AppDispatch >();
  const navigate = useNavigate()
  const { products,loader } = useSelector((state: RootState) => state.productSlice);
  
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
      dispatch(getproducts());
    }, [dispatch]);
 
  const addproduct = () => {
    navigate("/Dashboard/addproduct")
  }
 
  const viewproduct =  (id: string) => {
       navigate(`/product/${id}`)
  }

  const editproduct = (id: string) => {
    navigate(`/Dashboard/editproduct/${id}`)
  }

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

const deleteproduct = async (id: string) => {
  try {
    setLoading(true);
    const { data } = await axios.delete(`${apis.prod}/${id}`, {
      withCredentials: true
    });
    
    const { success, error } = data;
    if (error) errortoast(error);
    if (success) {
      dispatch(getproducts());
      successtoast(success);
      setShowModal(false);
    }
  } catch (err: unknown) {
    console.log((err as Error).message);
  } finally {
    setLoading(false);
  }
};

 
  if (loader) {
    return <Loader />;
  }

  const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'title',
    headerName: 'Product',
    width: 250,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 120,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 140,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 332,
    editable: true,
    renderCell:(params: GridRenderCellParams) => {
      return(
      <Box>

         <div className='-translate-x-[14px]'>
          <Button onClick={() => viewproduct(params.row.pid)} className='!bg-slate-400 !text-white !text-xs !p-2 !font-bold  !ml-1 '>
          <BsEye className='mr-2 !text-lg' />
            View
          </Button>

          <Button onClick={() => editproduct(params.row.pid)} className='!bg-blue-600 !text-white !text-xs !p-2 !font-bold  !ml-2 '>
          <MdEdit className='mr-2 !text-lg' />
            Edit
          </Button>
          
          <Button onClick={() => openDeleteModal(params.row.pid)} className='!bg-red-600 !text-white !text-xs !p-2 !font-bold  !ml-2  '>
          <RiDeleteBinLine className='mr-2 !text-lg' />
            Delete
          </Button>
         </div>
         
      </Box>
      )
    }
  },
];

const rows = products && products.map((product,index) => ({
   pid:product._id,
   id:index + 1,
   title:product.title,
   brand:product.brand,
   category:product.category,
   price:product.price
}))

  return (
    <div className="bg-gray-100  min-h-screen">
      {showModal && (
        <Card 
          onCancel={() => setShowModal(false)} 
          onConfirm={() => deleteId && deleteproduct(deleteId)}
          isLoading={loading}
        />
      )}
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-center font-bold bg-[#fff]  border-blue-500 border-b-2 text-blue-500 py-5'>ProductList</h1>
      <div className="flex mt-7 justify-center gap-4 ">
        
        <Button className="!bg-blue-600 !text-white !font-bold !w-60 !translate-y-2 translate-x-0 lg:translate-x-96 !px-4 !py-2 !rounded-md" onClick={addproduct}> <IoIosAddCircle className='mr-2 text-xl'  />
          Add Product
        </Button>
      </div>
      <Box className="mx-4 lg:mx-16 mt-6 " >
      <DataGrid
          className='!bg-white [&_.MuiDataGrid-columnHeader]:!bg-sky-500 [&_.MuiDataGrid-columnHeaderCheckbox]:!bg-sky-500 [&_.MuiDataGrid-scrollbarFiller--header]:!bg-sky-500 [&_.MuiDataGrid-filler--pinnedRight]:!bg-sky-500'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  )
}

export default ProductList