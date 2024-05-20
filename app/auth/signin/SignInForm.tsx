"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/PasswordInput";
import { z } from "zod";
import TextInput from "@/components/TextInput";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Props = { error?: string };
type SignIn = z.infer<typeof signInSchema>;

//
function SignInForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignIn) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <form
      className="h-[450px] w-96 flex flex-col bg-slate-200 rounded-2xl justify-around items-center py-10 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`absolute -top-20 w-96 h-16 rounded-xl flex-center text-black ${
          !!props.error && "bg-red-400"
        }`}
      >
        {!!props.error && "Authentication failed!"}
      </div>
      <h1 className="text-5xl text-slate-900 font-extrabold">Sign In</h1>
      <div className="flex flex-col  w-3/5 items-center text-slate-900">
        <TextInput
          register={register("email")}
          name="email"
          type="email"
          placeholder="Type your email..."
        />
      </div>
      <p className=" h-2 text-black">
        {(errors.email || errors.password) && "Invalid credentials."}
      </p>

      <div className="flex flex-col  w-3/5 items-center text-slate-900">
        <PasswordInput register={register("password")} />
      </div>
      <button
        type="submit"
        className="bg-slate-900 px-6 py-4 rounded-lg transition-colors text-slate-300 duration-500 hover:bg-slate-500 hover:text-slate-900"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
