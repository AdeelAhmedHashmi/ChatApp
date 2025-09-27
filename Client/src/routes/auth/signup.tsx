import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { ZodError } from "zod";
import { signupSchema } from "../../utils/loginSchema";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  interface SignupData {
    name: string | null;
    email: string | null;
    password: string | null;
  }

  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupData>({
    name: null,
    email: null,
    password: null,
  });

  const [signupError, setSignupError] = useState<ZodError>();

  function handleSignupData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  }
  console.log(signupData);

  function handleSignup() {
    const { data, error } = signupSchema.safeParse(signupData);
    console.log(data, error);

    if (error) {
      setSignupError(error);
      return;
    }

    navigate({ to: "/auth/login" });
  }
  return (
    <div className="absolute top-0 w-screen z-[2000] bg-gray-900 flex m-auto align-middle justify-center min-h-screen">
      <div className="flex translate-x-4 flex-col gap-3 w-92 h-auto align-middle justify-center">
        <div>
          <h1 className="text-4xl font-extrabold pb-2">SignUp</h1>
          <p className="text-sm text-primary">Signup to connect with people</p>
        </div>
        <div>
          <label className="input validator">
            <CiUser className="h-[1em] opacity-50" />
            <input
              type="text"
              name="name"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              title="Only letters, numbers or dash"
              onChange={handleSignupData}
            />
          </label>
          <p className="validator-hint hidden">Must be 3 to 30 characters</p>
        </div>
        <div>
          <label className="input validator">
            <MdOutlineEmail className="h-[1em] opacity-50" />
            <input
              type="email"
              name="email"
              placeholder="mail@site.com"
              required
              onChange={handleSignupData}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <div>
          <label className="input validator">
            <IoKeyOutline className="h-[1em] opacity-50" />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={handleSignupData}
            />
          </label>
          <p className="validator-hint hidden">Password must be strong</p>
        </div>
        <div>
          <button
            onClick={handleSignup}
            className="bg-primary btn w-[87%] rounded-xl"
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-sm pl-2">
            Already have an account{" "}
            <Link className="text-primary" to="/auth/login">
              login
            </Link>
          </p>
        </div>
        <div>
          <p className="text-sm px-2 text-error">
            {signupError?.issues.map((error, i) => {
              return <span key={i}>{error.message}, </span>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
