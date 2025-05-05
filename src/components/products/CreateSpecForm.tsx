// "use client"; // if you use Next.js App Router
// import { useState } from "react";


// interface KeyValueObject {
//   [key: string]: string;
// }

// export default function CreateSpecForm() {
//   const [productName, setProductName] = useState("");
//   const [productModel, setProductModel] = useState("");
//   const [brandName, setBrandName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState<number | string>("");
//   const [available, setAvailable] = useState(true);
//   const [keyApplications, setKeyApplications] = useState<string[]>([""]);
//   const [keyFeatures, setKeyFeatures] = useState<string[]>([""]);
//   const [specifications, setSpecifications] = useState<KeyValueObject[]>([]);
//   const [images, setImages] = useState<string[]>([""]);

//   const handleAddKeyApplication = () => {
//     setKeyApplications([...keyApplications, ""]);
//   };

//   const handleAddKeyFeature = () => {
//     setKeyFeatures([...keyFeatures, ""]);
//   };

//   const handleAddSpecification = () => {
//     setSpecifications([...specifications, { "": "" }]);
//   };

//   const handleAddImage = () => {
//     setImages([...images, ""]);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newSpecData = {
//       productName,
//       productModel,
//       brandName,
//       slug,
//       description,
//       price,
//       available,
//       keyApplications,
//       keyFeatures,
//       specifications,
//       images,
//     };

//   //   try {
//   //     const res = await createSpec(newSpecData);
//   //     console.log("Spec created:", res);
//   //     alert("Spec created successfully!");
//   //     // reset form if needed
//   //   } catch (error) {
//   //     console.error(error);
//   //     alert("Failed to create spec.");
//   //   }
//   // };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md space-y-4">
//       <h2 className="text-xl font-bold">Create New Spec</h2>

//       <input
//         type="text"
//         placeholder="Product Name"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//         className="input input-bordered w-full"
//       />

//       <input
//         type="text"
//         placeholder="Product Model"
//         value={productModel}
//         onChange={(e) => setProductModel(e.target.value)}
//         className="input input-bordered w-full"
//       />

//       <input
//         type="text"
//         placeholder="Brand Name"
//         value={brandName}
//         onChange={(e) => setBrandName(e.target.value)}
//         className="input input-bordered w-full"
//       />

//       <input
//         type="text"
//         placeholder="Slug"
//         value={slug}
//         onChange={(e) => setSlug(e.target.value)}
//         className="input input-bordered w-full"
//       />

//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="textarea textarea-bordered w-full"
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         className="input input-bordered w-full"
//       />

//       <div className="flex items-center gap-2">
//         <label>Available:</label>
//         <input
//           type="checkbox"
//           checked={available}
//           onChange={(e) => setAvailable(e.target.checked)}
//           className="checkbox"
//         />
//       </div>

//       <div className="space-y-2">
//         <h3 className="font-semibold">Key Applications</h3>
//         {keyApplications.map((app, index) => (
//           <input
//             key={index}
//             type="text"
//             placeholder={`Key Application ${index + 1}`}
//             value={app}
//             onChange={(e) => {
//               const updated = [...keyApplications];
//               updated[index] = e.target.value;
//               setKeyApplications(updated);
//             }}
//             className="input input-bordered w-full"
//           />
//         ))}
//         <button type="button" onClick={handleAddKeyApplication} className="btn btn-outline btn-sm">
//           Add Key Application
//         </button>
//       </div>

//       <div className="space-y-2">
//         <h3 className="font-semibold">Key Features</h3>
//         {keyFeatures.map((feature, index) => (
//           <input
//             key={index}
//             type="text"
//             placeholder={`Key Feature ${index + 1}`}
//             value={feature}
//             onChange={(e) => {
//               const updated = [...keyFeatures];
//               updated[index] = e.target.value;
//               setKeyFeatures(updated);
//             }}
//             className="input input-bordered w-full"
//           />
//         ))}
//         <button type="button" onClick={handleAddKeyFeature} className="btn btn-outline btn-sm">
//           Add Key Feature
//         </button>
//       </div>

//       <div className="space-y-2">
//         <h3 className="font-semibold">Specifications</h3>
//         {specifications.map((spec, index) => (
//           <div key={index} className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Spec Key"
//               value={Object.keys(spec)[0] || ""}
//               onChange={(e) => {
//                 const updated = [...specifications];
//                 const key = e.target.value;
//                 const value = Object.values(spec)[0];
//                 updated[index] = { [key]: value };
//                 setSpecifications(updated);
//               }}
//               className="input input-bordered w-1/2"
//             />
//             <input
//               type="text"
//               placeholder="Spec Value"
//               value={Object.values(spec)[0] || ""}
//               onChange={(e) => {
//                 const updated = [...specifications];
//                 const key = Object.keys(spec)[0];
//                 const value = e.target.value;
//                 updated[index] = { [key]: value };
//                 setSpecifications(updated);
//               }}
//               className="input input-bordered w-1/2"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddSpecification} className="btn btn-outline btn-sm">
//           Add Specification
//         </button>
//       </div>

//       <div className="space-y-2">
//         <h3 className="font-semibold">Images</h3>
//         {images.map((img, index) => (
//           <input
//             key={index}
//             type="text"
//             placeholder={`Image URL ${index + 1}`}
//             value={img}
//             onChange={(e) => {
//               const updated = [...images];
//               updated[index] = e.target.value;
//               setImages(updated);
//             }}
//             className="input input-bordered w-full"
//           />
//         ))}
//         <button type="button" onClick={handleAddImage} className="btn btn-outline btn-sm">
//           Add Image
//         </button>
//       </div>

//       <button type="submit" className="btn btn-primary w-full">
//         Create Spec
//       </button>
//     </form>
//   );
// }
