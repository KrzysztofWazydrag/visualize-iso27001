import { useEffect, useRef, useState, useId } from "react";
import { ZoomIn, ZoomOut, Maximize2, ArrowUpRight, LocateFixed } from "lucide-react";
import { edgeGeometry } from "@/lib/graph";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { nodeById, typeLabels } from "@/data/nodes";
import { relationships } from "@/data/relationships";
import { NODE_WIDTH as W, NODE_HEIGHT as H } from "@/data/layouts";
import type { GraphLayout, NodePosition, ScenarioStep, LearningPath } from "@/types";

interface Props {
  layout: GraphLayout;
  selected: string;
  onSelect: (id: string) => void;
  step?: ScenarioStep;
  showLabels: boolean;
  showFeedback: boolean;
  filter?: string;
  focus?: LearningPath;
}
export function Graph({ layout, selected, onSelect, step, showLabels, showFeedback, filter = "", focus }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.85);
  const [fit, setFit] = useState(0.85);
  const marker = useId().replace(/:/g, "");
  const isMap = layout.positions.some((p) => p.id === "clause-4");
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const value = Math.max(0.65, Math.min(1, entry.contentRect.width / layout.width));
      setZoom(value);
      setFit(value);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [layout.width]);
  useEffect(() => {
    const element = viewport.current;
    const target = step ? step.activeNodes[step.activeNodes.length - 1] : selected;
    const position = layout.positions.find((p) => p.id === target);
    if (!element || !position) return;
    element.scrollTo({
      top: Math.max(0, (position.y + H / 2) * zoom - element.clientHeight / 2),
      left: Math.max(0, (position.x + W / 2) * zoom - element.clientWidth / 2),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [step, selected, layout.positions, zoom]);
  const positions: Partial<Record<string, NodePosition>> = Object.fromEntries(layout.positions.map((p) => [p.id, p]));
  const visibleEdges = relationships.filter(
    (edge) => positions[edge.source] && positions[edge.target] && (showFeedback || !edge.feedback),
  );
  const neighbours = new Set(
    relationships.filter((r) => r.source === selected || r.target === selected).flatMap((r) => [r.source, r.target]),
  );
  return (
    <section className="graph-board" aria-label="Interactive relationship map">
      <div className="graph-topline">
        <span className="eyebrow">
          <span className="status-dot" /> {isMap ? "MANAGEMENT SYSTEM" : "INFORMATION FLOW"}
        </span>
        <span className="graph-instruction">Select a node to explore its connections</span>
      </div>
      <div
        className="graph-viewport"
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label="Scrollable graph. Use Tab to explore nodes; arrow keys to scroll."
      >
        <div className="graph-scaled" style={{ width: layout.width * zoom, height: layout.height * zoom }}>
          <div
            className="graph-canvas"
            style={{ width: layout.width, height: layout.height, transform: `scale(${zoom})` }}
          >
            {isMap && (
              <>
                <span className="canvas-phase phase-top">ESTABLISH & PLAN</span>
                <span className="canvas-phase phase-middle">SUPPORT & OPERATE</span>
                <span className="canvas-phase phase-bottom">EVALUATE & IMPROVE</span>
                <div className="system-centre">
                  <LocateFixed size={30} />
                  <strong>
                    One connected
                    <br />
                    management system
                  </strong>
                  <span>Decide. Operate. Learn. Repeat.</span>
                </div>
              </>
            )}
            <svg className="relationship-layer" width={layout.width} height={layout.height} aria-hidden="true">
              <defs>
                <marker
                  id={`${marker}-arrow`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
                </marker>
              </defs>
              {visibleEdges.map((edge) => {
                const source = positions[edge.source];
                const target = positions[edge.target];
                if (!source || !target) return null;
                const geo = edgeGeometry(source, target, edge, layout);
                const focused = focus?.relationships.includes(edge.id) ?? false;
                const active = step
                  ? step.activeRelationships.includes(edge.id)
                  : focused || edge.source === selected || edge.target === selected;
                const pathId = `${marker}-${edge.id}`;
                return (
                  <g
                    key={edge.id}
                    className={cn(
                      "relationship",
                      edge.feedback && "feedback",
                      active && "active",
                      Boolean(step ?? focus) && !active && "receded",
                    )}
                    data-edge={edge.id}
                  >
                    <path id={pathId} d={geo.path} markerEnd={`url(#${marker}-arrow)`} />
                    {showLabels && (active || isMap) && (
                      <text x={geo.x} y={geo.y} textAnchor="middle" className="edge-label">
                        {edge.label}
                      </text>
                    )}
                    {step && active && (
                      <circle r="4" className="information-packet">
                        <animateMotion key={step.id} dur="2.4s" repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>
            {layout.positions.map((p) => {
              const n = nodeById[p.id];
              const active = step ? step.activeNodes.includes(n.id) : focus?.steps.some((item) => item.nodeId === n.id);
              const matches =
                !filter || `${n.title} ${n.shortDescription} ${n.type}`.toLowerCase().includes(filter.toLowerCase());
              const clause = n.type === "requirement" ? n.clauseRefs[0] : undefined;
              return (
                <button
                  key={p.id}
                  type="button"
                  data-node={n.id}
                  aria-pressed={selected === n.id}
                  onClick={() => {
                    onSelect(n.id);
                  }}
                  className={cn(
                    "graph-node",
                    `type-${n.type}`,
                    selected === n.id && "selected",
                    active && "step-active",
                    Boolean(step ?? focus) && !active && selected !== n.id && "receded",
                    !matches && "filtered",
                    !step && neighbours.has(n.id) && "connected",
                  )}
                  style={{ left: p.x, top: p.y, width: W, height: H }}
                >
                  <span className="node-type">
                    {clause ? `CLAUSE ${clause}` : typeLabels[n.type]}
                    <ArrowUpRight size={13} />
                  </span>
                  <strong>{clause ? n.title.split(" · ")[1] : n.title}</strong>
                  <span className="node-meta">
                    {n.id === "annex"
                      ? "Reference set · applicability varies"
                      : n.type === "requirement"
                        ? "Management system requirement"
                        : `Clause ${n.clauseRefs.join(" · ")}`}
                  </span>
                  <span className="node-port port-in" />
                  <span className="node-port port-out" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="graph-bottomline">
        <span>
          <span className="solid-key" /> Information flow <span className="dashed-key" /> Feedback loop
        </span>
        <div className="zoom-controls">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            onClick={() => {
              setZoom((z) => Math.max(0.55, z - 0.1));
            }}
          >
            <ZoomOut />
          </Button>
          <span>{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            onClick={() => {
              setZoom((z) => Math.min(1.4, z + 0.1));
            }}
          >
            <ZoomIn />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fit map to width"
            onClick={() => {
              setZoom(fit);
            }}
          >
            <Maximize2 />
          </Button>
        </div>
      </div>
    </section>
  );
}
