import { useEffect, useMemo, useRef, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { Logo } from "components/Logo";

export default function DisplayGraph() {
  const containerRef = useRef();
  // const [hoveredNode, setHoveredNode] = useState(undefined);
  // const [hoveredNeighbors, setHoveredNeighbors] = useState(undefined);

  useEffect(() => {
    const graph = new Graph({ multi: true });
    let hoveredNode;

    for (let i = 0; i < 30; i++) {
      graph.addNode("TX" + i, {
        x: Math.random(),
        y: Math.random(),
        size: 10,
        label: "TX" + i,
        color: "blue",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addNode("WE" + i, {
        x: 300 + Math.random(),
        y: Math.random(),
        size: 10,
        label: "Web",
        color: "green",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addNode("AG" + i, {
        x: 600 + Math.random(),
        y: Math.random(),
        size: 10,
        label: "API Gateway",
        color: "gray",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addNode("OR" + i, {
        x: 600 + Math.random(),
        y: 300 + Math.random(),
        size: 10,
        label: "Orchestra",
        color: "yellow",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addNode("CO" + i, {
        x: 300 + Math.random(),
        y: 300 + Math.random(),
        size: 10,
        label: "Core",
        color: "cyan",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addNode("CL" + i, {
        x: 700 + Math.random(),
        y: 600 + Math.random(),
        size: 10,
        label: "Clients",
        color: "purple",
      });
    }

    forceAtlas2.assign(graph, { iterations: 5 });

    for (let i = 0; i < 30; i++) {
      graph.addEdge("TX" + i, "WE" + i);
      graph.addEdge("WE" + i, "AG" + i);
      graph.addEdge("AG" + i, "OR" + i);
      graph.addEdge("OR" + i, "CO" + i);
      graph.addEdge("OR" + i, "CL" + i);
    }

    const renderer = new Sigma(graph, containerRef.current);

    renderer.on("doubleClickNode", ({ node }) => {
      hoveredNode = node;

      const nodeNumber = node.replace(/^\D+/g, "");

      const hoveredNeighbors = new Set();
      hoveredNeighbors.add(`TX${nodeNumber}`);
      hoveredNeighbors.add(`WE${nodeNumber}`);
      hoveredNeighbors.add(`AG${nodeNumber}`);
      hoveredNeighbors.add(`OR${nodeNumber}`);
      hoveredNeighbors.add(`CO${nodeNumber}`);
      hoveredNeighbors.add(`CL${nodeNumber}`);

      graph.forEachNode((n, attrs) => {
        if (!hoveredNeighbors.has(n) && node !== n) attrs.hidden = true;
      });

      renderer.refresh();
    });

    renderer.on("clickNode", () => {
      hoveredNode = undefined;
      graph.forEachNode((n, attrs) => (attrs.hidden = false));
      renderer.refresh();
    });

    // renderer.setSetting("nodeReducer", (node, data) => {
    //   const res = { ...data };

    //   // console.log(hoveredNeighbors, hoveredNode);

    //   if (
    //     hoveredNeighbors &&
    //     !hoveredNeighbors.has(node) &&
    //     hoveredNode !== node
    //   ) {
    //     res.label = "";
    //     res.color = "#f6f6f6";
    //     res.hidden = true;
    //   }

    //   return res;
    // });

    // renderer.setSetting("edgeReducer", (edge, data) => {
    //   const res = { ...data };

    //   if (hoveredNode && !graph.hasExtremity(edge, hoveredNode)) {
    //     res.hidden = true;
    //   }

    //   return res;
    // });
  }, []);

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

      <div className="flex mx-5 space-x-5 mt-12 h-3/4">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow">
          <div className="h-full" ref={containerRef}></div>
        </div>
      </div>
    </div>
  );
}
