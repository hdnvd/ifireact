// @flow
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class SweetAlert{

    static displayAccessDeniedAlert()
    {
        let options = {
            title: 'توجه',
            message: 'شما دسترسی کافی برای انجام این کار ندارید',
            childrenElement: () => <div />,
            customUI: ({ title, message, onClose }) => {
                return (
                    <div className='sweetalert'>
                        <h1>{title}</h1>
                        <p>{message}</p>
                        <button className='cancelbutton' onClick={onClose}>بستن</button>
                    </div>
                )
            },
            willUnmount: () => {}
        };
        confirmAlert(options);
    }
    static displayDeleteAlert(OnConfirmHandler)
    {
        let options = {
            title: 'توجه',
            message: 'آیا مطمئن هستید که می خواهید این آیتم را حذف کنید؟',
            buttons: [
                {
                    label: 'بله',
                    onClick: OnConfirmHandler
                },
                {
                    label: 'خیر',
                    onClick: () => {},
                }
            ],

            childrenElement: () => <div />,
            customUI: ({ title, message, onClose }) => {
                return (
                    <div className='sweetalert'>
                        <h1>{title}</h1>
                        <p>{message}</p>
                        <button className='cancelbutton' onClick={onClose}>خیر</button>
                        <button className='deletedangerbutton' onClick={()=>{
                            OnConfirmHandler();
                            onClose();
                        }}>بله، حذف شود.</button>
                    </div>
                )
            },
            willUnmount: () => {}
        };
        confirmAlert(options);
    }
}

export default SweetAlert;
