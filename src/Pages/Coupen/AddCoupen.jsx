import React from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addCoupen } from '../../api/api_endpoint';
import { toast } from 'react-toastify';

function AddCoupen() {

  let initValues = {
    name: "",
    code: "",
    description: "",
    offer: "",
    minimum_order: "",
    maximum_order: "",
    valid_from: "",
    valid_to: "",
    status: "",
  }

  function onCoupenAdd(values, { resetForm }) {
    let coupenCodeData = {
      name: values?.name,
      code: values?.code,
      description: values?.description,
      offer: values?.offer,
      minimum_order: values?.minimum_order,
      maximum_order: values?.maximum_order,
      valid_from: values?.valid_from,
      valid_to: values?.valid_to,
      status: values?.status,
    }

    addCoupen(coupenCodeData).then((data) => {
      let response = data?.data;
      if (response?.status) {
        toast.success("Coupen addedd success")
        resetForm();
      } else {
        toast.error(response.msg)
      }
    }).catch((err) => toast.error("Something went wrong"))
  }

  let schemeValidation = Yup.object().shape({
    name: Yup.string("Please valid string").required("Coupen name is required"),
    code: Yup.string("Please valid string").required("Coupen code is required"),
    description: Yup.string("Please valid string").required("Coupen description is required"),
    offer: Yup.string("Please valid string").required("Coupen offer is required"),
    minimum_order: Yup.number().typeError("Please enter valid value").required("Coupen minimum value is required"),
    maximum_order: Yup.number().typeError("Please valid value").moreThan(Yup.ref("minimum_order"), "Please enter value greater than minimum order").required("Coupen maximum value is required"),
    valid_from: Yup.date("Please valid date").required("Coupen valid from is required"),
    valid_to: Yup.date("Please valid date").required("Coupen valid to is required"),
    status: Yup.string("Please valid string").required("Coupen status is required"),
  })

  return (
    <AdminLayout>
      <div className="content_body" id="content_body">
        <div className="wrapper_content_body">

          <h2>Add Coupen Code</h2>

          <div className="content_box_border">
            <div className="row mt-2">
              <Formik initialValues={initValues} onSubmit={onCoupenAdd} validationSchema={schemeValidation}>
                <Form >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" placeholder="Coupen Name" />
                        <ErrorMessage name="name" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Code</label>
                        <Field id="code" name="code" type="text" placeholder="Coupen Code" />
                        <ErrorMessage name="code" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Description</label>
                        <Field id="description" name="description" type="text" placeholder="Coupen Description" />
                        <ErrorMessage name="description" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Offer (in %)</label>
                        <Field id="offer" name="offer" type="text" placeholder="Coupen Offer" />
                        <ErrorMessage name="offer" component="div" className="formValidateError" />
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Minimum order</label>
                        <Field id="minimum_order" name="minimum_order" type="text" placeholder="Coupen Minimum Order" />
                        <ErrorMessage name="minimum_order" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Maximum Order</label>
                        <Field id="maximum_order" name="maximum_order" type="text" placeholder="Coupen Maximum Order" />
                        <ErrorMessage name="maximum_order" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Valid From</label>
                        <Field id="valid_from" name="valid_from" type="date" placeholder="Coupen Valid From" />
                        <ErrorMessage name="valid_from" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Valid To</label>
                        <Field id="valid_to" type="date" name="valid_to" placeholder="Coupen Valid To" />
                        <ErrorMessage name="valid_to" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Status</label>
                        <Field id="status" name="status" type="text" as="select">
                          <option value="">Select Status</option>
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

export default AddCoupen
