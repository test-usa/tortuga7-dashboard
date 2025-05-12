// services/bookingService.ts

import api from "../api/api";
import { Booking } from "../types/booking";


export const getAllBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>('/bookings');
  return response.data;
};


export const deleteBooking = async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  };