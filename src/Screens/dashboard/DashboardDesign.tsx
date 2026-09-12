import { Link } from "react-router-dom"
import { MdAddBox } from "react-icons/md"
import { ImUsers } from "react-icons/im"
import { MdShoppingCart } from "react-icons/md"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCategory } from "react-icons/bi"
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts"
import { useState, useEffect } from "react"
import axios from "axios"
import apis from "../../config/apis"

// ✅ TypeScript cheez #1: interface — object ka blueprint
interface ChartData {
  month: string
  TotalUsers: number
  TotalSales: number
}

interface LegendEntry {
  dataKey: string
  value: string
  color: string
}

interface LegendProps {
  payload?: LegendEntry[]
}

const Dashboarddesign = () => {

  // ✅ TypeScript cheez #2: useState ko type batao
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeBar, setActiveBar] = useState<string>("TotalUsers")

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const { data } = await axios.get(`${apis.order}/dashboard/monthly-stats`, {
          withCredentials: true
        });
        if (data.success) {
          setChartData(data.data)
        }
      } catch (error: unknown) {
        console.log("Error fetching monthly stats:", (error as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchMonthlyStats()
  }, [])

  // ✅ TypeScript cheez #3: function parameters ko type batao
  const handleLegendClick = (data: LegendEntry) => {
    setActiveBar(data.dataKey)
  }

  const renderLegend = (props: LegendProps) => {
    const { payload } = props
    return (
      <div className="flex justify-center gap-6 mb-2">
        {payload?.map((entry: LegendEntry) => {
          const isActive = entry.dataKey === activeBar
          return (
            <span
              key={entry.dataKey}
              onClick={() => handleLegendClick(entry)}
              className="flex items-center gap-2 cursor-pointer select-none transition-opacity"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: isActive ? "#1f2937" : "#9ca3af" }}
              >
                {entry.value}
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-4xl text-center font-bold bg-[#fff] border-sky-500 border-b-2 text-sky-600 py-5'>
        Dashboard
      </h1>

      <div className="p-6">

        {/* Banner */}
        <div className="bg-sky-50 rounded-2xl p-8 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome,</h1>
            <h2 className="text-3xl font-bold text-sky-600">
              Admin Dashboard
            </h2>
            <p className="text-gray-500 mt-2 mb-5">
              Here's what happening on your store today.
            </p>
            <Link
              to="/dashboard/addproduct"
              className="bg-sky-600 text-white px-5 py-2 rounded-md flex items-center gap-2 w-fit hover:bg-sky-700 transition-colors"
            >
              <MdAddBox className="text-xl" />
              <span>Add Product</span>
            </Link>
          </div>
          <img
            src="https://img.freepik.com/free-vector/mobile-shopping-concept-illustration_114360-1244.jpg"
            alt="store"
            className="w-52 hidden md:block"
          />
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Users</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <ImUsers className="text-4xl opacity-70" />
          </div>

          <div className="bg-sky-500 text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Orders</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <MdShoppingCart className="text-4xl opacity-70" />
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Products</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <MdProductionQuantityLimits className="text-4xl opacity-70" />
          </div>

          <div className="bg-pink-500 text-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Category</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <BiCategory className="text-4xl opacity-70" />
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Total Users & Total Sales
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Click on "TotalUsers" or "TotalSales" to switch the chart
          </p>

          {loading ? (
            <div className="flex items-center justify-center h-[400px] text-gray-400 text-sm">
              Loading chart...
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[400px] text-gray-400 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#facc15", fontWeight: "bold" }}
                />
                <Legend content={renderLegend as never} />
                <Bar
                  dataKey="TotalSales"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  hide={activeBar !== "TotalSales"}
                />
                <Bar
                  dataKey="TotalUsers"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  hide={activeBar !== "TotalUsers"}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboarddesign