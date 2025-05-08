import { ChangeEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
import { TConsultation } from "../../types/consultation";

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
      <td>
        <select
          value={currentStatus}
          onChange={handleConsultationState}
          className={`text-xs sm:text-sm text-white rounded-lg px-1 max-w-20 outline-none sm:max-w-none cursor-pointer outine-none ${
            currentStatus === "approved"
              ? "bg-green-500"
              : currentStatus === "rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">rejected</option>
        </select>
      </td>
    </tr>
  );
};

export default ConsultationTableRow;
