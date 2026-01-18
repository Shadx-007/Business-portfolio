"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import {
  Globe,
  Layout,
  Cpu,
  Database,
  ShieldCheck,
  BarChart3,
  CreditCard,
  ShoppingCart,
  CheckCircle,
  Package,
  Zap,
  Smartphone,
  Server,
  Code,
  Shield,
  Truck,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  Home,
  Lock,
  User,
  ArrowRight,
  RefreshCw,
  Shield as ShieldIcon,
  Loader2,
  X,
  Plus,
  Minus,
  Trash2,
  AlertCircle,
  Check,
  Star,
  Gift,
  Award,
  Download,
  Receipt,
  Percent,
  FileText,
  Send,
  Eye,
  EyeOff,
} from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51YourTestKey")

const services = [
  { title: "Web Development", icon: Globe, desc: "High-performance Next.js apps with modern frameworks." },
  { title: "UI/UX Design", icon: Layout, desc: "Conversion-optimized designs that drive engagement." },
  { title: "AI Integration", icon: Cpu, desc: "Custom LLM and AI model integrations." },
  { title: "Cloud Solutions", icon: Database, desc: "Scalable AWS/Vercel infrastructure." },
  { title: "Security", icon: ShieldCheck, desc: "Enterprise-grade protection & compliance." },
  { title: "Analytics", icon: BarChart3, desc: "Data-driven growth and insights tools." },
  { title: "Mobile Apps", icon: Smartphone, desc: "Cross-platform React Native applications." },
  { title: "DevOps", icon: Server, desc: "CI/CD pipelines and deployment automation." },
  { title: "Blockchain", icon: Shield, desc: "Smart contracts and Web3 solutions." },
]

// 🖥️ SOFTWARE PRODUCTS
const softwareProducts = [
  { id: 1, name: "Website Development", price: 500, category: "development", image: "/api/placeholder/400/300", deliveryDays: 7 },
  { id: 2, name: "UI/UX Design Package", price: 400, category: "design", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 3, name: "AI Model Integration", price: 700, category: "ai", image: "/api/placeholder/400/300", deliveryDays: 10 },
  { id: 4, name: "Cloud Deployment", price: 600, category: "cloud", image: "/api/placeholder/400/300", deliveryDays: 3 },
  { id: 5, name: "Mobile App Development", price: 1200, category: "mobile", image: "/api/placeholder/400/300", deliveryDays: 14 },
  { id: 6, name: "E-commerce Solution", price: 1500, category: "development", image: "/api/placeholder/400/300", deliveryDays: 10 },
  { id: 7, name: "CMS Setup", price: 450, category: "development", image: "/api/placeholder/400/300", deliveryDays: 2 },
  { id: 8, name: "API Development", price: 800, category: "development", image: "/api/placeholder/400/300", deliveryDays: 7 },
  { id: 9, name: "Security Audit", price: 900, category: "security", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 10, name: "SEO Optimization", price: 350, category: "marketing", image: "/api/placeholder/400/300", deliveryDays: 3 },
]

// 🔩 HARDWARE PRODUCTS
const hardwareProducts = [
  { id: 11, name: "Raspberry Pi 4 (8GB)", price: 3500, category: "single-board", image: "/api/placeholder/400/300", deliveryDays: 2 },
  { id: 12, name: "Arduino Uno R3", price: 1200, category: "microcontrollers", image: "/api/placeholder/400/300", deliveryDays: 3 },
  { id: 13, name: "USB Camera Module HD", price: 900, category: "sensors", image: "/api/placeholder/400/300", deliveryDays: 4 },
  { id: 14, name: "Ultrasonic Sensor HC-SR04", price: 180, category: "sensors", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 15, name: "Servo Motor SG90", price: 350, category: "motors", image: "/api/placeholder/400/300", deliveryDays: 3 },
  { id: 16, name: "ESP32 Development Board", price: 650, category: "iot", image: "/api/placeholder/400/300", deliveryDays: 2 },
  { id: 17, name: "LED Matrix Display", price: 1200, category: "displays", image: "/api/placeholder/400/300", deliveryDays: 7 },
  { id: 18, name: "Relay Module 4-Channel", price: 450, category: "modules", image: "/api/placeholder/400/300", deliveryDays: 4 },
  { id: 19, name: "Raspberry Pi Camera V2", price: 2800, category: "camera", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 20, name: "NodeMCU ESP8266", price: 550, category: "iot", image: "/api/placeholder/400/300", deliveryDays: 3 },
  { id: 21, name: "GPS Module NEO-6M", price: 850, category: "modules", image: "/api/placeholder/400/300", deliveryDays: 6 },
  { id: 22, name: "OLED Display 0.96'", price: 400, category: "displays", image: "/api/placeholder/400/300", deliveryDays: 4 },
  { id: 23, name: "Stepper Motor 28BYJ-48", price: 300, category: "motors", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 24, name: "DHT22 Sensor", price: 220, category: "sensors", image: "/api/placeholder/400/300", deliveryDays: 3 },
]

// 🎯 FEATURED PRODUCTS
const featuredProducts = [
  { id: 101, name: "AI Development Kit", price: 2500, category: "ai", type: "software", image: "/api/placeholder/400/300", deliveryDays: 5 },
  { id: 102, name: "IoT Starter Bundle", price: 5000, category: "iot", type: "hardware", image: "/api/placeholder/400/300", deliveryDays: 7 },
  { id: 103, name: "Full Stack Pro Package", price: 3500, category: "development", type: "software", image: "/api/placeholder/400/300", deliveryDays: 10 },
]

// Delivery tracking steps
const deliverySteps = [
  { id: 1, name: "Order Confirmed", description: "Your order has been confirmed", icon: CheckCircle, status: "completed" },
  { id: 2, name: "Processing", description: "Preparing your order", icon: Package, status: "completed" },
  { id: 3, name: "Shipped", description: "Order has been shipped", icon: Truck, status: "completed" },
  { id: 4, name: "In Transit", description: "On the way to delivery", icon: MapPin, status: "current" },
  { id: 5, name: "Out for Delivery", description: "Will be delivered today", icon: Clock, status: "pending" },
  { id: 6, name: "Delivered", description: "Successfully delivered", icon: Home, status: "pending" },
]

// Order history mock data
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: ["Website Development", "UI/UX Design"],
    total: 900,
    subtotal: 900,
    discount: 0,
    tax: 162,
    gst: 162,
    shipping: 99,
    grandTotal: 1161,
    status: "delivered",
    trackingNumber: "TRK789456123",
    deliveryDate: "2024-01-22",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: ["Raspberry Pi 4", "Arduino Uno"],
    total: 4700,
    subtotal: 4700,
    discount: 470,
    tax: 846,
    gst: 846,
    shipping: 99,
    grandTotal: 5175,
    status: "shipped",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
  },
]

type Order = {
  id: string;
  date: string;
  items: string[];
  total: number;
  subtotal: number;
  discount: number;
  tax: number;
  gst: number;
  shipping: number;
  grandTotal: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  deliveryDate?: string;
  estimatedDelivery?: string;
  customerInfo?: any;
}

type InvoiceData = {
  invoiceNumber: string;
  date: string;
  customer: any;
  items: any[];
  subtotal: number;
  discount: number;
  tax: number;
  gst: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  orderId: string;
}

export default function ServicesPage() {
  const [category, setCategory] = useState<"software" | "hardware" | "featured">("software")
  const [cart, setCart] = useState<any[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [selectedPayment, setSelectedPayment] = useState<string>("card")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "delivery">("products")
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [showInvoice, setShowInvoice] = useState(false)
  const [showServices, setShowServices] = useState(true) // State for hiding/showing services

  const products = category === "software" ? softwareProducts : 
                   category === "hardware" ? hardwareProducts : 
                   featuredProducts

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      updateQuantity(existingItem.cartId, 1)
    } else {
      setCart([...cart, { ...item, cartId: Date.now() + Math.random(), quantity: 1 }])
    }
  }

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = (item.quantity || 1) + delta
        if (newQuantity < 1) {
          removeFromCart(cartId)
          return item
        }
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  // Calculate discount (10% if subtotal > 1000)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0
  const totalAfterDiscount = subtotal - discount
  const shipping = cart.length > 0 ? 99 : 0
  const tax = totalAfterDiscount * 0.05 // 5% Tax
  const gst = totalAfterDiscount * 0.18 // 18% GST
  const grandTotal = totalAfterDiscount + shipping + tax + gst

  const generateOrderId = () => {
    return `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  }

  const generateInvoiceNumber = () => {
    return `INV-${Date.now().toString().slice(-8)}`
  }

  const generateTrackingNumber = () => {
    return `TRK${Date.now().toString().slice(-9)}`
  }

  const handleCheckout = async () => {
    if (cart.length === 0 || !customerInfo.name || !customerInfo.email || !customerInfo.address) {
      alert("Please fill in all required fields and add items to cart")
      return
    }
    
    setPaymentStatus("processing")
    
    try {
      // Simulate payment processing with Stripe
      const stripe = await stripePromise
      
      // Create a mock checkout session (in real app, this would be from your backend)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate invoice data
      const newInvoice: InvoiceData = {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date().toISOString().split('T')[0],
        customer: customerInfo,
        items: cart,
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        gst: gst,
        shipping: shipping,
        grandTotal: grandTotal,
        paymentMethod: "Credit Card",
        orderId: generateOrderId(),
      }
      
      setInvoiceData(newInvoice)
      
      // Create new order
      const newOrder: Order = {
        id: newInvoice.orderId,
        date: new Date().toISOString().split('T')[0],
        items: cart.map(item => item.name),
        total: subtotal,
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        gst: gst,
        shipping: shipping,
        grandTotal: grandTotal,
        status: 'processing',
        trackingNumber: generateTrackingNumber(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        customerInfo: customerInfo,
      }
      
      setOrders([newOrder, ...orders])
      setCurrentOrder(newOrder)
      setPaymentStatus("success")
      
      // Clear cart after successful payment
      setTimeout(() => {
        setCart([])
        setShowCheckout(false)
        setPaymentStatus("idle")
        setCustomerInfo({
          name: "",
          email: "",
          address: "",
          phone: "",
          city: "",
          state: "",
          zipCode: "",
        })
        setActiveTab("delivery")
      }, 2000)
      
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("error")
      setTimeout(() => setPaymentStatus("idle"), 3000)
    }
  }

  const handleSubmit = () => {
    // Clear all input fields
    setCustomerInfo({
      name: "",
      email: "",
      address: "",
      phone: "",
      city: "",
      state: "",
      zipCode: "",
    })
    
    // Display thank you message
    setShowThankYouMessage(true)
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setShowThankYouMessage(false)
    }, 5000)
  }

  const downloadInvoice = () => {
    if (!invoiceData) return
    
    const invoiceContent = generateInvoiceHTML(invoiceData)
    const blob = new Blob([invoiceContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoiceData.invoiceNumber}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateInvoiceHTML = (data: InvoiceData) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${data.invoiceNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #4f46e5; border-radius: 12px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .company-info h1 { color: #4f46e5; margin: 0; }
        .company-info p { margin: 5px 0; color: #666; }
        .invoice-info { text-align: right; }
        .invoice-info h2 { color: #4f46e5; margin: 0; }
        .section { margin: 25px 0; }
        .section-title { border-bottom: 2px solid #4f46e5; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold; color: #4f46e5; }
        .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th { background: #4f46e5; color: white; padding: 12px; text-align: left; }
        .items-table td { padding: 12px; border-bottom: 1px solid #ddd; }
        .totals { float: right; width: 300px; margin-top: 30px; }
        .total-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .total-row.grand-total { font-size: 18px; font-weight: bold; color: #4f46e5; border-top: 2px solid #4f46e5; padding-top: 10px; }
        .discount-badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 14px; }
        .tax-info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="company-info">
                <h1>Tech Solutions Inc.</h1>
                <p>123 Tech Street, Mumbai</p>
                <p>GSTIN: 27AABCU9603R1ZX</p>
                <p>Phone: +91 9876543210</p>
                <p>Email: billing@techsolutions.com</p>
            </div>
            <div class="invoice-info">
                <h2>INVOICE</h2>
                <p><strong>Invoice #:</strong> ${data.invoiceNumber}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Bill To</div>
            <div class="customer-info">
                <div>
                    <p><strong>${data.customer.name}</strong></p>
                    <p>${data.customer.address}</p>
                    <p>${data.customer.city}, ${data.customer.state} ${data.customer.zipCode}</p>
                </div>
                <div>
                    <p><strong>Contact Information</strong></p>
                    <p>Phone: ${data.customer.phone}</p>
                    <p>Email: ${data.customer.email}</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Items</div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity || 1}</td>
                        <td>₹${item.price.toLocaleString()}</td>
                        <td>₹${(item.price * (item.quantity || 1)).toLocaleString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="totals">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>₹${data.subtotal.toLocaleString()}</span>
            </div>
            ${data.discount > 0 ? `
            <div class="total-row">
                <span>Discount (10%):</span>
                <span class="discount-badge">-₹${data.discount.toLocaleString()}</span>
            </div>
            ` : ''}
            <div class="total-row">
                <span>Shipping:</span>
                <span>₹${data.shipping.toLocaleString()}</span>
            </div>
            <div class="total-row">
                <span>Tax (5%):</span>
                <span>₹${data.tax.toLocaleString()}</span>
            </div>
            <div class="total-row">
                <span>GST (18%):</span>
                <span>₹${data.gst.toLocaleString()}</span>
            </div>
            <div class="total-row grand-total">
                <span>Grand Total:</span>
                <span>₹${data.grandTotal.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="tax-info">
            <p><strong>Tax Information:</strong></p>
            <p>GSTIN: 27AABCU9603R1ZX</p>
            <p>Tax is included in the total amount as per Indian GST regulations.</p>
        </div>
        
        <div class="section">
            <div class="section-title">Payment Information</div>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Payment Status:</strong> Paid</p>
            <p><strong>Date of Payment:</strong> ${data.date}</p>
        </div>
        
        <div class="footer">
            <p>Thank you for your business!</p>
            <p>Terms & Conditions: All sales are final. Returns accepted within 30 days.</p>
            <p>For any queries, contact: support@techsolutions.com | +91 9876543210</p>
        </div>
    </div>
</body>
</html>
    `
  }

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  // Function to toggle services visibility
  const toggleServicesVisibility = () => {
    setShowServices(!showServices)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      {/* ===== NOTIFICATION BAR ===== */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5" />
            <span className="font-semibold">🎁 Free Shipping on Orders Above ₹5000!</span>
          </div>
          <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-bold">TODAY</span>
        </div>
      </motion.div>

      {/* ===== THANK YOU MESSAGE ===== */}
      {showThankYouMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-center border border-white/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6" />
              <span className="font-bold text-lg">Thank you for your response!</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== INVOICE MODAL ===== */}
      {showInvoice && invoiceData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                <Receipt className="inline mr-2" />
                Invoice #{invoiceData.invoiceNumber}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={downloadInvoice}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={() => setShowInvoice(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
            
            {/* Invoice Preview */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-lg mb-2">Tech Solutions Inc.</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">123 Tech Street, Mumbai</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GSTIN: 27AABCU9603R1ZX</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-lg mb-2">INVOICE</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#{invoiceData.invoiceNumber}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date: {invoiceData.date}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Bill To:</h4>
                <p className="font-semibold">{invoiceData.customer.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{invoiceData.customer.address}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{invoiceData.customer.email} | {invoiceData.customer.phone}</p>
              </div>
              
              <table className="w-full mb-6">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-left">Qty</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity || 1}</td>
                      <td className="p-3">₹{item.price.toLocaleString()}</td>
                      <td className="p-3">₹{(item.price * (item.quantity || 1)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="ml-auto w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{invoiceData.subtotal.toLocaleString()}</span>
                </div>
                {invoiceData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%):</span>
                    <span>-₹{invoiceData.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{invoiceData.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>₹{invoiceData.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{invoiceData.gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Grand Total:</span>
                  <span>₹{invoiceData.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 mt-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Tech Services & Store
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Premium software services and hardware components with guaranteed delivery
        </p>
      </motion.div>

      {/* ===== NAVIGATION TABS ===== */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-2xl bg-white/5 p-2 border border-white/10">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "products"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white"
                : "hover:bg-white/5"
            }`}
          >
            🛒 Products
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "cart"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white"
                : "hover:bg-white/5"
            }`}
          >
            🛍️ Cart ({cartCount})
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "delivery"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white"
                : "hover:bg-white/5"
            }`}
          >
            🚚 Delivery Tracking
          </button>
        </div>
      </div>

      {/* ===== PRODUCTS TAB ===== */}
      {activeTab === "products" && (
        <>
          {/* ===== SERVICES DISPLAY ===== */}
          <section className="mb-24">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                Our Premium Services
              </h2>
              
              {/* HIDE/SHOW SERVICES BUTTON */}
              <button
                onClick={toggleServicesVisibility}
                className="px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {showServices ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Services
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Services
                  </>
                )}
              </button>
            </div>
            
            {/* Services Section - Conditionally Rendered */}
            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl glass border-2 border-white/5 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <s.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                        <p className="text-muted-foreground mb-6">{s.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">Starting at ₹500</span>
                          <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5">
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Message when services are hidden */}
            {!showServices && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/5 rounded-3xl border border-white/10"
              >
                <EyeOff className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Services section is hidden</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click "Show Services" button to view our premium services
                </p>
              </motion.div>
            )}
          </section>

          {/* ===== FEATURED PRODUCTS ===== */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              Featured Products
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 border border-white/10 overflow-hidden"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl mb-6 flex items-center justify-center">
                    <Package className="h-20 w-20 text-primary/40" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{product.name}</h4>
                      <p className="text-muted-foreground capitalize">{product.category}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-400">Delivery in {product.deliveryDays} days</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-black font-bold hover:opacity-90"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== PRODUCT CATEGORY SELECTOR ===== */}
          <section className="mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setCategory("featured")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                  category === "featured"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-2xl shadow-yellow-500/30"
                    : "border-2 border-white/20 hover:border-yellow-500/50"
                }`}
              >
                <Star className="h-5 w-5" />
                Featured
              </button>

              <button
                onClick={() => setCategory("software")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                  category === "software"
                    ? "bg-gradient-to-r from-primary to-cyan-500 text-black shadow-2xl shadow-primary/30"
                    : "border-2 border-white/20 hover:border-primary/50"
                }`}
              >
                <Code className="h-5 w-5" />
                Software Products
              </button>

              <button
                onClick={() => setCategory("hardware")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                  category === "hardware"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-2xl shadow-green-500/30"
                    : "border-2 border-white/20 hover:border-green-500/50"
                }`}
              >
                <Cpu className="h-5 w-5" />
                Hardware Products
              </button>
            </div>

            {/* ===== PRODUCTS GRID ===== */}
            <div className="glass p-8 rounded-3xl border border-white/10 mb-16">
              <h2 className="text-3xl font-bold capitalize flex items-center gap-3 mb-8">
                {category === "featured" ? "🔥 Featured Products" : 
                 category === "software" ? "💻 Software Products" : "🔩 Hardware Products"}
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                  {products.length} items
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="w-full h-40 bg-gradient-to-br from-white/10 to-transparent rounded-xl mb-4 flex items-center justify-center">
                      <Package className="h-16 w-16 text-primary/40" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                        </div>
                        <span className="text-xl font-bold text-primary">₹{item.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-400">Delivery in {item.deliveryDays} days</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-black font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        Add to Cart
                      </button>
                      <button className="px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== CART TAB ===== */}
      {activeTab === "cart" && (
        <section className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6" />
                  Your Shopping Cart
                  {cartCount > 0 && (
                    <span className="text-sm bg-primary text-black px-3 py-1 rounded-full">
                      {cartCount} items
                    </span>
                  )}
                </h3>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-24 w-24 text-white/10 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="mt-4 px-6 py-2 rounded-lg bg-primary text-black font-semibold hover:opacity-90"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/5"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/5"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-bold min-w-[80px] text-right">
                            ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Order Summary & Checkout */}
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CreditCard className="h-6 w-6" />
                Order Summary
              </h3>

              {/* Order Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center gap-2">
                      <Percent className="h-3 w-3" />
                      Discount (10% on orders above ₹1000)
                    </span>
                    <span className="font-bold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{cart.length > 0 ? "₹99" : "Free"}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 font-semibold">
                        You saved ₹{discount.toLocaleString()} with 10% discount!
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary text-2xl">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {showCheckout ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 mb-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Information</label>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-2"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-2"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-2"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                    <textarea
                      placeholder="Complete Address *"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 h-24"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="City"
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                        value={customerInfo.state}
                        onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                        value={customerInfo.zipCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {/* Payment Status */}
              {paymentStatus === "processing" && (
                <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    <span>Processing your payment...</span>
                  </div>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-bold">Payment Successful!</span>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => setShowInvoice(true)}
                      className="px-3 py-1 rounded-lg bg-primary/20 text-primary border border-primary/30 text-sm hover:bg-primary/30"
                    >
                      <FileText className="inline mr-1 h-3 w-3" />
                      View Invoice
                    </button>
                    <button
                      onClick={downloadInvoice}
                      className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-sm hover:bg-green-500/30"
                    >
                      <Download className="inline mr-1 h-3 w-3" />
                      Download
                    </button>
                  </div>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    Redirecting to delivery tracking...
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center justify-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="font-bold">Payment Failed</span>
                  </div>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    Please try again
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {!showCheckout ? (
                  <button
                    onClick={() => cart.length > 0 && setShowCheckout(true)}
                    disabled={cart.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg ${
                      cart.length === 0
                        ? "bg-white/10 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    }`}
                  >
                    {cart.length === 0 ? "Add Items to Checkout" : "Proceed to Checkout"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCheckout}
                      disabled={paymentStatus === "processing" || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
                      className={`w-full py-4 rounded-xl font-bold text-lg ${
                        paymentStatus === "processing" || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address
                          ? "bg-white/10 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                      }`}
                    >
                      {paymentStatus === "processing" ? "Processing..." : `Pay ₹${grandTotal.toLocaleString()}`}
                    </button>
                    
                    {/* SUBMIT BUTTON */}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90 flex items-center justify-center gap-3"
                    >
                      <Send className="h-5 w-5" />
                      Submit
                    </button>
                  </>
                )}

                {showCheckout && (
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5"
                  >
                    Back to Cart
                  </button>
                )}
              </div>

              {/* Security Badges */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">100% Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>SSL Encrypted</span>
                    <span>•</span>
                    <span>GST Invoice</span>
                    <span>•</span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== DELIVERY TRACKING TAB ===== */}
      {activeTab === "delivery" && (
        <section className="max-w-6xl mx-auto">
          <div className="glass p-8 rounded-3xl border border-white/10 mb-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Truck className="h-6 w-6" />
              Delivery Tracking
            </h3>

            {currentOrder ? (
              <div className="space-y-6">
                {/* Current Order Status */}
                <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-xl font-bold">Current Order</h4>
                      <p className="text-muted-foreground">Order #{currentOrder.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                        {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                      </span>
                      {currentOrder.discount > 0 && (
                        <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                          <Percent className="h-3 w-3" />
                          Discount Applied
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Order Date</p>
                          <p className="font-semibold">{currentOrder.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Tracking Number</p>
                          <p className="font-semibold">{currentOrder.trackingNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Est. Delivery</p>
                          <p className="font-semibold">{currentOrder.estimatedDelivery}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Download Invoice Button */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => invoiceData && setShowInvoice(true)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:opacity-90 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Invoice
                    </button>
                  </div>
                </div>

                {/* Delivery Progress */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">Delivery Progress</h4>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 ml-6"></div>
                    {deliverySteps.map((step, index) => (
                      <div key={step.id} className="relative flex items-start gap-4 mb-8 ml-8">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                          step.status === "completed" 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : step.status === "current"
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-white/5 text-white/40 border border-white/10"
                        }`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-semibold">{step.name}</h5>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {index === 3 && (
                            <p className="text-sm text-primary mt-2">📍 Current location: Mumbai Warehouse</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : orders.length > 0 ? (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-4">Track Another Order</h4>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10"
                    />
                    <button className="px-6 py-3 rounded-lg bg-primary text-black font-semibold">
                      Track
                    </button>
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-4">Order History</h4>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-semibold">Order #{order.id}</h5>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                          {order.discount > 0 && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full mt-1 inline-flex items-center gap-1">
                              <Percent className="h-2 w-2" />
                              Saved ₹{order.discount}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{order.grandTotal}</p>
                          <p className="text-sm text-muted-foreground">Status: 
                            <span className={`ml-2 ${
                              order.status === "delivered" ? "text-green-400" :
                              order.status === "shipped" ? "text-blue-400" :
                              "text-yellow-400"
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Tracking: </span>
                          <span>{order.trackingNumber}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentOrder(order)}
                            className="text-primary hover:underline flex items-center gap-2"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Truck className="h-24 w-24 text-white/10 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No orders yet</p>
                <p className="text-sm text-muted-foreground mt-2">Complete a purchase to track delivery</p>
                <button
                  onClick={() => setActiveTab("products")}
                  className="mt-6 px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:opacity-90"
                >
                  Shop Now
                </button>
              </div>
            )}
          </div>

          {/* Delivery Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h5 className="font-bold">Delivery Guarantee</h5>
                  <p className="text-sm text-muted-foreground">On-time delivery or money back</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h5 className="font-bold">24/7 Support</h5>
                  <p className="text-sm text-muted-foreground">Call +91-9876543210 for help</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h5 className="font-bold">Easy Returns</h5>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FOOTER NOTE ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20 pt-10 border-t border-white/10"
      >
        <p className="text-muted-foreground text-lg">
          Need help with your order? Contact our support team
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Support
          </button>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call Support
          </button>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-black font-bold hover:opacity-90">
            Live Chat
          </button>
        </div>
      </motion.div>
    </div>
  )
}