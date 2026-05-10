import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Users,
  Calendar,
  Image,
  Settings,
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  LogOut,
  Globe,
  Bell,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: Users, label: 'Athletes', id: 'athletes' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: Image, label: 'Media', id: 'media' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const stats = [
  {
    label: 'Total Sales',
    value: '$2.4M',
    change: '+12.5%',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Orders',
    value: '18,420',
    change: '+8.2%',
    up: true,
    icon: ShoppingCart,
  },
  {
    label: 'Page Views',
    value: '1.2M',
    change: '+24.1%',
    up: true,
    icon: Eye,
  },
  {
    label: 'Active Users',
    value: '84,200',
    change: '-2.4%',
    up: false,
    icon: TrendingUp,
  },
]

const recentOrders = [
  { id: '#ORD-7421', customer: 'Marcus Chen', product: 'Khaos Original x12', amount: '$35.88', status: 'Completed', date: '2026-05-09' },
  { id: '#ORD-7420', customer: 'Elena Rodriguez', product: 'Khaos Zero x24', amount: '$71.76', status: 'Processing', date: '2026-05-09' },
  { id: '#ORD-7419', customer: 'James Wright', product: 'Khaos Frost x6', amount: '$20.94', status: 'Completed', date: '2026-05-08' },
  { id: '#ORD-7418', customer: 'Sophie Anderson', product: 'Khaos Summer x12', amount: '$41.88', status: 'Shipped', date: '2026-05-08' },
  { id: '#ORD-7417', customer: 'Kai Tanaka', product: 'Khaos Original x48', amount: '$143.52', status: 'Completed', date: '2026-05-07' },
]

const productsList = [
  { id: 1, name: 'Khaos Original', sku: 'KHA-ORG-250', stock: 1240, price: '$2.99', status: 'Active' },
  { id: 2, name: 'Khaos Zero', sku: 'KHA-ZRO-250', stock: 980, price: '$2.99', status: 'Active' },
  { id: 3, name: 'Khaos Summer', sku: 'KHA-SUM-250', stock: 450, price: '$3.49', status: 'Limited' },
  { id: 4, name: 'Khaos Frost', sku: 'KHA-FRS-250', stock: 670, price: '$3.49', status: 'Active' },
]

const athletesList = [
  { id: 1, name: 'Marcus Chen', sport: 'Skateboarding', status: 'Active', joined: '2021' },
  { id: 2, name: 'Elena Rodriguez', sport: 'Motocross', status: 'Active', joined: '2020' },
  { id: 3, name: 'Kai Tanaka', sport: 'Surfing', status: 'Active', joined: '2022' },
  { id: 4, name: 'Sophie Anderson', sport: 'Snowboarding', status: 'Injured', joined: '2019' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-[#050507] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#10101A] border-r border-white/5 flex-shrink-0 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon points="20,2 38,38 2,38" fill="none" stroke="#E31937" strokeWidth="2" />
                <text x="20" y="30" textAnchor="middle" fill="#E31937" fontSize="14" fontFamily="Anton, sans-serif">K</text>
              </svg>
            </div>
            <span className="font-display text-lg text-white">KHAOS CMS</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 font-body text-sm transition-all duration-300 ${
                activeTab === item.id
                  ? 'text-[#E31937] bg-[#E31937]/5 border-r-2 border-[#E31937]'
                  : 'text-[#8A8F98] hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-8 h-8 bg-[#E31937]/20 flex items-center justify-center">
              <span className="font-display text-sm text-[#E31937]">A</span>
            </div>
            <div>
              <p className="font-body text-sm text-white">Admin User</p>
              <p className="font-body text-[10px] text-[#8A8F98]">admin@khaos.com</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-2 font-body text-xs text-[#8A8F98] hover:text-white transition-colors duration-300"
          >
            <ChevronLeft size={14} />
            Back to Site
          </Link>
          <button className="flex items-center gap-2 px-2 py-2 font-body text-xs text-[#8A8F98] hover:text-[#E31937] transition-colors duration-300">
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 bg-[#10101A] border-b border-white/5 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64 bg-[#050507] border border-white/10 pl-10 pr-4 py-2 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors duration-300">
              <Globe size={16} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors duration-300 relative">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E31937] rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-3xl text-white mb-2">Dashboard</h1>
                <p className="font-body text-sm text-[#8A8F98]">Overview of your Khaos Energy operations</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-[#10101A] border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon size={20} className="text-[#8A8F98]" />
                      <span
                        className={`flex items-center gap-1 font-body text-xs ${
                          stat.up ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="font-display text-3xl text-white">{stat.value}</p>
                    <p className="font-body text-xs text-[#8A8F98] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-[#10101A] border border-white/5">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h2 className="font-secondary text-sm tracking-widest text-white">RECENT ORDERS</h2>
                  <button className="font-body text-xs text-[#4A90E2] hover:text-[#6ab7ff]">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">ORDER ID</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">CUSTOMER</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">PRODUCT</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">AMOUNT</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">STATUS</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200">
                          <td className="px-6 py-4 font-body text-sm text-[#4A90E2]">{order.id}</td>
                          <td className="px-6 py-4 font-body text-sm text-white">{order.customer}</td>
                          <td className="px-6 py-4 font-body text-sm text-[#8A8F98]">{order.product}</td>
                          <td className="px-6 py-4 font-body text-sm text-white">{order.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 font-body text-[10px] tracking-wider ${
                              order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                              order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-blue-500/10 text-blue-500'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-body text-sm text-[#8A8F98]">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Add Product', icon: Plus, color: '#E31937' },
                  { label: 'Add Athlete', icon: Users, color: '#4A90E2' },
                  { label: 'Create Event', icon: Calendar, color: '#FF6B35' },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 bg-[#10101A] border border-white/5 p-4 hover:border-white/10 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                      <action.icon size={18} style={{ color: action.color }} />
                    </div>
                    <span className="font-secondary text-sm tracking-wider text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl text-white mb-2">Products</h1>
                  <p className="font-body text-sm text-[#8A8F98]">Manage your product catalog</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#E31937] text-white font-secondary text-sm tracking-wider hover:bg-[#ff3344] transition-colors duration-300">
                  <Plus size={16} />
                  Add Product
                </button>
              </div>

              <div className="bg-[#10101A] border border-white/5">
                <div className="flex items-center gap-4 p-4 border-b border-white/5">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
                    <input type="text" placeholder="Search products..." className="w-full bg-[#050507] border border-white/10 pl-10 pr-4 py-2 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors duration-300">
                    <Filter size={14} />
                    Filter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">PRODUCT</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">SKU</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">STOCK</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">PRICE</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">STATUS</th>
                        <th className="text-left px-6 py-3 font-body text-[10px] tracking-wider text-[#8A8F98]">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList.map((product) => (
                        <tr key={product.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200">
                          <td className="px-6 py-4 font-body text-sm text-white">{product.name}</td>
                          <td className="px-6 py-4 font-body text-sm text-[#8A8F98]">{product.sku}</td>
                          <td className="px-6 py-4 font-body text-sm text-white">{product.stock}</td>
                          <td className="px-6 py-4 font-body text-sm text-white">{product.price}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 font-body text-[10px] tracking-wider ${
                              product.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {product.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="w-8 h-8 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-white hover:border-white/20 transition-colors duration-300">
                                <Edit size={12} />
                              </button>
                              <button className="w-8 h-8 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-[#E31937] hover:border-[#E31937]/20 transition-colors duration-300">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Athletes Tab */}
          {activeTab === 'athletes' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl text-white mb-2">Athletes</h1>
                  <p className="font-body text-sm text-[#8A8F98]">Manage your athlete roster</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#E31937] text-white font-secondary text-sm tracking-wider hover:bg-[#ff3344] transition-colors duration-300">
                  <Plus size={16} />
                  Add Athlete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {athletesList.map((athlete) => (
                  <div key={athlete.id} className="bg-[#10101A] border border-white/5 p-6 hover:border-white/10 transition-colors duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#E31937]/20 to-[#4A90E2]/20 flex items-center justify-center">
                          <span className="font-display text-lg text-white">{athlete.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-secondary text-sm tracking-wider text-white">{athlete.name}</h3>
                          <p className="font-body text-xs text-[#8A8F98]">{athlete.sport}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 font-body text-[10px] tracking-wider ${
                        athlete.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {athlete.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <p className="font-body text-xs text-[#8A8F98]">Joined: {athlete.joined}</p>
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-white transition-colors duration-300">
                          <Edit size={10} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center border border-white/10 text-[#8A8F98] hover:text-[#E31937] transition-colors duration-300">
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {['events', 'media', 'analytics', 'settings'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-16 h-16 bg-[#10101A] border border-white/5 flex items-center justify-center mb-4">
                <Settings size={24} className="text-[#8A8F98]" />
              </div>
              <h2 className="font-display text-2xl text-white mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="font-body text-sm text-[#8A8F98]">
                This section is under development. Check back soon!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
