import { Check, Plus, Trash, X } from "lucide-react";
import { TSpec } from "../../types/service";
import Swal from "sweetalert2";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useState } from "react";

type TSpecData = {
  spec: TSpec;
  refetch: () => void;
};

const SpecBox = ({ spec, refetch }: TSpecData) => {
  const [isAddSpecClicked, setIsAddSpecClicked] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddSpecProperty = async () => {
    const newSpec = {
      data: [...spec.data, { [newKey]: newValue }],
    };
    try {
      const res = await api.patch(`/specs/${spec.id}`, newSpec);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Specification added successfully!");
      refetch();
      setNewKey("");
      setNewValue("");
      setIsAddSpecClicked(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Specification!";
      toast.error(errorMessage);
    }
  };

  const handleRemoveSpecProperty = async (key: string, value: string) => {
    const newSpec = {
      data: spec.data.filter((d) => {
        const [[k, v]] = Object.entries(d);
        return !(k === key && v === value);
      }),
    };
    try {
      const res = await api.patch(`/specs/${spec.id}`, newSpec);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Specification removed successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to removed Specification!";
      toast.error(errorMessage);
    }
  };

  const handleSpecDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/specs/${spec.id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire(
                "Deleted!",
                "A Specification has been deleted.",
                "success"
              );
            }
          })
          .catch((error) => {
            toast.error(
              error.response?.data?.message || "Something went wrong!"
            );
          });
      }
    });
  };

  return (
    <div className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <p className="bg-purple-600 text-white text-lg font-semibold p-3">
        {spec.title}
      </p>
      <div className="divide-y">
        {spec.data?.map((entry, j) => {
          const [[key, value]] = Object.entries(entry);
          return (
            <div
              key={j}
              className="group relative flex justify-between items-center px-4 py-2"
            >
              <p className="font-medium mr-3">{key}</p>
              <p className="">{value}</p>

              <div
                className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => handleRemoveSpecProperty(key, value)}
              >
                <Trash className="text-red-500 bg-white hover:text-white hover:bg-red-500 duration-300 cursor-pointer p-1 rounded-full size-6" />
              </div>
            </div>
          );
        })}
        <div
          className={`px-3 py-1 rounded border border-purple-500 flex items-center justify-between bg-white/10 ${
            isAddSpecClicked ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              className="outline-none border border-green-500 rounded px-2 py-1 w-32"
              type="text"
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <input
              className="outline-none border border-green-500 rounded px-2 py-1 w-32"
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Check
              onClick={() => handleAddSpecProperty()}
              className="hover:text-green-500 cursor-pointer duration-300 ml-2"
            />
            <X
              onClick={() => setIsAddSpecClicked(false)}
              className="hover:text-red-500 cursor-pointer duration-300 ml-2"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={handleSpecDelete}
      >
        <Trash className="text-red-600 p-1 rounded-full size-6 transition" />
      </div>
      <Plus
        onClick={() => setIsAddSpecClicked(true)}
        className={`absolute top-3 right-10 text-green-500 rounded-full border border-green-500 size-5 cursor-pointer ${
          isAddSpecClicked ? "hidden" : "block"
        }`}
      />
    </div>
  );
};

export default SpecBox;
