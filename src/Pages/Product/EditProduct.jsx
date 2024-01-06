import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addProduct, getAllCategoryEndPoint, getSingleProduct, updateProduct } from '../../api/api_endpoint';
import { toast } from 'react-toastify';
import { const_data } from '../../const/const_data';
import { useNavigate, useParams } from 'react-router-dom'; 
function EditProduct() {


  let productImags = useRef();
  let [productImagesError, updateImageError] = useState({ error: false, msg: "Product images is required" })
  let { edit_id } = useParams();
  let navigate = useNavigate();
  let [initialValues, setInitialValues] = useState({
    name: '',
    small_description: '',
    sale_price: 0,
    original_price: 0,
    category: '',
    extra_description: '',
    description: '',
    key_features: [],
    specifications: [],
    stock: 0,
    status: true,
  })
  let [productCategory, setProductCategory] = useState([]);


  useEffect(() => {
    getAllCategoryEndPoint().then((response) => {
      let categoryData = response.data;
      if (categoryData.status) {
        let category = categoryData.categorys;
        setProductCategory(category)
      }
    }).catch((err) => {

    })
  },[])

  useEffect(() => {
    getSingleProduct(edit_id).then((product_data) => {

      console.log(product_data)
      let response = product_data.data;
      if (response.status) {
        let product_item = response.product;
        setInitialValues({
          name: product_item.name,
          small_description: product_item.small_description,
          sale_price: product_item.sale_price,
          original_price: product_item.original_price,
          category: product_item.category,
          extra_description: product_item.extra_description,
          description: product_item.description,
          key_features: product_item.key_features?.toString(),
          specifications: product_item.specifications?.toString(),
          stock: product_item.stock,
          status: product_item.status,
        })
        productImags.current.value = product_item.images?.join(",");
      } else {
        navigate("/manage_product")
      }
    }).catch((err) => {
      navigate("/manage_product")
    })
  }, [edit_id])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    small_description: Yup.string().required('Small description is required'),
    sale_price: Yup.number().required('Sale price is required'),
    original_price: Yup.number().required('Original price is required'),
    category: Yup.string().required('Category is required'),
    extra_description: Yup.string().required('Extra description is required'),
    description: Yup.string().required('Description is required'),
    key_features: Yup.string().required("Select Prodcut Key Features"),
    specifications: Yup.string().required("Select Prodcut Specification"),
    stock: Yup.number().required('Stock is required'),
    status: Yup.string().required("Select Product Status")
  });

  const handleSubmit = (values) => {
    let images = productImags.current.value;

    if (images == "" || images == null) {
      updateImageError({ error: true, msg: "Product images is required" });
      return false;
    } else {

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
        images: images,
        status: values.status
      }

      updateProduct(edit_id, productData).then((data) => {

        try {
          if (data?.data?.status) {
            toast.success("Product update success", const_data.DEFAULT_ALERT_DATA)
          } else {
            toast.error(data?.data?.msg, const_data.DEFAULT_ALERT_DATA)
          }
        } catch (e) {
          toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA)
        }
      }).catch((err) => {
        toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA)
      })

    }
  };


  return (
    <AdminLayout>
 

      <div className="content_body" id="content_body">
        <div className="wrapper_content_body">
          <h2>Edit Product</h2>

          <div className="content_box_border">
            <div className="row mt-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
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
                          window.showSelectImage('productImage', productImags.current.value)
                        }
                      }>
                        <label htmlFor="images">Images</label>

                        <input ref={productImags} className="pointerNone" id="productImage" name="productImage" type="text" placeholder="Select Product Images" />

                        {
                          productImagesError.error && (
                            <p className='formValidateError'>{productImagesError.msg}</p>
                          )
                        }
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
  )
}

export default EditProduct
