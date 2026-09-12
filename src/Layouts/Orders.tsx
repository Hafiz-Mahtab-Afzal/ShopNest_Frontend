import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BsEye } from 'react-icons/bs';
import apis from '../config/apis';
import Loader from './Loader';

// ✅ TypeScript interfaces — backend data ke mutabiq
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

interface ShippingAddress {
  address: string;
  pastal_code: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  buyer: string;
  items: OrderItem[];
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  shippingCharges: number;
  saving: number;
  stripeId: string;
  createdAt: string;
  updatedAt: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${apis.order}/my-orders`, {
          withCredentials: true,
        });
        setOrders(data.orders ?? []);
      } catch (err: unknown) {
        console.log((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Search filter
  const filtered = orders.filter((order) => {
    const q = search.toLowerCase();
    return (
      order._id.toLowerCase().includes(q) ||
      order.orderStatus.toLowerCase().includes(q) ||
      order.items.some((i) =>
        i.product?.title?.toLowerCase().includes(q)
      )
    );
  });

  // ✅ Rows banao — backend data se
  const rows = filtered.map((order, index) => ({
    id: index + 1,
    pid: order._id,
    product: order.items[0]?.product?.title || 'N/A',
    qty: order.items.reduce((sum, i) => sum + i.qty, 0),
    totalprice: order.items.reduce((sum, i) => sum + i.totalprice, 0),
    status: order.orderStatus,
    city: order.shippingAddress?.city || 'N/A',
    shippingCharges: order.shippingCharges,
    saving: order.saving,
    date: new Date(order.createdAt).toLocaleDateString('en-PK', {
      day: 'numeric', month: 'short', year: 'numeric',
    }),
    extraItems: order.items.length - 1,
  }));

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'product', headerName: 'Product', width: 220 },
    {
      field: 'qty',
      headerName: 'Qty',
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.qty}
          {params.row.extraItems > 0 && (
            <span className="text-gray-400 text-xs ml-1">
              +{params.row.extraItems} more
            </span>
          )}
        </span>
      ),
    },
    {
      field: 'totalprice',
      headerName: 'Amount',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <span className="font-semibold text-sky-600">
          Rs. {params.row.totalprice.toLocaleString()}
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const statusColors: Record<string, string> = {
          pending:   'bg-amber-100 text-amber-700',
          shipped:   'bg-purple-100 text-purple-700',
          delivered: 'bg-green-100 text-green-700',
          cancelled: 'bg-red-100 text-red-700',
        };
        const color = statusColors[params.row.status] || 'bg-gray-100 text-gray-700';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${color}`}>
            {params.row.status}
          </span>
        );
      },
    },
    { field: 'city', headerName: 'City', width: 110 },
    {
      field: 'shippingCharges',
      headerName: 'Shipping',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <span className={params.row.shippingCharges === 0 ? 'text-green-600 font-semibold' : ''}>
          {params.row.shippingCharges === 0 ? 'FREE' : `Rs. ${params.row.shippingCharges}`}
        </span>
      ),
    },
    {
      field: 'saving',
      headerName: 'Saved',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span className="text-green-600 font-semibold">
          Rs. {params.row.saving.toLocaleString()}
        </span>
      ),
    },
    { field: 'date', headerName: 'Date', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 198,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Button
            onClick={() => window.open(`/product/${params.row.pid}`, '_blank')}
            className='!bg-sky-500 !text-white !text-xs !p-2 !font-bold'
          >
            <BsEye className='mr-1 !text-lg' /> View
          </Button>
        </Box>
      ),
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {orders.length} order{orders.length !== 1 ? 's' : ''} total
            </p>
          </div>
        </div>

        {/* ✅ Search bar — same style */}
        <div className="mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, status, or order ID…"
            className="w-full sm:w-96 pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-sky-400 transition-colors"
          />
        </div>

        {/* ✅ Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-600 mb-2">No orders yet</p>
            <p className="text-sm text-gray-400">Once you place an order, it will appear here.</p>
          </div>
        ) : (
          <Box className="bg-white rounded-xl shadow-sm overflow-hidden">
            <DataGrid
              className='!bg-white [&_.MuiDataGrid-columnHeader]:!bg-sky-500 [&_.MuiDataGrid-columnHeaderCheckbox]:!bg-sky-500 [&_.MuiDataGrid-scrollbarFiller--header]:!bg-sky-500'
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              autoHeight
            />
          </Box>
        )}

      </div>
    </div>
  );
};

export default MyOrders;