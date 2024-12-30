"use client";
import NavContent from "@/components/NavContent";
import { AuthContext } from "context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

export default function Index() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be within an AuthProvider");
  }

  const { login } = authContext;

  const initialValues = {
    email: "",
    password: "",
  };
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    formikHelpers: FormikHelpers<{ email: string; password: string }>
  ) => {
    const { setSubmitting } = formikHelpers;
    try {
      setSubmitting(true);
      login(values.email, values.password);
    } catch (error) {
      console.log("login faild", error);
    } finally {
      setSubmitting(false);
    }
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
      <section className="flex flex-col items-center mt-10 z-[2] px-4">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col rounded-xl border-2 border-moondark border-opacity-30 bg-[#E8E5D4] sm:px-10 px-8 py-12 sm:w-fit w-full">
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 w-full font-medium font-cooper pl-2 text-moondark placeholder:text-[#47474780]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="form-group mt-5">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="outline-none bg-transparent border-b-[1px] border-[#000] border-opacity-25 text-sm h-10 w-full font-medium font-cooper pl-2 text-moondark placeholder:text-[#47474780]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`hover:bg-gray bg-moondark text-white font-cooper w-full mt-10 py-2 px-16 rounded-full text-xl mx-auto ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
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
                disabled
              >
                Sign In With Google
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-md my-5 font-cooper w-fit">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-gray text-sm underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
