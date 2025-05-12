import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { deleteBooking, getAllBookings } from "../hooks/bookingService";
import { Booking } from "../types/booking";
import Header from "../components/common/Header";

// Spinner for loading state
const Spinner = () => (
  <div className="flex justify-center items-center h-60">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(id)
          .then(() => {
            setBookings((prev) => prev.filter((b) => b.id !== id));
            Swal.fire("Deleted!", "The booking has been deleted.", "success");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to delete booking");
          });
      }
    });
  };

  return (
    <div className="flex-1 relative z-10">
      <Header title="Bookings" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">
            No bookings found.
          </p>
        ) : (
          <div>
            {bookings.map((b) => (
              <div
                key={b.id}
                className="relative border bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 mt-10"
              >
                <h3 className="text-lg font-semibold mb-4">{b.name}</h3>

                <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
                  {/* Right Side: Customer Info */}
                  <div className="md:w-1/2 space-y-2 mt-6 md:mt-0">
                    <p className="text-sm text-gray-300">
                      <strong>Email:</strong> {b.email}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Phone:</strong> {b.phone}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Country:</strong> {b.country}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Postal Code:</strong> {b.postalCode}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Address:</strong> {b.address}
                    </p>
                  </div>
                  {/* Left Side: Product Info */}
                  <div className="md:w-1/2 space-y-2">
                    <p className="text-sm text-gray-300">
                      <strong>Product:</strong> {b.productName}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Quantity:</strong> {b.quantity}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Booked on:</strong>{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Delete Icon */}
                <div
                  onClick={() => handleDelete(b.id)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <Trash className="text-red-500 rounded p-1 size-8 hover:bg-red-600/20 transition" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
