import { createFileRoute, Link } from "@tanstack/react-router";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { useState } from "react";
import { loginSchema } from "../../utils/loginSchema";
import { ZodError } from "zod";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  interface LoginData {
    email: string | null;
    password: string | null;
  }

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: null,
    password: null,
  });

  const [loginError, setLoginError] = useState<ZodError>();

  function handleLoginData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogin() {
    const { data, error } = loginSchema.safeParse(loginData);
    console.log(data, error);

    if (error) {
      setLoginError(error);
      return;
    }

    navigate({ to: "/chat" });
  }

  console.log(loginData);

  return (
    <div className="absolute top-0 w-screen z-[2000] bg-gray-900 flex m-auto align-middle justify-center min-h-screen">
      <div className="flex translate-x-4 flex-col gap-3 w-92 h-auto align-middle justify-center">
        <div>
          <h1 className="text-4xl font-extrabold pb-2">Login</h1>
          <p className="text-sm text-primary">login to access your account</p>
        </div>
        <div>
          <label className="input validator">
            <MdOutlineEmail className="h-[1em] opacity-50" />
            <input
              type="email"
              name="email"
              placeholder="mail@site.com"
              required
              onChange={handleLoginData}
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
              onChange={handleLoginData}
            />
          </label>
          <p className="validator-hint hidden">Password must be strong</p>
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="bg-primary btn w-[87%] rounded-xl"
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-sm pl-2">
            Don't have an account{" "}
            <Link className="text-primary" to="/auth/signup">
              signup
            </Link>
          </p>
        </div>
        <div>
          <p className="text-sm px-2 text-error">
            {loginError?.issues.map((error, i) => {
              return <span key={i}>{error.message}, </span>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
