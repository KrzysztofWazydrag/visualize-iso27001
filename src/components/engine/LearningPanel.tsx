import { ArrowDownLeft, ArrowUpRight, Lightbulb, MessageCircle, Network, BookOpen } from "lucide-react";
import { nodeById, typeLabels } from "@/data/nodes";
import { relationships } from "@/data/relationships";
import { controls } from "@/data/controls";
import { clauses } from "@/data/clauses";
import { learningPaths } from "@/data/learningPaths";
import { TreatmentTrail } from "./TreatmentTrail";
import type { LearningNode } from "@/types";
interface Props {
  node: LearningNode;
  onSelect: (id: string) => void;
}
export function LearningPanel({ node, onSelect }: Props) {
  const control = controls.find((c) => c.id === node.id);
  const clause = clauses.find((c) => c.id === node.id);
  const path = learningPaths.find((item) => item.id === clause?.learningPathId);
  const incoming = relationships.filter((r) => r.target === node.id);
  const outgoing = relationships.filter((r) => r.source === node.id);
  return (
    <aside className="learning-panel" aria-label="Learning panel">
      <div className="panel-label">
        <BookOpen size={15} />
        <span>LEARNING PANEL</span>
        <span className="panel-live">EXPLORE</span>
      </div>
      <div className="panel-content" key={node.id}>
        <span className={`type-badge type-${node.type}`}>{typeLabels[node.type]}</span>
        <h2>{node.title}</h2>
        {path && <TreatmentTrail path={path} onSelect={onSelect} compact />}
        <section>
          <h3>What is this?</h3>
          <p>{node.description}</p>
        </section>
        <section>
          <h3>Why does it exist?</h3>
          <p>{node.purpose}</p>
        </section>
        {control && (
          <section>
            <h3>Typical implementation</h3>
            <ul>
              {control.implementations.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </section>
        )}
        <section className="connection-section">
          <h3>
            <ArrowDownLeft size={14} /> What feeds into it?
          </h3>
          {incoming.length ? (
            incoming.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelect(r.source);
                }}
                title={r.explanation}
              >
                <span>{nodeById[r.source].title}</span>
                <small>{r.label} ↘</small>
              </button>
            ))
          ) : (
            <p>
              {control
                ? "Organisational context, relevant obligations and treatment decisions establish the need."
                : "Business conditions, relevant requirements and observations provide the starting point."}
            </p>
          )}
        </section>
        <section className="connection-section">
          <h3>
            <ArrowUpRight size={14} /> What does it feed into?
          </h3>
          {outgoing.length ? (
            outgoing.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelect(r.target);
                }}
                title={r.explanation}
              >
                <span>{nodeById[r.target].title}</span>
                <small>{r.label} ↗</small>
              </button>
            ))
          ) : (
            <p>Implementation choices, evidence collection and assurance of the intended outcome.</p>
          )}
        </section>
        {(clause ?? control) && (
          <section className="related-concepts">
            <h3>
              <Network size={14} /> Related artefacts & activities
            </h3>
            {(clause?.relatedNodes ?? control?.relatedNodes ?? []).map((id) => (
              <button
                key={id}
                onClick={() => {
                  onSelect(id);
                }}
              >
                {nodeById[id].title}
                <ArrowUpRight size={12} />
              </button>
            ))}
          </section>
        )}
        <section>
          <h3>Typical owner</h3>
          <p>{node.typicalOwner}</p>
        </section>
        <section>
          <h3>ISO 27001 relationship</h3>
          <div className="reference-tags">
            {node.clauseRefs.map((ref) => (
              <button
                key={ref}
                onClick={() => {
                  onSelect(`clause-${ref.split(".")[0]}`);
                }}
              >
                Clause {ref}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3>Annex A relationship</h3>
          {node.controlRefs.length ? (
            <div className="reference-tags">
              {node.controlRefs.map((ref) => (
                <button
                  key={ref}
                  onClick={() => {
                    onSelect(ref);
                  }}
                >
                  {ref}
                </button>
              ))}
            </div>
          ) : (
            <p>Control applicability is determined through context, requirements and risk treatment.</p>
          )}
        </section>
        {control && (
          <>
            <section>
              <h3>Related risks</h3>
              <ul>
                {control.relatedRisks.map((risk) => (
                  <li key={risk}>{risk}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Related policies</h3>
              <ul>
                {control.relatedPolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </section>
          </>
        )}
        <section>
          <h3>Typical evidence</h3>
          <ul>
            {node.evidenceExamples.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>
        <section className="auditor-question">
          <h3>
            <MessageCircle size={14} /> An auditor might ask
          </h3>
          {node.auditQuestions.map((q) => (
            <p key={q}>“{q}”</p>
          ))}
        </section>
        <section className="misconception">
          <h3>
            <Lightbulb size={14} /> Common misunderstanding
          </h3>
          {node.misconceptions.map((m) => (
            <p key={m}>{m}</p>
          ))}
        </section>
        <p className="panel-footnote">
          Names and owners are examples. Organisations can organise their ISMS information in different ways.
        </p>
      </div>
    </aside>
  );
}
