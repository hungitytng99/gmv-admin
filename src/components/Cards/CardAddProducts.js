import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { mainCategoryService } from "data-services/category";
import { productService } from "data-services/product";
// components

export default function CardAddProducts() {
    const [subCategoryOption, setSubCategoryOption] = useState({ label: '', value: '' });
    const [subCategorySelected, setSubCategorySelected] = useState({ label: '', value: '' });


    const handleSubChange = subCategoryOption => {
        setSubCategorySelected(subCategoryOption);
        console.log(`Option selected:`, subCategorySelected);
    };

    const productSchema = Yup.object().shape({
        title: Yup.string()
            .required('This field is required'),
        description: Yup.string()
            .required('This field is required'),
        model_number: Yup.string()
            .required('This field is required'),
        main_image_url: Yup.string()
            .required('This field is required')
            .url('This field must be a valid url'),
        url_image1: Yup.string()
            .url('This field must be a valid url'),
        url_image2: Yup.string()
            .url('This field must be a valid url'),
        url_image3: Yup.string()
            .url('This field must be a valid url'),
        url_image4: Yup.string()
            .url('This field must be a valid url'),
        price: Yup.string()
            .required('This field is required'),
        material: Yup.string()
            .required('This field is required'),
    });

    useEffect(() => {
        const listSubCateogry = async () => {
            let listSubCategory = await mainCategoryService.listSubCategoryAsync();
            console.log(listSubCategory);
            listSubCategory.data = listSubCategory.data.map((subCategory) => {
                return {
                    label: subCategory.name,
                    value: subCategory.id,
                }
            });
            setSubCategoryOption(listSubCategory.data);
            console.log(listSubCategory.data);
        }
        listSubCateogry();
    }, [])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add products</h6>
                        <a
                            href='/admin/list-products'
                            className="flex items-center bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                        >
                            Back
                        </a>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            title: '', description: '', model_number: '', main_image_url: '',
                            url_image1: '', url_image2: '', url_image3: '', url_image4: '',
                            price: '', material: '',
                        }}
                        validationSchema={productSchema}
                        onSubmit={async (values) => {
                            // same shape as initial values
                            const params = { category_id: subCategorySelected.value, size: 0, ...values };
                            console.log(params);
                            const result = await productService.createProduct(params);
                            console.log(result);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Product Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Model <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="model_number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Model" />
                                            {errors.model_number && touched.model_number ? (
                                                <div className="text-rose-600">{errors.model_number}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Name <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="title"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Name" />
                                            {errors.title && touched.title ? (
                                                <div className="text-rose-600">{errors.title}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Price ($) <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="price"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Price" />
                                            {errors.price && touched.price ? (
                                                <div className="text-rose-600">{errors.price}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Material <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="material"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Material" />
                                            {errors.material && touched.material ? (
                                                <div className="text-rose-600">{errors.material}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Description <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="description"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Description" />
                                            {errors.description && touched.description ? (
                                                <div className="text-rose-600">{errors.description}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Images
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Main images <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="main_image_url"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Main image url" />
                                            {errors.main_image_url && touched.main_image_url ? (
                                                <div className="text-rose-600">{errors.main_image_url}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Other images 1
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image1"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Main image url" />
                                        </div>
                                        {errors.url_image1 && touched.url_image1 ? (
                                            <div className="text-rose-600">{errors.url_image1}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Other images 2
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image2"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Main image url" />
                                        </div>
                                        {errors.url_image2 && touched.url_image2 ? (
                                            <div className="text-rose-600">{errors.url_image2}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Other images 3
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image3"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Main image url" />
                                        </div>
                                        {errors.url_image3 && touched.url_image3 ? (
                                            <div className="text-rose-600">{errors.url_image3}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Other images 4
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image4"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Main image url" />
                                        </div>
                                        {errors.url_image4 && touched.url_image4 ? (
                                            <div className="text-rose-600">{errors.url_image4}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Category
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Sub category <span className="text-rose-600">*</span>
                                            </label>
                                            <Select
                                                className="w-64"
                                                placeholder="Sub category"
                                                onChange={handleSubChange}
                                                options={subCategoryOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add product
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

        </>
    );
}
