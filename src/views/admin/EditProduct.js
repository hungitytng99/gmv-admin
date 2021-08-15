import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import CardAddProducts from "components/Cards/CardAddProducts";
import CardEditProduct from "components/Cards/CardEditProduct";

export default function EditProduct() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardEditProduct/>
        </div>
      </div>
    </>
  );
}