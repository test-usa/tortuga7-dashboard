import { useState } from "react";

interface Spec {
  key: string;
  value: string;
}

export default function CreateSpecForm() {
  const [specifications, setSpecifications] = useState<Spec[]>([]);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSpecs = specifications.reduce((acc, curr) => {
      if (curr.key && curr.value) {
        acc.push({ [curr.key]: curr.value });
      }
      return acc;
    }, [] as { [key: string]: string }[]);

    console.log("Final submitted specs:", finalSpecs);
    // send `finalSpecs` to your backend along with other fields
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Create New Spec</h2>

      <div className="space-y-2">
        <h3 className="font-semibold">Specifications</h3>

        {specifications.map((spec, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Spec Name (e.g. CPU)"
              value={spec.key}
              onChange={(e) => handleSpecChange(index, "key", e.target.value)}
              className="input input-bordered w-1/2"
            />
            <input
              type="text"
              placeholder="Spec Value (e.g. Intel i7)"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, "value", e.target.value)}
              className="input input-bordered w-1/2"
            />
          </div>
        ))}

        <button type="button" onClick={handleAddSpecification} className="btn btn-outline btn-sm">
          Add Specification
        </button>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Create Spec
      </button>
    </form>
  );
}
