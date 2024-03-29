import { useCallback, useState, Fragment } from "react";
import { Background } from "react-flow-renderer";
import { Popover, Transition } from "@headlessui/react";

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";

import {
  CheckCircleIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";

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

const errorEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    label: "/api/customer/accounts",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "getCustomerAccounts()",
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
    label: "getCustomerStatus()",
    style: { stroke: "red" },
  },
];

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeSelected, setNodeSelected] = useState(false);

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

  return (
    <div className="bg-gray-50 h-full">
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
          <h3 className="px-2 text-gray-700 uppercase text-sm font-semibold">
            Operaciones
          </h3>

          <form className="px-1 mt-2.5 relative">
            <SearchIcon className="h-4 w-4 text-gray-500 absolute inset-y-0 my-auto left-3" />
            <input
              type="text"
              placeholder="Buscar"
              className="rounded-md bg-gray-200 border-none py-1.5 placeholder-gray-400 text-sm w-full pl-7 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-none"
            />
          </form>

          <div className="bg-white rounded-lg shadow w-96">
            <ul className="mt-4 flex flex-col divide-y">
              <li>
                <a
                  href="#"
                  className="text-xs px-4 py-1.5 flex font-medium items-center justify-between text-gray-700 hover:bg-gray-100"
                >
                  <span>2022-06-30T15:57:25.023Z</span>
                  <ChevronRightIcon className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs px-4 py-1.5 flex font-medium items-center justify-between text-gray-700 hover:bg-gray-100 bg-gray-100"
                >
                  <span>2022-06-30T15:57:31.749Z</span>
                  <ChevronRightIcon className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs px-4 py-1.5 flex font-medium items-center justify-between text-gray-700 hover:bg-gray-100"
                >
                  <span>2022-06-30T15:57:37.039Z</span>
                  <ChevronRightIcon className="h-5 w-5" />
                </a>
              </li>
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

        {/* <div className="container mx-auto mt-8 bg-white p-8 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-800 text-sm font-semibold uppercase">
                Operación / Trace ID
              </div>
              <div className="text-sm font-mono text-gray-600 mt-1">
                25579fdc-bf73-45ca-8f09-73e5bb0802f9
              </div>
              <div className="text-sm font-mono text-gray-600">
                2022-06-29T20:15:29.028Z
              </div>
            </div>

            <XCircleIcon className="h-5 w-5 text-red-500" />
          </div>

          <div className="h-96 w-full">
            <ReactFlow
              nodes={errorNodes}
              edges={errorEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg
      className="h-10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 231.79 94.64"
    >
      <path
        d="M49.7 68.21c1.15 1.99.21 3.62-2.09 3.62l-27.45.03c-2.3 0-3.24-1.63-2.09-3.62l13.7-23.79c1.15-1.99 3.03-2 4.18-.01L49.7 68.21z"
        fill="#fff"
      />
      <path
        d="M46.8 23.32 23.58 37.97c-1.95 1.22-1.88 3.09.15 4.17l7.19 3.8.85-1.48c1.15-1.99 3.03-2 4.18-.01l3.45 5.96 8.6 4.54c2.04 1.07 3.63.07 3.54-2.23L50.5 25.28c-.08-2.29-1.76-3.18-3.7-1.96"
        fill="#f5a800"
      />
      <path
        className="st2"
        d="M49.7 68.21c1.15 1.99.21 3.62-2.09 3.62l-27.45.03c-2.3 0-3.24-1.63-2.09-3.62l13.7-23.79c1.15-1.99 3.03-2 4.18-.01L49.7 68.21z"
        fill="#6f7271"
      />
      <path
        d="M37.73 32.51 18.67 52.26c-1.6 1.65-1.08 3.46 1.15 4.02l4.5 1.12 7.41-12.88c1.15-1.99 3.03-2 4.18-.01l10.66 18.42c2.17.48 3.42-.85 2.8-3.03L41.8 33.5c-.64-2.19-2.47-2.65-4.07-.99"
        fill="#b4a269"
      />
      <g fill="#6f7271">
        <path
          className="st2"
          d="m126.9 55.42-10.45-.01a.82.82 0 0 1-.57-1.1l5.2-13.16c.1-.24.33-.41.6-.41.27 0 .5.17.6.4l5.2 13.17c.22.54-.14 1.01-.58 1.11m4.54 8.61 2.29 5.68c.7 1.76 2.7 2.61 4.47 1.91a3.438 3.438 0 0 0 1.91-4.47l-12.75-31.84a6.09 6.09 0 0 0-5.66-3.84c-2.58 0-4.77 1.6-5.67 3.84l-12.74 31.84c-.7 1.76.15 3.76 1.91 4.47 1.76.7 3.76-.15 4.46-1.91l2.29-5.68c.58-1.38 1.95-1.98 3.37-1.92h12.76c1.55 0 2.78.54 3.36 1.92M210.79 64.74h-11.36c-6.61-.01-9.83-2.8-10.58-9.46h20.88c1.9 0 3.43-1.54 3.43-3.43a3.43 3.43 0 0 0-3.43-3.43h-20.88c.76-6.68 3.98-9.48 10.61-9.48h11.34c1.89 0 3.42-1.54 3.42-3.43 0-1.89-1.53-3.43-3.42-3.43h-11.34c-8.05 0-17.65 3.43-17.65 19.77s9.6 19.76 17.65 19.76h11.34c1.89 0 3.42-1.54 3.42-3.43 0-1.9-1.53-3.44-3.43-3.44M71.51 55.28h16.38c2.58.04 4.67 2.14 4.67 4.73 0 2.62-2.13 4.75-4.74 4.75H71.51v-9.48zm0-16.33h15.76c2.62 0 4.74 2.12 4.74 4.73 0 2.59-2.09 4.7-4.67 4.74H71.51v-9.47zm15.76 32.66c7.08 0 12.56-3.74 12.56-10.98 0-4.27-2.62-7.21-5.6-8.79 2.75-1.57 5.09-5.12 5.09-8.57 0-6.54-4.65-11.19-12.05-11.19H67.31c-1.17 0-2.12.95-2.12 2.12v35.28c0 1.17.94 2.13 2.12 2.13h19.96M177.85 60.02c0-6.39-5.2-11.61-11.57-11.61h-10.91c-2.62 0-4.74-2.12-4.74-4.74s2.12-4.74 4.74-4.74h16.54c1.9 0 3.43-1.53 3.43-3.43a3.43 3.43 0 0 0-3.43-3.43l-16.55.01c-6.41 0-11.61 5.2-11.61 11.61 0 6.41 5.19 11.61 11.61 11.61h10.9c2.61 0 4.73 2.11 4.73 4.72 0 2.6-2.12 4.72-4.73 4.72h-19.09c-1.9 0-3.44 1.53-3.44 3.44 0 1.89 1.54 3.43 3.44 3.43h19.09c.15 0 .28-.01.42-.02 6.2-.23 11.17-5.32 11.17-11.57"
        />
      </g>
    </svg>
  );
}
