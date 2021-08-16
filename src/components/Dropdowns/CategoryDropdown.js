import React from "react";
import { createPopper } from "@popperjs/core";
import 'antd/dist/antd.css';
import { Modal } from 'antd';

const CategoryDropdown = (props) => {
  const { subCategoryId,mainCategoryId, handleDeleteSubCategory } = props;
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // confirm
  const [confirm, setConfirm] = React.useState(false);
  const showModal = () => {
    setConfirm(true);
  };
  const handleOk = () => {
    handleDeleteSubCategory(mainCategoryId,subCategoryId);
    setConfirm(false);
  }
  const handleCancel = () => {
    setConfirm(false);
    closeDropdownPopover();
  }


  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="/"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href={`/admin/edit-sub-category/${subCategoryId}`}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Edit
        </a>
        <div
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:text-lightBlue-500"
          }
          onClick={() => showModal()}
        >
          Delete
        </div>
      </div>
      <Modal
        title="Delete"
        visible={confirm}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>This action will remove all product of this sub-category. Are you sure?</p>
      </Modal>
    </>
  );
};

export default CategoryDropdown;
