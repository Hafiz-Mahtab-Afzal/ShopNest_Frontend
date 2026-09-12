import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import apis from '../../config/apis';
import { errortoast, successtoast } from '../../toastify/toastify';
import Loader from '../../Layouts/Loader';

interface OrderItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
  };
  qty: number;
  totalprice: number;
}

interface Buyer {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface OrderData {
  _id: string;
  buyer: Buyer;
  items: OrderItem[];
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    city: string;
  };
  createdAt: string;
}

const statusOptions = ['pending', 'shipped', 'delivered', 'cancelled'];

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${apis.order}/admin/all`, {
          withCredentials: true,
        });
        setOrders(data.orders ?? []);
      } catch (err: unknown) {
        console.log((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  // ✅ Admin dropdown se status change kare to yahan API call ho
  const changeStatus = async (id: string, orderStatus: string) => {
    try {
      setUpdatingId(id);
      const { data } = await axios.put(
        `${apis.order}/admin/${id}/status`,
        { orderStatus },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        successtoast(message);
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, orderStatus: orderStatus as OrderData['orderStatus'] } : o
          )
        );
      }
    } catch (err: unknown) {
      errortoast('Status update nahi ho saka');
      console.log((err as Error).message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
    },
    {
      field: 'qty',
      headerName: 'Qty',
      width: 70,
    },
    {
      field: 'totalprice',
      headerName: 'Amount',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 110,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 110,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 190,
      renderCell: (params: GridRenderCellParams) => {
        const isUpdating = updatingId === params.row.pid;
        return (
          <Box>
            <select
              value={params.row.status}
              disabled={isUpdating}
              onChange={(e) => changeStatus(params.row.pid, e.target.value)}
              className="!bg-white border border-gray-300 rounded-md text-xs font-bold px-2 py-2 outline-none cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Box>
        );
      },
    },
  ];

  const rows = orders.map((order, index) => ({
    pid: order._id,
    id: index + 1,
    customer: `${order.buyer?.first_name ?? ''} ${order.buyer?.last_name ?? ''}`.trim() || 'N/A',
    email: order.buyer?.email ?? 'N/A',
    product:
      order.items[0]?.product?.title +
      (order.items.length > 1 ? ` +${order.items.length - 1} more` : ''),
    qty: order.items.reduce((sum, i) => sum + i.qty, 0),
    totalprice: order.items.reduce((sum, i) => sum + i.totalprice, 0),
    city: order.shippingAddress?.city || 'N/A',
    date: new Date(order.createdAt).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    status: order.orderStatus,
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-4xl text-center font-bold bg-[#fff] border-blue-500 border-b-2 text-blue-500 py-5">
        All Orders
      </h1>
      <Box className="mx-16 mt-6">
        <DataGrid
          className="!bg-white [&_.MuiDataGrid-columnHeader]:!bg-sky-500 [&_.MuiDataGrid-columnHeaderCheckbox]:!bg-sky-500 [&_.MuiDataGrid-scrollbarFiller--header]:!bg-sky-500 [&_.MuiDataGrid-filler--pinnedRight]:!bg-sky-500"
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
  );
};

export default AllOrders;