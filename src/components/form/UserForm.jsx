import { useState } from "react";
import { IoEye, IoEyeOff, IoCheckmarkCircle } from "react-icons/io5";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.id.trim()) newErrors.id = "ID is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmittedData(formData);
    setFormData({ name: "", email: "", id: "", password: "" });
    setErrors({});
  };

  const inputClasses = (fieldName) =>
    `w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 ${errors[fieldName]
      ? "border-rose-500/50 focus:border-rose-500/50"
      : "border-white/10 hover:border-white/20 focus:border-purple-500/50"
    }`;

  return (
  <div className="max-w-md mx-auto space-y-6">
    <h2 className="text-xl font-semibold text-slate-800 text-center">
      User Form
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* ID */}
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          ID
        </label>
        <input
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Enter your ID"
        />
        {errors.id && (
          <p className="text-sm text-red-600">{errors.id}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-slate-600 mb-1">
          Password
        </label>
        <div className="flex gap-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="px-3 border rounded-md text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-md text-sm hover:bg-black/80 cursor-pointer"
      >
        Submit
      </button>
    </form>

    {submittedData && (
      <div className="border rounded-md p-4 text-sm bg-slate-50">
        <p><b>Name:</b> {submittedData.name}</p>
        <p><b>Email:</b> {submittedData.email}</p>
        <p><b>ID:</b> {submittedData.id}</p>
      </div>
    )}
  </div>
);

}
