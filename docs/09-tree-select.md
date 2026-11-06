# 09. Tree Select

Tree mode renders hierarchical options (for example the ICS — International Classification for
Standards) as an expandable tree inside the normal `ngb-select` dropdown. It is opt-in: with
`tree` unset, the component behaves exactly as before.

## Data shape

```ts
icsTree = [
  {
    code: '13',
    nameEn: 'Environment, health protection, safety',
    nameAr: 'البيئة وحماية الصحة والسلامة',
    count: 3,
    children: [
      {
        code: '13.100',
        nameEn: 'Occupational safety. Industrial hygiene',
        count: 2,
        children: [{ code: '13.100.10', nameEn: 'Ergonomics', count: 1, children: [] }],
      },
    ],
  },
];
```

The children property is named by `optionChildren` (default `children`). A missing, non-array or
empty children property makes the node a leaf. `optionLabel`, `optionValue`, `optionDisabled` and
`dataKey` apply to every node at every depth.

## Inputs & outputs

| Input            | Type               | Default      | Notes                                                                                                         |
| ---------------- | ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `tree`           | `boolean`          | `false`      | Enables tree mode. Accepts the bare attribute (`<ngb-select tree>`).                                          |
| `optionChildren` | `string`           | `'children'` | Children array property.                                                                                      |
| `treeSelectable` | `'all' \| 'leaf'`  | `'all'`      | `'leaf'`: parents are not selectable; clicking or pressing Enter on a parent row toggles it.                  |
| `treeExpandAll`  | `boolean`          | `false`      | Start fully expanded.                                                                                         |
| `treeShowPath`   | `boolean`          | `false`      | Selected label = ancestor labels + node label joined with `' › '`. Applies to chips/comma labels too.        |

| Output           | Payload        |
| ---------------- | -------------- |
| `onNodeExpand`   | the node (option object) |
| `onNodeCollapse` | the node (option object) |

New exported types: `TreeSelectableMode`, `TreeNodeEntry`.

`tree`, `treeExpandAll`, `treeShowPath`, `filter` and `showClear` accept bare boolean attributes
(`booleanAttribute` transform), so `<ngb-select tree filter showClear>` works.

## Behaviour

- **Rendering** — the tree is flattened into the visible rows; each row is indented with
  `padding-inline-start` (so RTL indents from the right). Parent rows get a chevron toggle button,
  leaves get an equal-width spacer so labels align.
- **Toggle vs. select** — clicking the chevron expands/collapses without selecting; clicking the
  row selects (or toggles, for parents under `treeSelectable="leaf"`).
- **Initial expansion** — collapsed by default (or fully expanded with `treeExpandAll`). When the
  panel opens, the ancestors of the selected value(s) are expanded and the selected row is focused
  and scrolled into view. User expansions are kept between openings.
- **Value lookup** — the whole tree is searched (single and `multiple`), so a nested value written
  through `ngModel` / `FormControl` shows its label.
- **Filtering** — a node matches on its label (or the `filterBy` fields) using `filterMatchMode`,
  `filterLocale` and Arabic normalization. Ancestors of matches are kept and auto-expanded; the full
  subtree of a matching node remains available (collapsed, expandable). Toggles made while filtering
  only apply to that query; clearing the filter restores the previous expanded state.
- **Multiple** — each node is selected independently: selecting a parent does **not** select its
  descendants and vice versa (no cascading / tri-state). `showSelectAll` selects the currently
  visible rows.

## Keyboard (WAI-ARIA tree pattern)

| Key               | Action                                                                  |
| ----------------- | ----------------------------------------------------------------------- |
| ArrowDown / Up    | Next / previous visible row (opens the panel when closed).              |
| ArrowRight (LTR)  | Expand a collapsed parent; on an expanded parent move to its first child. |
| ArrowLeft (LTR)   | Collapse an expanded parent; otherwise move to the parent row.           |
| Home / End        | First / last visible row.                                               |
| Enter / Space     | Select the focused row (respects `treeSelectable`).                     |
| Escape            | Close the panel.                                                        |

Under RTL (`dir="rtl"` on the component or an ancestor) ArrowLeft/ArrowRight are swapped, and the
collapsed chevron is mirrored (`bi-chevron-left`, pointing in the reading direction). Left/Right/Home/End
are ignored while the caret is in the filter input so text editing still works.

ARIA: the panel has `role="tree"` (`aria-multiselectable` in multiple mode), rows have
`role="treeitem"`, `aria-level`, `aria-selected` and `aria-expanded` (parents only); the trigger
uses `aria-haspopup="tree"`.

## Templates

The `#item` template receives:

| Context       | Value                             |
| ------------- | --------------------------------- |
| `$implicit`   | the node                          |
| `node`        | the node                          |
| `depth`       | 0-based depth                     |
| `expanded`    | whether the node is expanded      |
| `hasChildren` | whether the node has children     |

The `#selectedItem` / `#label` templates additionally receive `node`, `depth`, `path` (array of
nodes from root to the selected node) and `hasChildren` in tree mode.

## Limitations

- No cascading / tri-state checkbox selection in `multiple` mode.
- `group` is ignored while `tree` is on.
- No virtual scrolling; very large trees render all visible rows.
- `lazy` loading of children is not supported (the whole tree must be supplied).
