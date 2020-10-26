import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ErrorModal = (props) => 
{
    const {
        buttonLabel,
        className,
        onPopupClose,
        errorText
    } = props;

    const [modal, setModal] = useState(true);

    const toggle = () =>
    {
        setModal(!modal);
        onPopupClose();
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    {errorText}
                </ModalBody>
            </Modal> 
        </div>
    )
}

export default ErrorModal;
