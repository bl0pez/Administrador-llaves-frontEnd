import Swal from 'sweetalert2';

export const onConfirm = async (id: string, name: string, updateAction: (id: string) => void) => {

    const { isConfirmed } = await Swal.fire({
        title: `¿Estas seguro de devolver la llave: ${name}?`,
        text: 'No podras revertir esta accion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, devolver',
        cancelButtonText: 'No, cancelar'
    });

    if (isConfirmed) {
        updateAction(id);
    }


}
