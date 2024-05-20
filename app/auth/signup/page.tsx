"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

type SignUp = z.infer<typeof signUpSchema>;

//Simple signUp schema with Zod and React-Hook-Form.
function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();

  async function onSubmit(data: SignUp) {
    const result = await fetch("/api/auth/signup", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Specify the content type in the headers
      },
      body: JSON.stringify({
        // Stringify the body to ensure it is in JSON format
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    });
    const res = await result.json();
    if (!result.ok) {
      setServerMessage(res.error);
    } else {
      setServerMessage(res.message + "Redirecting to login screen...");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    }
  }

  return (
    <form
      className="h-[500px] w-[450] flex flex-col bg-slate-200 rounded-2xl justify-around items-center py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-5xl text-slate-900 font-extrabold">Sign Up</h1>
      <div className="flex flex-col  w-3/4 items-center text-slate-900">
        <TextInput
          register={register("email")}
          name="email"
          placeholder="Type your email..."
          type="email"
        />
        <p className="h-2">{errors.email && "Invalid email."}</p>
      </div>

      <div className="flex w-3/4 items-center justify-center text-slate-900">
        <div className="flex flex-col">
          <PasswordInput register={register("password")} />
          <p className="h-2">
            {errors.password && "Password must be at least 8 characters long."}
          </p>
        </div>
        <div className="flex flex-col w-1/2">
          <TextInput
            register={register("name")}
            name="name"
            placeholder="Your name..."
            type="name"
          />
          <p className="h-2">
            {errors.name && "Must be at least 3 characters long."}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <button
          type="submit"
          className="bg-slate-900 px-6 py-4 rounded-lg transition-colors text-slate-300 duration-500 hover:bg-slate-500 hover:text-slate-900"
        >
          SignUp
        </button>
        <p className="h-2 text-black font-bold text-wrap">{serverMessage}</p>
      </div>
    </form>
  );
}

export default SignUpForm;
