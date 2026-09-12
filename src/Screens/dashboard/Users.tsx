import Box from '@mui/material/Box';
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apis from '../../config/apis';
import { successtoast } from '../../toastify/toastify';
import { RiDeleteBinLine } from 'react-icons/ri';
import Card from './Card';

interface userdata {
  _id: string;
  first_name: string;
  email: string;
  role: string;
  gender: string;
  isblocked: boolean;
}

const Users = () => {
  const [user, setuser] = useState<userdata[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const blocked = async (id: string) => {
    try {
      const { data } = await axios.put(`${apis.auth}/block/${id}`, {}, {
        withCredentials: true
      });
      const { success } = data;
      if (success) {
        successtoast(success);
        setuser(prev =>
          prev.map(u => u._id === id ? { ...u, isblocked: !u.isblocked } : u)
        );
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    }
  };

  const deleteuser = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${apis.auth}/${id}`, {
        withCredentials: true
      });
      const { Message } = data;
      if (Message) {
        successtoast(Message);
        setuser(prev => prev.filter(u => u._id !== id));
        setShowModal(false);
      }
    } catch (err: unknown) {
      console.log((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };
  
  useEffect(() => {
    const getusers = async () => {
      try {
        const { data } = await axios.get(`${apis.auth}/users`, {
          withCredentials: true
        });
        setuser(data.users);
      } catch (err: unknown) {
        console.log((err as Error).message);
      }
    };
    getusers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'role', headerName: 'Role', width: 110 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const isActive = !params.row.isblocked;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <button
              onClick={() => blocked(params.row.pid)}
              className='!mr-6'
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 8px 6px 12px',
                borderRadius: '4px', cursor: 'pointer', border: `1px solid ${isActive ? '#bbf7d0' : '#fecaca'}`,
                background: isActive ? '#f0fdf4' : '#fef2f2', fontSize: '11px', fontWeight: 600,
                color: isActive ? '#15803d' : '#dc2626', letterSpacing: '0.02em', lineHeight: 1,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? '#22c55e' : '#ef4444', flexShrink: 0, display: 'inline-block' }} />
              {isActive ? 'Active' : 'Inactive'}
            </button>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 312,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Button
            onClick={() => openDeleteModal(params.row.pid)}
            size="small"
            sx={{
              background: '#dc2626', color: '#fff', fontSize: '11px', fontWeight: 600, px: 1.5,
              minWidth: 'unset', '&:hover': { background: '#b91c1c' },
            }}
          >
            <RiDeleteBinLine style={{ marginRight: 4, fontSize: 15 }} />
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = user.map((u, index) => ({
    id: index + 1,
    pid: u._id,
    name: u.first_name,
    email: u.email,
    role: u.role,
    isblocked: u.isblocked,
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      {showModal && (
        <Card 
          onCancel={() => setShowModal(false)} 
          onConfirm={() => deleteId && deleteuser(deleteId)}
          isLoading={loading}
          title="Delete User?"
          message="Are you sure you want to delete this user? This process cannot be undone."
        />
      )}
      <h1 className="text-4xl text-center font-bold bg-white border-blue-500 border-b-2 text-blue-500 py-5">
        Users
      </h1>
      <Box className="mx-16 mt-6 !bg-white [&_.MuiDataGrid-columnHeader]:!bg-sky-500 [&_.MuiDataGrid-columnHeaderCheckbox]:!bg-sky-500 [&_.MuiDataGrid-scrollbarFiller--header]:!bg-sky-500 [&_.MuiDataGrid-filler--pinnedRight]:!bg-sky-500">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Users;