import { const_data } from "../const/const_data";


export function getNextOrderStatus(presentStatus) {

    let orderStatusValues = Object.values(const_data.ORDER_STATUS);
    let orderStatusKeys = Object.keys(const_data.ORDER_STATUS);
    let currentStatus = orderStatusValues.indexOf(presentStatus)
    let keyOfCurrentStatus = const_data.ORDER_STATUS[orderStatusKeys[currentStatus]];


    let allowedNext = [const_data.ORDER_STATUS.ORDER_RECEIVED, const_data.ORDER_STATUS.PREPARING_ORDER, const_data.ORDER_STATUS.READY_FOR_PICKUP, const_data.ORDER_STATUS.PICKED]

    let nextStatus = [];

    if (keyOfCurrentStatus == const_data.ORDER_STATUS.DELIVERED) {
        nextStatus.push(orderStatusKeys[orderStatusValues.indexOf(const_data.ORDER_STATUS.RETURNED_REQUEST)])
    } else if (keyOfCurrentStatus == const_data.ORDER_STATUS.RETURNED) {
        nextStatus.push(orderStatusKeys[orderStatusValues.indexOf(const_data.ORDER_STATUS.REFUND)])
    } else if (keyOfCurrentStatus == const_data.ORDER_STATUS.RETURNED_REQUEST) {
        nextStatus.push(orderStatusKeys[orderStatusValues.indexOf(const_data.ORDER_STATUS.RETURNED)])
    } else if (orderStatusKeys[currentStatus + 1] && allowedNext.includes(keyOfCurrentStatus)) {
        nextStatus.push(orderStatusKeys[currentStatus + 1])
        nextStatus.push(orderStatusKeys[5])
    }

    return nextStatus;
}


export function getValidDateFormat(date) {

    let valid_date;

    try {
        valid_date = new Date(date);
    } catch (err) {
        valid_date = new Date();
    }

    return (valid_date.getFullYear()) + "-" + (valid_date.getMonth() + 1) + "-" + valid_date.getDate()
}




// export function isStatusUpdateAllowed(status, newStatus) {
//     if (newStatus == const_data.ORDER_STATUS.PENDING) {
//         return false;
//     } else if (status == const_data.ORDER_STATUS.PROCESSING) {
//         if (newStatus == const_data.ORDER_STATUS.PENDING) {
//             return false
//         }
//     } else if (status == const_data.ORDER_STATUS.SHIPPED) {
//         if (newStatus == const_data.ORDER_STATUS.PENDING || newStatus == const_data.ORDER_STATUS.PROCESSING) {
//             return false
//         }
//     } else if (status == const_data.ORDER_STATUS.CANCEL_REQUEST) {
//         if (newStatus == const_data.ORDER_STATUS.PENDING || newStatus == const_data.ORDER_STATUS.PROCESSING || newStatus == const_data.ORDER_STATUS.SHIPPED) {
//             return false
//         }
//     } else if (status == const_data.ORDER_STATUS.CANCELED) {
//         if (newStatus == const_data.ORDER_STATUS.RETURNED_REQUEST || newStatus == const_data.ORDER_STATUS.PENDING || newStatus == const_data.ORDER_STATUS.PROCESSING || newStatus == const_data.ORDER_STATUS.SHIPPED || newStatus == const_data.ORDER_STATUS.DELIVERED || newStatus == const_data.ORDER_STATUS.CANCEL_REQUEST || newStatus == const_data.ORDER_STATUS.RETURNED || newStatus == const_data.ORDER_STATUS.REFUND || newStatus == const_data.ORDER_STATUS.ONHOLD) {
//             return false
//         }
//     } else if (status == const_data.ORDER_STATUS.RETURNED_REQUEST) {
//         if (newStatus == const_data.ORDER_STATUS.PENDING || newStatus == const_data.ORDER_STATUS.PROCESSING || newStatus == const_data.ORDER_STATUS.SHIPPED || newStatus == const_data.ORDER_STATUS.DELIVERED || newStatus == const_data.ORDER_STATUS.CANCEL_REQUEST || newStatus == const_data.ORDER_STATUS.REFUND || newStatus == const_data.ORDER_STATUS.ONHOLD) {
//             return false
//         }
//     } else if (status == const_data.ORDER_STATUS.REFUND) {
//         return false
//     } else if (status == const_data.ORDER_STATUS.DELIVERED) {
//         if (newStatus == const_data.ORDER_STATUS.RETURNED || newStatus == const_data.ORDER_STATUS.RETURNED_REQUEST) {
//             return true
//         } else {
//             return false;
//         }
//     }

//     return true;
// }

