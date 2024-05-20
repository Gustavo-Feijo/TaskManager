"use client";

function TextInput({
  register,
  name,
  type,
  placeholder,
}: {
  register: any;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      className="outline-none w-full py-2 px-3 rounded-md text-black placeholder:text-slate-700 border border-slate-900"
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}

export default TextInput;
