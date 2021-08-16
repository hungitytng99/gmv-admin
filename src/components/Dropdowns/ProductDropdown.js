import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import 'antd/dist/antd.css';
import { Modal } from 'antd';

const ProductDropdown = (props) => {
  const { productId, handleDeleteProduct, handleSetHotProduct } = props;

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  // for confirm
  const [confirm, setConfirm] = React.useState(false);
  const showModal = () => {
    setConfirm(true);
  };
  const handleOk = () => {
    handleDeleteProduct(productId);
    setConfirm(false);
  }
  const handleCancel = () => {
    setConfirm(false);
    setDropdownPopoverShow(false);
  }

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    return () => {

    }
  })

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
          href={`/admin/edit-products/${productId}`}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
          }
        >
          Edit
        </a>
        <div
          href="/"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:text-lightBlue-500"
          }
          onClick={showModal}
        >
          Delete
        </div>
        <div
          href="/"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:text-lightBlue-500"
          }
          onClick={() => { closeDropdownPopover(); handleSetHotProduct(productId); }}
        >
          Set as hot product
        </div>
      </div>
      <Modal
        title="Delete"
        visible={confirm}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>'Are you sure to delete this product?'</p>
      </Modal>
    </>
  );
};

export default ProductDropdown;
