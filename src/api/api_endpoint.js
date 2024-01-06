import instance from "../axios/instance";
import { const_data } from "../const/const_data";


export async function AdminLogin(username, password) {
    return await instance.post(const_data.API_ENDPOINT.admin_login_post, { username, password })
}


export async function ForgetPasswordEndPoint(emailAddress) {
    return await instance.post(const_data.API_ENDPOINT.admin_forget_password, { email: emailAddress, domain: const_data.ADMIN_PANEL_URL })
}

export async function resetPasswordEndPoint(password, token) {
    return await instance.post(const_data.API_ENDPOINT.admin_password_reset, { password, token })
}

export async function uploadFile(file, fileSize) {
    return await instance.post(const_data.API_ENDPOINT.upload_file, { image: file, file_size: fileSize }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}


export async function fetchAllImages() {
    return await instance.get(const_data.API_ENDPOINT.get_all_images);
}

export async function deleteImagesEndPoint(id) {
    return await instance.post(const_data.API_ENDPOINT.delete_image, { image_id: id });
}

export async function addProduct(productData) {
    return await instance.post(const_data.API_ENDPOINT.add_product, { ...productData })
}

export async function getAllProduct() {
    return await instance.get(const_data.API_ENDPOINT.get_all_product);
}


export async function updateManyProduct(product_ids, update_data) {
    return await instance.patch(const_data.API_ENDPOINT.update_many_product, { product_id: product_ids, update_data });
}

export async function updateProduct(product_id, update_data) {
    return await instance.patch(const_data.API_ENDPOINT.update_product, { product_id: product_id, update_data });
}


export async function deleteProducts(product_ids) {
    return await instance.patch(const_data.API_ENDPOINT.delete_product, { product_id: product_ids });
}

export async function getSingleProduct(product_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_product + "/" + product_id);
}

export async function editProduct(product_id, editData) {
    return await instance.get(const_data.API_ENDPOINT.get_single_product + "/" + product_id);
}

export async function getAllOrder() {
    return await instance.get(const_data.API_ENDPOINT.get_all_order);
}

export async function getOrdersByProductId(product_id) {
    return await instance.get(const_data.API_ENDPOINT.get_orders_product_id + "/" + product_id);
}

export async function getUserOrder(user_id) {
    return await instance.get(const_data.API_ENDPOINT.get_user_order + "/" + user_id);
}

export async function getSingleOrder(order_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_order + "/" + order_id);
}

export async function updateOrderStatusEndPoint(order_id, new_status) {
    return await instance.patch(const_data.API_ENDPOINT.update_order, { order_id, new_status });
}

export async function getOutofStockItems() {
    return await instance.get(const_data.API_ENDPOINT.soon_outofstock);
}

export async function addCategoryEndPoint(categoryData) {
    return await instance.post(const_data.API_ENDPOINT.add_category, { ...categoryData });
}

export async function getAllCategoryEndPoint() {
    return await instance.get(const_data.API_ENDPOINT.get_all_category);
}

export async function updateCategoryEndPoint(update_ids, update_data) {
    return await instance.patch(const_data.API_ENDPOINT.update_category, { update_ids, update_data });
}

export async function deleteCategoryEndPoint(delete_ids) {
    return await instance.post(const_data.API_ENDPOINT.delete_category, { delete_ids });
}

export async function getCategoryProductEndPoint(category_id) {
    return await instance.get(const_data.API_ENDPOINT.get_category_product + "/" + category_id);
}

export async function getSingleCategory(category_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_category + "/" + category_id)
}

export async function getSingleBanner(banner_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_banner + "/" + banner_id)
}

export async function addBanner(name, image, status, url) {
    return await instance.post(const_data.API_ENDPOINT.add_banner, {
        name, status, image, url
    })
}

export async function deleteBanner(delete_id) {
    return await instance.post(const_data.API_ENDPOINT.delete_banner + "/" + delete_id)
}

export async function editBannerEndPoint(editData) {
    return await instance.put(const_data.API_ENDPOINT.edit_banner, { ...editData })
}

export async function deleteBanners(delete_id) {
    return await instance.post(const_data.API_ENDPOINT.delete_banner, { delete_id })
}

export async function getBanner() {
    return await instance.get(const_data.API_ENDPOINT.get_banners)
}

export async function downloadInvoiceEndPoint(order_id) {
    return await instance.post(const_data.API_ENDPOINT.download_invoice, { invoice_id: order_id }, {
        responseType: "blob"
    })
}




export async function addUser(user) {
    return await instance.post(const_data.API_ENDPOINT.add_user, { ...user })
}

export async function editUser(edit_id, editData) {
    return await instance.patch(const_data.API_ENDPOINT.update_user, {
        edit_id: edit_id, edit_data: editData
    })
}

export async function getSingleUser(user_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_user + "/" + user_id);
}

export async function delete_user(user_ids) {
    return await instance.patch(const_data.API_ENDPOINT.delete_user, {
        delete_ids: user_ids
    })
}


export async function getSiteStatics(startDate, endDate,chart_type) {
    let query = `?start_date=${startDate}&end_date=${endDate}&chart_type=${chart_type}`;
    return await instance.get(const_data.API_ENDPOINT.site_statics + query);
}

export async function downloadSalesReportAsPdf(from_date, to_date, category, status) {

    return await instance.post(const_data.API_ENDPOINT.generate_sales_report_pdf, { from_date, to_date, category, status }, {
        responseType: 'blob'
    })
}



export async function downloadSalesReport(from_date, to_date, category, status) {
    return await instance.post(const_data.API_ENDPOINT.generate_sales_report, { from_date, to_date, category, status }, {
        responseType: 'blob'
    })
}


export async function updateBasicSiteSettings(site_data) {
    return await instance.post(const_data.API_ENDPOINT.update_site_settings, site_data)
}

export async function getBasicSiteSettings() {
    return await instance.get(const_data.API_ENDPOINT.get_site_settings);
}


export async function getSingleVendor() {
    return await instance.get(const_data.API_ENDPOINT.get_single_vendor);
}

export async function addCoupen(coupen_data) {
    return await instance.post(const_data.API_ENDPOINT.add_coupen_code, { ...coupen_data })
}

export async function editCoupen(editData) {
    return await instance.put(const_data.API_ENDPOINT.edit_coupen_code, editData)
}

export async function deleteCoupenCode(delete_id) {
    return await instance.post(const_data.API_ENDPOINT.delete_coupen_code, { delete_id })
}

export async function getAllCoupen() {
    return await instance.get(const_data.API_ENDPOINT.get_all_coupen_code)
}

export async function getSingleCoupenCode(coupen_id) {
    return await instance.get(const_data.API_ENDPOINT.get_single_coupen + "/" + coupen_id)
}

export async function getAllUsers() {
    return await instance.get(const_data.API_ENDPOINT.get_all_users)
}

export async function updateUsers(user_id, user_data) {
    return await instance.patch(const_data.API_ENDPOINT.update_user, { edit_id: user_id, edit_data: user_data })
}

