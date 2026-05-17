export const CALL_BOOKING_TITLE = "30-Minute Consultation Call"
export const CALL_BOOKING_DESCRIPTION = "Reserve a 30-minute call."
export const CALL_BOOKING_DURATION = "30 minutes"
export const CALL_BOOKING_AMOUNT = 10000
export const CALL_BOOKING_AMOUNT_LABEL = "MYR100"
export const CALL_BOOKING_CURRENCY = "MYR"
export const CALL_BOOKING_PRODUCT_TYPE = "consultation_call"
export const CALL_BOOKING_WHATSAPP_URL = "https://wa.me/message/E55QFBV5K3CGH1"
export const CALL_BOOKING_FORMSPREE_ENDPOINT = "https://formspree.io/f/xnnjkdvn"
export const CALL_BOOKING_SLOT_MINUTES = 30
export const CALL_BOOKING_TIMEZONE = "Asia/Kuala_Lumpur"
export const CALL_BOOKING_TIMEZONE_LABEL = "MYT"
export const CALL_BOOKING_WORKING_HOURS = {
  0: [],
  1: [{ start: "09:00", end: "18:00" }],
  2: [{ start: "09:00", end: "18:00" }],
  3: [{ start: "09:00", end: "18:00" }],
  4: [{ start: "09:00", end: "18:00" }],
  5: [{ start: "09:00", end: "18:00" }],
  6: [{ start: "10:00", end: "14:00" }],
} as const

export type CallBookingFormData = {
  name: string
  email: string
  phone: string
  selectedDate: string
  selectedTime: string
  agenda: string
}
