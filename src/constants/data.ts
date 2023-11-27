import { SortCriteriaType } from '@/types'

export const faqData = [
  {
    title: `Alatoo sharbatining tarkibi qanday?`,
    children: `Detoks sharbati Alatoo juda oddiy tarkibga ega. Bular yashil papayya sharbati va achchiq tarvuz sharbati. O'z navbatida, bu ikki komponent organik kislotalar, vitamin C, vitamin b1, vitamin D va papain fermenti kabi ko'plab foydali fermentlar, iz elementlari va vitaminlarni o'z ichiga oladi.`,
  },
  {
    title: `Alatoo qancha turadi va yetkazib berish qancha?`,
    children: `Detoks sharbati Alatoo juda oddiy tarkibga ega. Bular yashil papayya sharbati va achchiq tarvuz sharbati. O'z navbatida, bu ikki komponent organik kislotalar, vitamin C, vitamin b1, vitamin D va papain fermenti kabi ko'plab foydali fermentlar, iz elementlari va vitaminlarni o'z ichiga oladi.`,
  },
  {
    title: `Salom, bu sharbatga tez-tez allergiyangiz bormi?`,
    children: `Detoks sharbati Alatoo juda oddiy tarkibga ega. Bular yashil papayya sharbati va achchiq tarvuz sharbati. O'z navbatida, bu ikki komponent organik kislotalar, vitamin C, vitamin b1, vitamin D va papain fermenti kabi ko'plab foydali fermentlar, iz elementlari va vitaminlarni o'z ichiga oladi.`,
  },
  {
    title: `Alatoo sharbati tez-tez takrorlanadigan gerpes uchun samaralimi?`,
    children: `Detoks sharbati Alatoo juda oddiy tarkibga ega. Bular yashil papayya sharbati va achchiq tarvuz sharbati. O'z navbatida, bu ikki komponent organik kislotalar, vitamin C, vitamin b1, vitamin D va papain fermenti kabi ko'plab foydali fermentlar, iz elementlari va vitaminlarni o'z ichiga oladi.`,
  },
  {
    title: `Salom, o't pufagidagi polip bilan qabul qilish mumkinmi?`,
    children: `Detoks sharbati Alatoo juda oddiy tarkibga ega. Bular yashil papayya sharbati va achchiq tarvuz sharbati. O'z navbatida, bu ikki komponent organik kislotalar, vitamin C, vitamin b1, vitamin D va papain fermenti kabi ko'plab foydali fermentlar, iz elementlari va vitaminlarni o'z ichiga oladi.`,
  },
]

export const contactData = [
  {
    name: 'AQSH',
    address: '625 34-ave, San-Fransisko, CA 94121, AQSh.',
    phone: '+1 415 387 33 99',
  },
  {
    name: "O'zbekiston",
    address: 'Farg‘ona tumani, Uchko‘prik tumani, O‘rozimergan ko‘chasi 94-uy',
    phone: '+998 97 700 78 72',
  },
  {
    name: 'Saudiya Arabistoni',
    phone: '+0 53 223 52 23',
  },
  {
    name: 'Rossiya, Moskva shahri.',
    phone: '+7 995 500 34 56',
  },
  {
    name: "Qozog'iston, Olma-Ota shahri",
    phone: '+7 747 495 35 12',
  },
  {
    name: "Qirg'iziston, O'sh shahri",
    phone: '+996 55 828 28 22',
  },
]

export const sortOptions: { label: string; value: SortCriteriaType }[] = [
  { label: 'Hammasi', value: '' },
  { label: 'Narxi boʻyicha: Yuqoridan Pastga', value: 'price_high_to_low' },
  { label: 'Narxi boʻyicha: Pastdan Yuqoriga', value: 'price_low_to_high' },
  { label: 'Yangi', value: 'newest' },
  { label: 'Eski', value: 'oldest' },
]
