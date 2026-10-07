import { useEffect, useReducer, useState, useRef } from "react";
import {
  Network,
  GitBranch,
  Play,
  ShieldCheck,
  ScanSearch,
  ArrowUpRight,
  BookOpen,
  X,
  Info,
  PanelRightClose,
  PanelRightOpen,
  ChevronRight,
  Search,
  Laptop,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { initialState, reduceState } from "@/lib/state";
import { nodes, nodeById, typeLabels } from "@/data/nodes";
import { laptopScenario } from "@/data/scenarios";
import { mapLayout, scenarioLayout, documentLayout } from "@/data/layouts";
import type { View, NodeType } from "@/types";
import { Graph } from "./Graph";
import { LearningPanel } from "./LearningPanel";
import { ScenarioPlayer } from "./ScenarioPlayer";
import { ControlExplorer } from "./ControlExplorer";
import { AuditMode } from "./AuditMode";
const views: { id: View; title: string; icon: LucideIcon; label: string; description: string }[] = [
  {
    id: "map",
    title: "ISMS Map",
    icon: Network,
    label: "The ISMS engine room",
    description: "See how the requirements connect. Follow the relationships that make it a system.",
  },
  {
    id: "documents",
    title: "Document Flow",
    icon: GitBranch,
    label: "Every artefact has a reason",
    description: "Where did it come from? What happens because of it? Follow the information.",
  },
  {
    id: "scenario",
    title: "Scenario Mode",
    icon: Play,
    label: "One issue. The whole system.",
    description: "Watch a laptop encryption gap travel from discovery to continual improvement.",
  },
  {
    id: "controls",
    title: "Control Explorer",
    icon: ShieldCheck,
    label: "Explore the control layer",
    description: "Connect a protection need to a control, its implementation and supporting evidence.",
  },
  {
    id: "audit",
    title: "Audit Mode",
    icon: ScanSearch,
    label: "Show it. Then test it.",
    description: "Explore the difference between a control that exists and a control you can demonstrate.",
  },
];
export function EngineRoom() {
  const [state, dispatch] = useReducer(
    (s: typeof initialState, a: Parameters<typeof reduceState>[1]) => reduceState(s, a, laptopScenario),
    initialState,
  );
  const [showLabels, setShowLabels] = useState(true);
  const [showFeedback, setShowFeedback] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [speed, setSpeed] = useState(1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutDialog = useRef<HTMLDialogElement>(null);
  const aboutTrigger = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const currentView = views.find((v) => v.id === state.view) ?? views[0];
  const step = laptopScenario.steps[state.stepIndex];
  const layout = state.view === "map" ? mapLayout : state.view === "scenario" ? scenarioLayout : documentLayout;
  const isGraph = state.view === "map" || state.view === "documents" || state.view === "scenario";
  useEffect(() => {
    const syncHash = () => {
      const view = window.location.hash.slice(1);
      if (views.some((v) => v.id === view)) dispatch({ type: "view", view: view as View });
      else if (!view) dispatch({ type: "view", view: "map" });
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);
  useEffect(() => {
    if (!state.playing || state.view !== "scenario") return;
    const timer = window.setTimeout(() => {
      dispatch({ type: "tick" });
    }, 9000 / speed);
    return () => {
      window.clearTimeout(timer);
    };
  }, [state.playing, state.view, state.stepIndex, speed]);
  useEffect(() => {
    const onHidden = () => {
      if (document.hidden) dispatch({ type: "pause" });
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, []);
  useEffect(() => {
    if (aboutOpen) {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      aboutDialog.current?.showModal();
    } else aboutDialog.current?.close();
  }, [aboutOpen]);
  const select = (id: string) => {
    dispatch({ type: "select", id });
    setPanelOpen(true);
  };
  const navigate = (view: View) => {
    dispatch({ type: "view", view });
    setSearch("");
  };
  const listNodes = nodes.filter(
    (n) =>
      layout.positions.some((p) => p.id === n.id) &&
      `${n.title} ${n.shortDescription} ${n.type}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to learning content
      </a>
      <aside className="sidebar">
        <a
          className="brand"
          href="#map"
          onClick={() => {
            navigate("map");
          }}
          aria-label="Visualize ISO 27001 home"
        >
          <span className="brand-mark">
            <Network size={22} />
          </span>
          <div>
            Visualize<span>ISO 27001</span>
          </div>
        </a>
        <div className="edition-badge">
          <span />
          ISO / IEC 27001:2022
        </div>
        <span className="nav-heading">EXPLORE THE SYSTEM</span>
        <nav aria-label="Learning views">
          {views.map(({ id, title, icon: Icon }, index) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                navigate(id);
              }}
              className={cn("nav-link", state.view === id && "active")}
              aria-current={state.view === id ? "page" : undefined}
            >
              <Icon size={17} />
              <span>{title}</span>
              <small>0{index + 1}</small>
            </a>
          ))}
        </nav>
        <div className="sidebar-scenario">
          <span className="scenario-mini-icon">
            <Laptop size={20} />
          </span>
          <span className="eyebrow">FOLLOW A REAL-WORLD EXAMPLE</span>
          <h3>The unencrypted laptop</h3>
          <p>
            One security issue.
            <br />A connected chain of decisions.
          </p>
          <a
            href="#scenario"
            onClick={() => {
              navigate("scenario");
            }}
          >
            Explore scenario
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="sidebar-bottom">
          <button
            ref={aboutTrigger}
            onClick={() => {
              setAboutOpen(true);
            }}
          >
            <Info size={15} />
            About this learning tool
            <ArrowUpRight size={13} />
          </button>
          <div>
            <span className="status-dot" />
            Local learning environment
          </div>
          <small>Understand the system, not just the standard.</small>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div>
            <span>WORKSPACE</span>
            <ChevronRight size={13} />
            {currentView.title}
          </div>
          <div>
            <span className="learning-badge">
              <span className="status-dot" />
              INTERACTIVE LEARNING
            </span>
            <button
              className="help-button"
              aria-label="Open learning guide"
              onClick={() => {
                setAboutOpen(true);
              }}
            >
              <BookOpen size={17} />
            </button>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="page-heading">
            <div>
              <span className="eyebrow">VISUALIZE THE CONNECTIONS</span>
              <h1>{currentView.label}</h1>
              <p>{currentView.description}</p>
            </div>
            {state.view !== "scenario" && (
              <a
                className="scenario-cta"
                href="#scenario"
                onClick={() => {
                  navigate("scenario");
                }}
              >
                <Play size={14} fill="currentColor" />
                Watch a scenario
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
          <div className={cn("learning-workspace", !panelOpen && "panel-closed")}>
            <div className="primary-content">
              {isGraph && (
                <>
                  {state.view !== "scenario" ? (
                    <div className="map-toolbar">
                      <div className="view-indicator">
                        <currentView.icon size={17} />
                        <span>{state.view === "map" ? "System overview" : "Artefact network"}</span>
                        <small>{layout.positions.length} nodes</small>
                      </div>
                      <div className="map-options">
                        <label>
                          <input
                            type="checkbox"
                            checked={showLabels}
                            onChange={(e) => {
                              setShowLabels(e.target.checked);
                            }}
                          />
                          Labels
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={showFeedback}
                            onChange={(e) => {
                              setShowFeedback(e.target.checked);
                            }}
                          />
                          Feedback loops
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="scenario-header">
                      <span className="scenario-mini-icon">
                        <Laptop size={18} />
                      </span>
                      <div>
                        <strong>{laptopScenario.title}</strong>
                        <span>Guided simulation · 21 steps · fictional company</span>
                      </div>
                      <span className="scenario-pill">SCENARIO 01</span>
                    </div>
                  )}
                  {state.view === "scenario" && (
                    <ScenarioPlayer
                      scenario={laptopScenario}
                      stepIndex={state.stepIndex}
                      playing={state.playing}
                      onMove={(direction) => {
                        dispatch({ type: "move", direction });
                      }}
                      onToggle={() => {
                        dispatch({ type: "toggle" });
                      }}
                      onRestart={() => {
                        dispatch({ type: "restart" });
                      }}
                      speed={speed}
                      onSpeed={setSpeed}
                      onJump={(index) => {
                        dispatch({ type: "jump", index });
                      }}
                    />
                  )}
                  <Graph
                    key={state.view}
                    layout={layout}
                    selected={state.selected}
                    onSelect={select}
                    step={state.view === "scenario" ? step : undefined}
                    showLabels={state.view === "scenario" || showLabels}
                    showFeedback={state.view === "scenario" || showFeedback}
                    filter={search}
                  />
                  <div className="legend">
                    {(Object.keys(typeLabels) as NodeType[]).map((type) => (
                      <span key={type}>
                        <span className={`legend-dot type-${type}`} />
                        {typeLabels[type]}
                      </span>
                    ))}
                  </div>
                  {state.view === "map" && (
                    <div className="insight-strip">
                      <span>
                        <Sparkles size={20} />
                      </span>
                      <div>
                        <h3>A system, not a checklist.</h3>
                        <p>
                          Clauses 4–10 establish how the ISMS works. Annex A supports control decisions. Feedback keeps
                          the whole system learning.
                        </p>
                      </div>
                      <a
                        href="#documents"
                        onClick={() => {
                          navigate("documents");
                        }}
                      >
                        Follow the information
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  )}
                  <details className="node-directory">
                    <summary>
                      <Network size={15} />
                      Explore nodes as a list<span>{layout.positions.length} concepts</span>
                    </summary>
                    <label className="search-box">
                      <Search size={16} />
                      <input
                        type="search"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        placeholder="Find a concept…"
                        aria-label="Search graph concepts"
                      />
                    </label>
                    <div>
                      {listNodes.length ? (
                        listNodes.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => {
                              select(n.id);
                            }}
                            aria-pressed={state.selected === n.id}
                          >
                            <span className={`legend-dot type-${n.type}`} />
                            {n.title}
                            <ArrowUpRight size={12} />
                          </button>
                        ))
                      ) : (
                        <p>No concepts match this search.</p>
                      )}
                    </div>
                  </details>
                </>
              )}
              {state.view === "controls" && <ControlExplorer selected={state.selected} onSelect={select} />}
              {state.view === "audit" && <AuditMode onSelect={select} />}
            </div>
            {panelOpen && (
              <div className="panel-wrapper">
                <button
                  className="panel-toggle"
                  aria-label="Hide learning panel"
                  onClick={() => {
                    setPanelOpen(false);
                  }}
                >
                  <PanelRightClose size={16} />
                </button>
                <LearningPanel node={nodeById[state.selected]} onSelect={select} />
              </div>
            )}
            {!panelOpen && (
              <Button
                variant="outline"
                className="show-panel"
                onClick={() => {
                  setPanelOpen(true);
                }}
              >
                <PanelRightOpen size={16} />
                Learning panel
              </Button>
            )}
          </div>
          <footer className="workspace-footer">
            <span>
              Built for understanding.<span className="footer-divider">/</span>Original educational summaries.
            </span>
            <button
              onClick={() => {
                setAboutOpen(true);
              }}
            >
              Content notes & sources
              <ArrowUpRight size={12} />
            </button>
          </footer>
        </main>
      </div>
      <dialog
        ref={aboutDialog}
        className="about-dialog"
        onCancel={() => {
          setAboutOpen(false);
        }}
        onClose={() => {
          setAboutOpen(false);
          previousFocus.current?.focus();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close learning guide"
          onClick={() => {
            setAboutOpen(false);
          }}
        >
          <X size={19} />
        </button>
        <span className="eyebrow">A VIEW INSIDE THE ISMS</span>
        <h2>Learn through connections.</h2>
        <p>
          Start with the map, select a node and follow its incoming and outgoing relationships. The document network
          reveals common artefacts. Scenario Mode shows how one issue changes information across the system.
        </p>
        <h3>Reading the visualisation</h3>
        <p>
          Solid arrows show information or influence. Dashed arrows show feedback. In a scenario, highlighted nodes and
          travelling packets show the active relationship; the step explanation describes what changes.
        </p>
        <h3>Content notes</h3>
        <p>
          These are original educational summaries of ISO/IEC 27001:2022 concepts. Document names, roles, scores and
          evidence are illustrative. This is not the ISO standard, a certification decision or a compliance assessment.
          Different organisations can meet requirements in different ways.
        </p>
        <p>
          Annex A is a control reference set. Controls are determined from organisational needs and compared against it;
          necessary custom controls can also be included. The Statement of Applicability records decisions and
          implementation status.
        </p>
        <h3>Primary references</h3>
        <ul>
          <li>
            <a href="https://www.iso.org/standard/27001" target="_blank" rel="noreferrer">
              ISO: ISO/IEC 27001 overview
              <ArrowUpRight size={13} />
            </a>
          </li>
          <li>
            <a
              href="https://committee.iso.org/files/live/sites/jtc1sc27/files/resources/ISO-IECJTC1-SC27-WG1_N3298_Auditing%20Practices%20Note%20-%20SoA.pdf"
              target="_blank"
              rel="noreferrer"
            >
              SC 27-hosted SoA auditing practices discussion
              <ArrowUpRight size={13} />
            </a>
            <small>Educational discussion paper; not endorsed ISO normative guidance.</small>
          </li>
        </ul>
        <Button
          onClick={() => {
            setAboutOpen(false);
          }}
        >
          Start exploring
          <ArrowRightIcon />
        </Button>
      </dialog>
    </div>
  );
}
function ArrowRightIcon() {
  return <ChevronRight size={16} />;
}
