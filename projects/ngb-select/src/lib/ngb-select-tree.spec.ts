import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbSelectComponent } from './ngb-select.component';

const ICS = () => [
  {
    code: '13',
    nameEn: 'Environment',
    count: 3,
    children: [
      {
        code: '13.100',
        nameEn: 'Occupational safety',
        count: 2,
        children: [
          { code: '13.100.10', nameEn: 'Ergonomics', count: 1, children: [] },
          { code: '13.100.20', nameEn: 'Lighting', count: 1 },
        ],
      },
      { code: '13.200', nameEn: 'Accident control', count: 1, children: [] },
    ],
  },
  { code: '91', nameEn: 'Construction', count: 1, children: [] },
];

@Component({
  standalone: true,
  imports: [NgbSelectComponent, FormsModule],
  template: `
    <ngb-select
      tree
      [options]="options"
      optionLabel="nameEn"
      optionValue="code"
      optionChildren="children"
      filter
      [multiple]="multiple"
      [treeSelectable]="treeSelectable"
      [treeExpandAll]="treeExpandAll"
      [treeShowPath]="treeShowPath"
      [dir]="dir"
      [(ngModel)]="value"
      (onNodeExpand)="expanded.push($event)"
      (onNodeCollapse)="collapsed.push($event)"
    >
      <ng-template #item let-node let-depth="depth" let-hasChildren="hasChildren">
        <span class="tpl" [attr.data-depth]="depth" [attr.data-parent]="hasChildren"
          >{{ node.code }} {{ node.nameEn }} <span class="badge">{{ node.count }}</span></span
        >
      </ng-template>
    </ngb-select>
  `,
})
class TreeHostComponent {
  options: any[] = ICS();
  multiple = false;
  treeSelectable: any = 'all';
  treeExpandAll = false;
  treeShowPath = false;
  dir: any = undefined;
  value: any = null;
  expanded: any[] = [];
  collapsed: any[] = [];
}

describe('NgbSelectComponent – tree mode', () => {
  let fixture: ComponentFixture<TreeHostComponent>;
  let host: TreeHostComponent;
  let select: NgbSelectComponent;

  const create = async (cfg?: (h: TreeHostComponent) => void) => {
    fixture = TestBed.createComponent(TreeHostComponent);
    host = fixture.componentInstance;
    cfg?.(host);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    select = fixture.debugElement.query(By.directive(NgbSelectComponent)).componentInstance;
  };

  const rows = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('[role="treeitem"]'));
  const codes = () => select.visibleTreeNodes().map((r) => r.node.code);
  const key = (k: string) => {
    select.onKeydown(new KeyboardEvent('keydown', { key: k }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TreeHostComponent] }).compileComponents();
  });

  it('renders only root rows collapsed by default with role=tree and aria attributes', async () => {
    await create();
    expect(fixture.nativeElement.querySelector('[role="tree"]')).toBeTruthy();
    const r = rows();
    expect(r.length).toBe(2);
    expect(r[0].getAttribute('aria-level')).toBe('1');
    expect(r[0].getAttribute('aria-expanded')).toBe('false');
    expect(r[1].getAttribute('aria-expanded')).toBeNull(); // leaf
    expect(r[0].querySelector('.ngb-select-tree-toggle')).toBeTruthy();
    expect(r[1].querySelector('.ngb-select-tree-spacer')).toBeTruthy();
  });

  it('treeExpandAll renders a flattened, indented list with item template context', async () => {
    await create((h) => (h.treeExpandAll = true));
    expect(codes()).toEqual(['13', '13.100', '13.100.10', '13.100.20', '13.200', '91']);
    const r = rows();
    expect(r[2].getAttribute('aria-level')).toBe('3');
    expect(r[2].style.paddingInlineStart).toContain('2');
    expect(r[0].style.paddingInlineStart).not.toEqual(r[2].style.paddingInlineStart);
    const tpl = r[2].querySelector('.tpl') as HTMLElement;
    expect(tpl.getAttribute('data-depth')).toBe('2');
    expect(tpl.getAttribute('data-parent')).toBe('false');
    expect(tpl.textContent).toContain('13.100.10 Ergonomics');
  });

  it('toggle button expands/collapses without selecting and emits events', async () => {
    await create();
    (rows()[0].querySelector('.ngb-select-tree-toggle') as HTMLElement).click();
    fixture.detectChanges();
    expect(codes()).toEqual(['13', '13.100', '13.200', '91']);
    expect(host.value).toBeNull();
    expect(host.expanded.map((n) => n.code)).toEqual(['13']);
    (rows()[0].querySelector('.ngb-select-tree-toggle') as HTMLElement).click();
    fixture.detectChanges();
    expect(codes()).toEqual(['13', '91']);
    expect(host.collapsed.map((n) => n.code)).toEqual(['13']);
  });

  it('clicking a row selects (parents selectable by default)', async () => {
    await create();
    rows()[0].click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value).toBe('13');
  });

  it('resolves a nested ngModel value label, and the path with treeShowPath', async () => {
    await create((h) => (h.value = '13.100.10'));
    expect(select.displayLabel()).toBe('Ergonomics');
    await create((h) => {
      h.value = '13.100.10';
      h.treeShowPath = true;
    });
    expect(select.displayLabel()).toBe('Environment › Occupational safety › Ergonomics');
  });

  it('multiple mode resolves nested labels', async () => {
    await create((h) => {
      h.multiple = true;
      h.value = ['13.100.20', '91'];
    });
    expect(select.displayLabel()).toBe('Lighting, Construction');
  });

  it('expands ancestors of the selected value on open', async () => {
    await create((h) => (h.value = '13.100.10'));
    select.openOverlay();
    fixture.detectChanges();
    expect(codes()).toContain('13.100.10');
  });

  it('filter keeps ancestors, auto-expands them, shows matching subtree, and restores state', async () => {
    await create();
    select.filterValue.set('occupational');
    fixture.detectChanges();
    expect(codes()).toEqual(['13', '13.100']);
    // matching node subtree is available (collapsed) – expand it
    select.toggleTreeNode(select.visibleTreeNodes()[1].node);
    expect(codes()).toEqual(['13', '13.100', '13.100.10', '13.100.20']);

    select.filterValue.set('ergo');
    expect(codes()).toEqual(['13', '13.100', '13.100.10']);

    select.filterValue.set('');
    expect(codes()).toEqual(['13', '91']);
  });

  it("treeSelectable='leaf' toggles parents instead of selecting", async () => {
    await create((h) => (h.treeSelectable = 'leaf'));
    rows()[0].click();
    fixture.detectChanges();
    expect(host.value).toBeNull();
    expect(codes()).toEqual(['13', '13.100', '13.200', '91']);
    rows()[2].click(); // 13.200 leaf
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value).toBe('13.200');
  });

  it('keyboard: ArrowRight expands then moves to child, ArrowLeft collapses / moves to parent, Down/Up/Home/End', async () => {
    await create();
    select.openOverlay();
    fixture.detectChanges();
    select.focusedIndex.set(0);
    key('ArrowRight');
    expect(codes()).toEqual(['13', '13.100', '13.200', '91']);
    expect(select.focusedIndex()).toBe(0);
    key('ArrowRight');
    expect(select.focusedIndex()).toBe(1);
    key('ArrowDown');
    expect(select.focusedIndex()).toBe(2);
    key('ArrowLeft'); // leaf -> parent
    expect(select.focusedIndex()).toBe(0);
    key('ArrowLeft'); // collapse
    expect(codes()).toEqual(['13', '91']);
    key('End');
    expect(select.focusedIndex()).toBe(1);
    key('Home');
    expect(select.focusedIndex()).toBe(0);
    key('Enter');
    await fixture.whenStable();
    expect(host.value).toBe('13');
  });

  it('RTL mirrors chevron and arrow keys', async () => {
    await create((h) => (h.dir = 'rtl'));
    const icon = rows()[0].querySelector('.ngb-select-tree-toggle i') as HTMLElement;
    expect(icon.classList).toContain('bi-chevron-left');
    expect(icon.classList).not.toContain('bi-chevron-right');
    select.openOverlay();
    fixture.detectChanges();
    select.focusedIndex.set(0);
    key('ArrowRight'); // collapse key in RTL: no-op on collapsed root
    expect(codes()).toEqual(['13', '91']);
    key('ArrowLeft'); // expand in RTL
    expect(codes()).toEqual(['13', '13.100', '13.200', '91']);
    key('ArrowRight'); // collapse in RTL
    expect(codes()).toEqual(['13', '91']);
  });
});
