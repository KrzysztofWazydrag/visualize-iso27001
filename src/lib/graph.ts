import type { NodePosition, Relationship, GraphLayout, EdgeGeometry } from "../types";
import { NODE_WIDTH as W, NODE_HEIGHT as H } from "../data/layouts";
export function edgeGeometry(
  source: NodePosition,
  target: NodePosition,
  edge: Relationship,
  layout: GraphLayout,
): EdgeGeometry {
  const custom: EdgeGeometry | undefined = layout.routes?.[edge.id];
  if (custom) return custom;
  const sx = source.x + W / 2,
    sy = source.y + H / 2;
  const tx = target.x + W / 2,
    ty = target.y + H / 2;
  if (sy === ty) {
    if (Math.abs(tx - sx) > 300) {
      const gutter = source.y - 30;
      return {
        path: `M ${sx} ${source.y} C ${sx} ${gutter}, ${tx} ${gutter}, ${tx} ${target.y}`,
        x: (sx + tx) / 2,
        y: gutter - 4,
      };
    }
    const direction = tx > sx ? 1 : -1;
    const start = sx + (direction * W) / 2,
      end = tx - (direction * W) / 2;
    return { path: `M ${start} ${sy} L ${end} ${ty}`, x: (start + end) / 2, y: source.y - 12 };
  }
  const direction = ty > sy ? 1 : -1;
  const start = sy + (direction * H) / 2,
    end = ty - (direction * H) / 2;
  if (Math.abs(ty - sy) <= 220) {
    const middle = (start + end) / 2;
    return {
      path: `M ${sx} ${start} C ${sx} ${middle}, ${tx} ${middle}, ${tx} ${end}`,
      x: (sx + tx) / 2 + (sx === tx ? 12 : 0),
      y: middle - 7,
    };
  }
  // Long connections use the outer gutter so they do not pass through intermediate nodes.
  const outer = tx > layout.width / 2 ? layout.width - 25 : 25;
  const fromGutter = start + direction * 30,
    toGutter = end - direction * 30;
  return {
    path: `M ${sx} ${start} L ${sx} ${fromGutter} L ${outer} ${fromGutter} L ${outer} ${toGutter} L ${tx} ${toGutter} L ${tx} ${end}`,
    x: (sx + outer) / 2,
    y: fromGutter - 9,
  };
}
