import Swal from "sweetalert2";

export const showConfirmModal = ({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton = false,
    cb,
}) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton,
    }).then((res) => {
        if (res.isConfirmed){
            if (cb){
                cb();
            }
        }
    });
};