import { ChangeEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
import { TConsultation } from "../../types/consultation";
import { Trash2 } from "lucide-react"; // optional icon
import Swal from "sweetalert2";

interface IConsultationData {
  consultation: TConsultation;
  refetch: () => void;
  index: number;
}

const ConsultationTableRow = ({
  consultation,
  refetch,
  index,
}: IConsultationData) => {
  const [currentStatus, setCurrentStatus] = useState(consultation.status);
  const [deleting, setDeleting] = useState(false);

  // Consultation state change
  const handleConsultationState = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value as SetStateAction<
      "pending" | "rejected" | "approved"
    >;
    try {
      const res = await api.patch(`/consultants/${consultation.id}/status`, {
        status: selectedStatus,
      });
      if (res.status == 200) {
        setCurrentStatus(selectedStatus);
        toast.success(`Consultation status changed to "${selectedStatus}"`);
        refetch();
      } else {
        toast.error("Could not make any change!");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  // 🔴 DELETE CONSULTATION
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This consultation will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeleting(true);
        const res = await api.delete(`/consultants/${consultation.id}`);
        if (res.status === 200 || res.status === 204) {
          toast.success("Consultation deleted successfully.");
          refetch();
        } else {
          toast.error("Failed to delete consultation.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong during deletion.");
      } finally {
        setDeleting(false);
      }
    }
  };


  return (
    <tr className="text-xs sm:text-sm text-white">
      <th>{index + 1}</th>
      <td className="px-2">{consultation.fullName}</td>
      <td className="px-2">{consultation.email}</td>
      <td className="px-2">{consultation.company}</td>
      <td className="px-2">{consultation.phone}</td>
      <td className="px-2 min-w-40">{consultation.message}</td>
      <td className="px-2">
        {new Date(consultation.preferredDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        , {consultation.preferredTime}
      </td>
      <td className="flex items-center gap-2 justify-center">
        <select
          value={currentStatus}
          onChange={handleConsultationState}
          className={`text-xs sm:text-sm text-white rounded-lg px-1 max-w-20 outline-none sm:max-w-none cursor-pointer ${
            currentStatus === "approved"
              ? "bg-green-500"
              : currentStatus === "rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 hover:text-red-700"
          title="Delete Consultation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default ConsultationTableRow;
