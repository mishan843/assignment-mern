import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { base_url } from "../utils/fetchConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const signUpSchema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be valid")
    .required("Email is required"),
  mobile: yup.number().required("Mobile number is required"),
  password: yup.string().required("Password  is required"),
});

const Signup = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
        try {
          fetch(`${base_url}user/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((res) => res.json()).then((data) => {
            setUser(data)
            if (data) {
              toast.info("User Register Successfully");
              localStorage.setItem("user", JSON.stringify(data))
              navigate("/")
            } else {
              const errorData = data.json();
              toast.error(errorData);
            }
          })
          
          
        } catch (error) {
          console.error('Error during registration:', error);
        }
      }
  });

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold text-3xl leading-7 text-gray-900">
              Register now
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    placeholder="First-name"
                    autocomplete="given-name"
                    className="block w-full placeholder:px-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-red-500">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="text"
                    name="last-name"
                    id="last-name"
                    placeholder="Last-name"
                    autocomplete="family-name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    className="block w-full rounded-md placeholder:px-2 px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-red-500">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                    className="block w-full placeholder:px-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-red-500">
                  {formik.touched.email && formik.errors.email}
                </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile No.
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Mobile no"
                    value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                    className="block w-full placeholder:px-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-red-500">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <CustomInput
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                    placeholder="Password"
                    className="block w-full placeholder:px-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-red-500">
                  {formik.touched.password && formik.errors.password}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
