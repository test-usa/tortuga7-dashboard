import { Loader2 } from "lucide-react";
import useConsultations from "../../hooks/useConsultations";
import ConsultationTableRow from "./ConsultationTableRow";
import { TConsultation } from "../../types/consultation";

const ConsultationList = () => {
  const { consultationsData, consultationsLoading, consultationsRefetch } =
    useConsultations();
  console.log(consultationsData);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Consultation</h1>
      {consultationsLoading ? (
        <div className="flex justify-center items-center py-20 text-4xl">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-scroll">
          {consultationsData.length > 0 ? (
            <table className="text-center text-black dark:text-white w-full border-separate border-spacing-y-2">
              {/* head */}
              <thead>
                <tr className="text-sm sm:text-base bg-zinc-200 dark:bg-zinc-700 h-12">
                  <th className="px-2">Sl</th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Email</th>
                  <th className="px-2">Company</th>
                  <th className="px-2">Phone</th>
                  <th className="px-2">Message</th>
                  <th className="px-2">Time</th>
                  <th className="px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {consultationsData?.map(
                  (consultation: TConsultation, index: number) => (
                    <ConsultationTableRow
                      key={consultation?.id}
                      consultation={consultation}
                      index={index}
                      refetch={consultationsRefetch}
                    />
                  )
                )}
              </tbody>
            </table>
          ) : (
            <div>
              <p className="text-center">No Consultation Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultationList;
