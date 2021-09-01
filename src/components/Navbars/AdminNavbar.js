import React, { useState } from "react";
import * as Yup from 'yup';
import jsCookie from "js-cookie";
import { Modal, notification } from "antd";
import { useFormik } from "formik";
import FullPageLoading from "components/Loading/FullPageLoading";
import { userService } from "data-services/user";
import { Spin } from 'antd';
import { REQUEST_STATE } from "app-configs";

export default function Navbar() {
  const [changePwdModal, setChangePwdmodal] = React.useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const changePwdSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('This field is required'),
    newPassword: Yup.string()
      .required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '', newPassword: '', newPasswordConfirm: ''
    },
    onSubmit: async (values) => {
      console.log(values);
      setShowLoading(true);
      const response = await userService.changePwd(values);
      if (response.state === REQUEST_STATE.SUCCESS) {
        formik.resetForm();
        setChangePwdmodal(false);
        setShowLoading(false);
        notification['success']({
          message: 'Change password',
          description:
            'Change password successfully!',
        });
      }
      if (response.state === REQUEST_STATE.ERROR) {
        setShowLoading(false);
        notification['error']({
          message: 'Change password',
          description:
            response.data.message,
        });
      }
      console.log(response);
    },
    validationSchema: changePwdSchema,
  });

  const showModal = () => {
    setChangePwdmodal(true);
  };

  const handleOkModal = () => {
    formik.handleSubmit();
  };

  const handleCancelModal = () => {
    console.log('Clicked cancel button');
    setChangePwdmodal(false);
  };
  const handleLogout = () => {
    jsCookie.remove('token');
    window.location.href = '/auth/login';
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden md:block lg:inline-block font-semibold hover:text-white"
            href="/"
          >
            ADMIN BOARD
          </a>
          {/* Form */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <button onClick={showModal} className="text-white px-4 py-1 rounded-md focus:outline-none mr-2"> Change password</button>
            <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-1 rounded-md focus:outline-none"> Logout</button>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
      <Modal
        title={
          <div>
            Change password
            <span style={{ fontSize: '10px', marginLeft: '8px' }}>{showLoading && <Spin />}
            </span>
          </div>}
        visible={changePwdModal}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          >
            Old password <span className="text-rose-600">*</span>
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            autoComplete="off"
            name="oldPassword"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Old password"
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="text-rose-600">{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          >
            New password <span className="text-rose-600">*</span>
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            autoComplete="off"
            name="newPassword"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="New password"
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-rose-600">{formik.errors.newPassword}</div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
