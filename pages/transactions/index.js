
import React, {useState, useCallback} from 'react'
import axios from 'axios';
import moment from 'moment';
moment.updateLocale('es',{
    weekdays : 'domingo_lunes_martes_miercoles_jueves_viernes_sabado'.split('_'),
    months : 'enero_febrero_marzo_abrir_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
})

import Logo from "../../components/miscellaneous/Logo";

import {
    CheckCircleIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/outline";

import ReactFlow, { Background, applyEdgeChanges, applyNodeChanges, } from "react-flow-renderer";

const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Web" },
      position: { x: 0, y: 0 },
      sourcePosition: "right",
    },
  
    {
      id: "2",
      data: { label: "API Gateway" },
      position: { x: 400, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      type: "default",
    },
    {
      id: "3",
      data: { label: "Orchestra" },
      position: { x: 600, y: 0 },
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "4",
      data: { label: "Core" },
      position: { x: 1000, y: 0 },
      targetPosition: "left",
    },
    {
      id: "5",
      data: { label: "Clientes" },
      position: { x: 980, y: 80 },
      targetPosition: "left",
    },
  ];

const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      label: "/api/customer/accounts",
      markerEnd: {
        type: "arrowclosed",
        color: "#22c55e",
      },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      markerEnd: {
        type: "arrowclosed",
        color: "#22c55e",
      },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: true,
      label: "getCustomerAccounts()",
      markerEnd: {
        type: "arrowclosed",
        color: "#22c55e",
      },
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      animated: true,
      label: "getCustomerStatus()",
      markerEnd: {
        type: "arrowclosed",
        color: "#22c55e",
      },
    },
  ];

const errorNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Móvil" },
      position: { x: 0, y: 0 },
      sourcePosition: "right",
    },
  
    {
      id: "2",
      data: { label: "API Gateway" },
      position: { x: 400, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      type: "default",
    },
    {
      id: "3",
      data: { label: "Orchestra" },
      position: { x: 600, y: 0 },
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "4",
      data: { label: "Core" },
      position: { x: 1000, y: 0 },
      targetPosition: "left",
    },
    {
      id: "5",
      data: { label: "Clientes" },
      position: { x: 980, y: 80 },
      targetPosition: "left",
      style: { border: "1px solid red" },
    },
    // {
    //   id: "6",
    //   data: { label: "Log system" },
    //   position: { x: 500, y: 150 },
    //   targetPosition: "left",
    //   type: "output",
    // },
  ];

export default function Transactions() {

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [nodeSelected, setNodeSelected] = useState(false);

    const [idFind, setIdFind] = useState('');
    const [datesFind, setDatesFind] = useState({fromDate : '', toDate : ''});
    const [transactions, setTransactions] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    
    function handeNodeClick(e, node) {
        setNodeSelected(node);
        console.log(node);
    }

    const getTransaction = async (e) => {
        e.preventDefault();

        const payload = {...datesFind,id: idFind}

        if(payload.id.trim() === ''){delete payload.id}
        if(payload.fromDate.trim() === ''){delete payload.fromDate}
        if(payload.toDate.trim() === ''){delete payload.toDate}

        const {data} = await axios.get(process.env.NEXT_PUBLIC_HOST_API+'/tracing',{
            params: payload
        })

        if(data.data.length <= 0){
            alert('No hay resultados');
            setTransactions([]);
            return false;
        }else{
            console.log(data.data);
            setTransactions(data.data);
        }

        
    }

    return (
        <div className="bg-gray-50 h-screen">
            <header className="p-4 flex items-center">
                <Logo />
                <h1 className="font-bold text-gray-600 uppercase w-full text-center mt-1 flex flex-col">
                <span className="text-xs font-medium text-gray-500">
                    Infraestructura
                </span>
                <span>Traza de operaciones</span>
                </h1>
            </header>

            <div className="flex mx-5 space-x-5 mt-12">
                <div>
                    <form className="px-1 mt-2.5 relative" onSubmit={getTransaction}>
                        <div>
                            <h3 className="text-gray-700 uppercase text-sm font-semibold">
                                Operaciones
                            </h3>
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="mt-2.5 rounded-md bg-gray-200 border-none py-1.5 placeholder-gray-400 text-sm w-full px-3 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-none"
                                value={idFind}
                                onChange={(e) => setIdFind(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-3">
                            <div>
                                <label htmlFor="fromDate" className="text-gray-700 uppercase text-sm font-semibold">Desde</label>
                                <input
                                    onChange={(e) => setDatesFind({...datesFind, fromDate: e.target.value})}
                                    type="date" id="fromDate" className="mt-2.5 rounded-md bg-gray-200 border-none py-1.5 placeholder-gray-400 text-sm w-full px-3 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-none" placeholder="2022/09/21"/>
                            </div>
                            <div>
                                <label htmlFor="toDate" className="text-gray-700 uppercase text-sm font-semibold">Hasta</label>
                                <input onChange={(e) => setDatesFind({...datesFind, toDate: e.target.value})}
                                    type="date" id="toDate" className="mt-2.5 rounded-md bg-gray-200 border-none py-1.5 placeholder-gray-400 text-sm w-full px-3 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-none" placeholder="2022/09/21"/>
                            </div>
                        </div>
                        
                        <button type='submit' className='group relative mt-3 flex w-full justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2'>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                            </span>
                            Buscar
                        </button>
                    </form>

                    <div className="bg-white rounded-lg shadow w-96">
                        <ul className="mt-4 flex flex-col divide-y">
                            {
                                transactions.map((item) => {
                                    return (
                                        <li key={item._id}>
                                            <a
                                            href="#"
                                            className="text-xs px-4 py-1.5 flex font-medium items-center justify-between text-gray-700 hover:bg-gray-100"
                                            >
                                            <span>{moment(item.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</span>
                                            <ChevronRightIcon className="h-5 w-5" />
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto bg-white p-8 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                        <div className="text-gray-800 text-sm font-semibold uppercase">
                            Operación / Trace ID
                        </div>
                        <div className="text-sm font-mono text-gray-600 mt-1">
                            6080e07-313a-4d64-841a-78fa6c562fc6
                        </div>
                        <div className="text-sm font-mono text-gray-600">
                            2022-06-29T20:01:43.603Z
                        </div>
                        </div>

                        <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="h-96 w-full">
                        <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onNodeClick={handeNodeClick}
                        onEdgesChange={onEdgesChange}
                        onPaneClick={() => setNodeSelected(false)}
                        fitView
                        >
                        <Background />
                        </ReactFlow>
                    </div>

                    {nodeSelected && (
                        <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 text-xs uppercase">
                            General
                        </h3>
                        <ul className="mt-1 text-xs text-gray-700 font-mono">
                            <li>Request URL: http://localhost:3000/</li>
                            <li>Request Method: GET</li>
                            <li>Status Code: 200 OK</li>
                            <li>Referrer Policy: strict-origin-when-cross-origin</li>
                        </ul>

                        <h3 className="mt-4 font-semibold text-gray-800 text-xs uppercase">
                            Request
                        </h3>
                        <ul className="mt-1 text-xs text-gray-700 font-mono">
                            <li>
                            Accept:
                            text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                            </li>
                            <li>Accept-Encoding: gzip, deflate, br</li>
                            <li>
                            Accept-Language:
                            es-ES,es;q=0.9,en;q=0.8,eo;q=0.7,it;q=0.6,gl;q=0.5
                            </li>
                            <li>Cache-Control: max-age=0</li>
                            <li>Connection: keep-alive</li>
                            <li>Host: localhost:3000</li>
                            <li>
                            sec-ch-ua: ".Not/A)Brand";v="99", "Google Chrome";v="103",
                            "Chromium";v="103"
                            </li>
                            <li>sec-ch-ua-mobile: ?0</li>
                            <li>sec-ch-ua-platform: "macOS"</li>
                            <li>Sec-Fetch-Dest: document</li>
                            <li>Sec-Fetch-Mode: navigate</li>
                            <li>Sec-Fetch-Site: same-origin</li>
                            <li>Sec-Fetch-User: ?1</li>
                            <li>Upgrade-Insecure-Requests: 1</li>
                            <li>
                            User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
                            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0
                            Safari/537.36
                            </li>
                        </ul>

                        <h3 className="mt-4 font-semibold text-gray-800 text-xs uppercase">
                            Response
                        </h3>
                        <ul className="mt-1 text-xs text-gray-700 font-mono">
                            <li>Cache-Control: no-store, must-revalidate</li>
                            <li>Connection: keep-alive</li>
                            <li>Content-Encoding: gzip</li>
                            <li>Content-Type: text/html; charset=utf-8</li>
                            <li>Date: Wed, 20 Jul 2022 17:18:23 GMT</li>
                            <li>Keep-Alive: timeout=5</li>
                            <li>Transfer-Encoding: chunked</li>
                            <li>Vary: Accept-Encoding</li>
                            <li>X-Powered-By: Next.js</li>
                        </ul>
                        </div>
                    )}
                    </div>
            </div>
        </div>
    );
}