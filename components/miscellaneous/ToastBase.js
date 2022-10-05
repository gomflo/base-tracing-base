
import {
    CheckIcon,
    XMarkIcon,
    InformationCircleIcon
} from "@heroicons/react/24/outline";

import React, {useState, useEffect} from 'react'
const ToastBase = ({message, style, show}) => {
    const [showToast, setShowToast] = useState(show);
    const [styleToast] = useState(style);
    

    const getStyle = () => {
        switch(styleToast){
            case 'success':
                return {icon : <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
                    <CheckIcon className="w-5 h-5"/>
                </div>,
                background : 'bg-green-300 text-gray-600'};
            break;
            case 'error':
                return {icon : <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
                    <XMarkIcon className="w-5 h-5"/>
                </div>,
                background : 'bg-red-200 text-gray-700'};
            break;
            case 'warning':
                return {icon : <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg ">
                    <InformationCircleIcon className="w-5 h-5"/>
                </div>,
                background : 'bg-yellow-400 text-gray-700'};
            break;
        }
    }
    const [template, setTemplate] = useState(getStyle());

    useEffect(() => {
        setTemplate(getStyle());
    }, [style]);

    return ( 
    <div className={template.background+' flex absolute top-5 right-5 items-center p-4 mb-4 w-full max-w-xs rounded-lg shadow float-right '+(showToast ? '':'hidden')} role="alert">
        
        {template.icon}
        
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button type="button" onClick={() => setShowToast(false)} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
            <XMarkIcon className="w-5 h-5"/>
        </button>
    </div> );
}
 
export default ToastBase;