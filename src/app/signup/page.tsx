"use client";
import NavContent from "@/components/NavContent";
import { AuthContext } from "context/AuthContext";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import * as Yup from "yup";

export default function Index() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }
  const { register } = authContext;

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter your name"),
    email: Yup.string()
      .email("Email a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    formikHelpers: FormikHelpers<{
      name: string;
      email: string;
      password: string;
    }>
  ) => {
    const { setSubmitting } = formikHelpers;
    try {
      setSubmitting(true);
      await register(values.name, values.email, values.password);
    } catch (error) {
      console.log("registeration failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href =
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`
        : "http://localhost:5000/auth/google";
  };

  return (
    <main className="bg-bgcream h-screen relative flex flex-col">
      <div className="absolute bottom-0 flex justify-between w-full z-[1]">
        <Image
          src={"/pie-1.png"}
          alt="first pie"
          width={200}
          height={200}
          className="rotate-90 hidden sm:block"
          property={"true"}
        />
        <Image
          src={"/pie-2.png"}
          alt="first pie"
          width={200}
          height={200}
          className="-rotate-90 ml-auto sm:ml-0"
        />
      </div>
      <NavContent />
      <section className="flex flex-col items-center z-[2] px-4">
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col rounded-xl border-2 border-moondark border-opacity-30 bg-[#E8E5D4] sm:px-10 px-8 py-12 sm:w-fit w-full">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium font-cooper pl-2 text-moondark placeholder:text-[#47474780]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 font-medium font-cooper pl-2 text-moondark mt-4 placeholder:text-[#47474780]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer hover:bg-gray bg-moondark text-white font-cooper w-full mt-10 py-2 px-16 rounded-full text-xl mx-auto"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>

              <div className="mt-5 flex align-middle items-center text-center justify-center gap-2">
                <div className="w-32 h-[2px] bg-gradient-to-r from-[#E8E5D4] from-[5%] via-[#474747] via-[100%] to-[#47474700] to-[100%]"></div>
                <h1
                  className="text-[#E8E5D4] font-bold text-2xl font-cooper"
                  style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
                >
                  Or
                </h1>
                <div className="w-32 h-[2px] bg-gradient-to-l from-[#E8E5D4] from-[5%] via-[#474747] via-[100%] to-[#47474700] to-[100%]"></div>
              </div>

              <button
                type="button"
                className="bg-[#F6F4E8] text-dark font-cooper w-full mt-10 py-2 px-5 sm:px-16 rounded-full text-lg mx-auto"
                style={{ boxShadow: "inset 0 4px 12px #47474740" }}
                onClick={handleGoogleSignUp}
                // disabled={true}
              >
                Sign Up With Google
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-md mt-4 font-cooper w-fit">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-gray text-sm underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}

