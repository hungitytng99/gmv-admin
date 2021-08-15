import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import ListProducts from "views/admin/ListProducts.js";
import AddProducts from "views/admin/AddProducts.js";
import ListCategory from "views/admin/ListCategory.js";
import AddCategory from "views/admin/AddCategory";
import EditSubCategory from "views/admin/EditSubCategory";
import EditMainCategory from "views/admin/EditMainCategory";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/list-products" exact component={ListProducts} />
            <Route path="/admin/add-products" exact component={AddProducts} />

            <Route path="/admin/category" exact component={ListCategory} />
            <Route path="/admin/add-category" exact component={AddCategory} />
            <Route path="/admin/edit-sub-category/:id" exact component={EditSubCategory} />
            <Route path="/admin/edit-main-category/:id" exact component={EditMainCategory} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
