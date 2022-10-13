import React from 'react';

import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/outline";

export default function Pagination({total, currentPage, onClick}) {

    const renderPagination = (pages) => {
        const pagesComponent = [];
        
        
        for (let i = 1; i <= pages; i++) {
            let classStyle = 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '+((currentPage+1) === i ? 'text-yellow-600 bg-yellow-50 border border-yellow-300 hover:bg-yellow-100 hover:text-yellow-700' : '');
            pagesComponent.push(
                <li key={'pg-'+i} onClick={() => clickBtn(i)}>
                    <a href="#" className={classStyle}>{i}</a>
                </li>
            )
        }
        return pagesComponent;
    }

    const clickBtn = (pg) => {
        onClick(pg);
    }

    const nextClick = () => {
        if ((currentPage+1) < total) {
            onClick((currentPage+1)+1);
        }
        
    }
    const previusPage = () => {
        if (currentPage > 0) {
            onClick((currentPage+1)-1);
        }
        
    }

    return (
        <div className='flex justify-center'>
            <nav>
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <a href="#" onClick={previusPage} className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Previous</span>
                            <ChevronDoubleLeftIcon className='w-5 h-5' />
                        </a>
                    </li>
                    {renderPagination(total)}
                    <li>
                        <a href="#" onClick={nextClick} className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Next</span>
                            <ChevronDoubleRightIcon className='w-5 h-5' />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
