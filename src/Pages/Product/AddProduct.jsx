import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik, } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

import AdminLayout from '../../Components/Partials/AdminLayout';
import { addProduct, getAllCategoryEndPoint } from '../../api/api_endpoint';
import { toast } from 'react-toastify';
import { const_data } from '../../const/const_data';
import ModalItem from '../../Components/modal/ModalItem';

function AddProduct() {

  let [productCategory, setProductCategory] = useState([]);
  let productImags = useRef();
  let navigate = useNavigate();



  const handleSubmit = (values, { resetForm }) => {
    let images = productImags.current.value;


    if (images == "" || images == null) {
      return false;
    }

    let productData = {
      name: values.name,
      small_description: values.small_description,
      sale_price: values.sale_price,
      original_price: values.original_price,
      category: values.category,
      extra_description: values.extra_description,
      description: values.description,
      key_features: values.key_features,
      specifications: values.specifications,
      stock: values.stock,
      images: productImags.current.value,
      status: values.status,
      option: values.option
    }

    console.log(productData)

    addProduct(productData).then((data) => {
      console.log(data)
      try {
        if (data?.data?.status) {
          toast.success("Product inserted success", const_data.DEFAULT_ALERT_DATA)
          resetForm();
          productImags.current.value = "";
          navigate("/manage_product")
        } else {
          toast.error(data?.data?.msg, const_data.DEFAULT_ALERT_DATA)
        }
      } catch (e) {
        toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA)
      }
    }).catch((err) => {
      toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA)
    })


  };


  let initialValues = {
    name: '',
    small_description: '',
    sale_price: 0,
    original_price: 0,
    category: '',
    extra_description: '',
    description: '',
    key_features: "",
    specifications: "",
    stock: 0,
    status: null,
    option: "",
    productImage: ""
  }





  useEffect(() => {
    getAllCategoryEndPoint().then((response) => {
      let categoryData = response.data;
      if (categoryData.status) {
        let category = categoryData.categorys;
        setProductCategory(category)
      }
    }).catch((err) => {

    })
  }, [])




  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    small_description: Yup.string().required('Small description is required'),
    sale_price: Yup.number()
      .lessThan(Yup.ref("original_price"), "Sales price must be less than the original price")
      .min(1, "Sales price should be a minimum of 1")
      .required('Sale price is required'),
    original_price: Yup.number()
      .moreThan(Yup.ref("sale_price"), "Original price must be greater than the sale price")
      .min(1, "Original price should be a minimum of 1")
      .required('Original price is required'),
    category: Yup.string().required('Category is required'),
    extra_description: Yup.string().required('Extra description is required'),
    description: Yup.string().required('Description is required'),
    key_features: Yup.string().required("Select Prodcut Key Features"),
    specifications: Yup.string().required("Select Prodcut Specification"),
    stock: Yup.number().min(0).required('Stock is required'),
    status: Yup.string().required("Select Product Status"),
    option: Yup.string().required("Select Product Option"),
    // productImage: Yup.string().required("Select Product Images"),
  });








  return (
    <AdminLayout>



      <div className="content_body" id="content_body">
        <div className="wrapper_content_body">
          <h2>Add Product</h2>

          <div className="content_box_border">
            <div className="row mt-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validate={(values) => {
                  let error = {}
                  if (productImags.current.value == "" || productImags.current.value == null) {
                    error.productImage = "Select product images"
                  } else {
                    error = {}
                  }
                  return error;
                }}
              >
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" placeholder="Product Name" />
                        <ErrorMessage name="name" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="small_description">Small Description</label>
                        <Field id="small_description" name="small_description" type="text" placeholder="Small Description" />
                        <ErrorMessage name="small_description" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="sale_price">Sale Price</label>
                        <Field id="sale_price" name="sale_price" type="number" placeholder="Sale Price" />
                        <ErrorMessage name="sale_price" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="original_price">Original Price</label>
                        <Field id="original_price" name="original_price" type="number" placeholder="Original Price" />
                        <ErrorMessage name="original_price" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="fileselect form_group" onClick={
                        () => {
                          window.showSelectImage('productImage', null)
                        }
                      }>
                        <label htmlFor="images">Images</label>

                        <input ref={productImags} className="pointerNone" id="productImage" name="productImage" type="text" placeholder="Select Product Images" />
                        <ErrorMessage name="productImage" component="div" className="formValidateError" />

                      </div>

                    </div>




                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="category">Category</label>
                        <Field id="category" name="category" type="text" placeholder="Category" as="select">
                          <option value="">Select Product Category</option>
                          {
                            productCategory.map((catgeoryItem) => {
                              return (
                                <option value={catgeoryItem._id}>{catgeoryItem.name}</option>
                              )
                            })
                          }
                        </Field>
                        <ErrorMessage name="category" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="extra_description">Extra Description</label>
                        <Field id="extra_description" name="extra_description" type="text" placeholder="Extra Description" />
                        <ErrorMessage name="extra_description" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" type="text" placeholder="Description" />
                        <ErrorMessage name="description" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="key_features">Key Features (Comma-separated)</label>
                        <Field id="key_features" name="key_features" type="text" placeholder="Comma-separated Key Features" />
                        <ErrorMessage name="key_features" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="specifications">Specifications (Comma-separated)</label>
                        <Field id="specifications" name="specifications" type="text" placeholder="Comma-separated Specifications" />
                        <ErrorMessage name="specifications" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="stock">Stock</label>
                        <Field id="stock" name="stock" type="number" placeholder="Stock" />
                        <ErrorMessage name="stock" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="stock">Options</label>
                        <Field as="select" id="option" name="option">
                          <option value={""}>Select Options</option>
                          {
                            Object.values(const_data.PRODUCT_OPTION).map((options, index) => {
                              return (
                                <option value={options} key={index}>{options}</option>
                              )
                            })
                          }
                        </Field>
                        <ErrorMessage name="option" component="div" className="formValidateError" />
                      </div>
                    </div>





                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="status">Status</label>
                        <Field id="status" name="status" as="select">
                          <option value={""}>Select Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>In Active</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="formValidateError" />
                      </div>
                    </div>



                      <div className="col-12 text-center">
                        <button className="form_btn btn_green" type="submit">
                          Submit
                        </button>
                        <button className="form_btn btn_warning" type="reset">
                          Cancel
                        </button>
                      </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
