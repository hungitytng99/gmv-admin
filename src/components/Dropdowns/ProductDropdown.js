import React from "react";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { Menu, Dropdown, } from 'antd';

const ProductDropdown = (props) => {
  const { productId, handleDeleteProduct, handleSetHotProduct } = props;
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
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          href={`/admin/edit-products/${productId}`}
          className="text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
        >
          Edit
        </a>
      </Menu.Item>
      <Menu.Item>
        <div
          href="/"
          className={
            "text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
          }
          onClick={showModal}
        >
          Delete
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          className="text-sm py-1 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer"
          onClick={() => handleSetHotProduct(productId)}
        >
          Set as hot product
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="w-4 hover:cursor-pointer hover:text-lightBlue-500">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </Dropdown>
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
