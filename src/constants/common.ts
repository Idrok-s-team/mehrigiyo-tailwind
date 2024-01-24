export const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL
export const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
export const baseSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL

export const DateFormat = {
  ISO_DATE: 'YYYY-MM-DD',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
  LOCAL_DATE: 'DD.MM.YYYY',
  LOCAL_TIME: 'HH:mm',
  LOCAL_DATETIME: 'HH:mm / DD.MM.YYYY',
} as const

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCTS_CATEGORY: '/products/category',
  ONLINE_DOCTORS: '/online_doctors',
  ONLINE_DOCTORS_CATEGORY: '/online_doctors/category',
  ABOUT_US: '/about_us',
  NEWS: '/news',
  HELP: '/help',
  HELP_FAQ: '/help/faq',
  FAVORITE_DOCTORS: '/favorite_doctors',
  FAVORITE_PRODUCTS: '/favorite_products',
  CART: '/cart',
  DASHBOARD: '/dashboard',
  DASHBOARD_CONTROL_PANEL: '/dashboard/control-panel',
  DASHBOARD_CONSULTATION: '/dashboard/consultation',
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_DELIVERY_ADDRESS: '/dashboard/delivery-address',
  DASHBOARD_PAYMENT_METHODS: '/dashboard/payment-methods',
  DASHBOARD_NOTIFICATIONS: '/dashboard/notifications',
  DASHBOARD_SETTINGS: '/dashboard/settings',
} as const

export const APP_DOWNLOAD_LINKS = {
  PLAY_STORE: "https://play.google.com/store/apps/details?id=com.mehrigiyo.doctor_ali",
  APP_STORE: "https://play.google.com/store/apps/details?id=com.mehrigiyo.doctor_ali"
} as const

export const WARNING_TEXTS = {
  PLEASE_REGISTER_FIRST: "Iltimos avval ro'yxatdan o'ting",
  SOMETHING_WENT_WRONG: "Nimadur xato bo'ldi, iltimos qayta urinib ko'ring",
  PRODUCT_ALREADY_IN_CART: "Ushbu mahsulot allaqachon savatga qo'shilgan"
}