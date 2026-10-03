import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { NodeService } from '@/app/pages/service/node.service';

@Component({
    selector: 'app-tree-demo',
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule],
    templateUrl: './treedemo.html',
    styleUrl: './treedemo.scss',
    providers: [NodeService]
})
export class TreeDemo implements OnInit {
    nodeService = inject(NodeService);

    readonly treeValue = signal<TreeNode[]>([]);

    readonly treeTableValue = signal<TreeNode[]>([]);

    selectedTreeValue: TreeNode[] = [];

    selectedTreeTableValue = {};

    cols: any[] = [];

    ngOnInit() {
        this.nodeService.getFiles().then((files) => this.treeValue.set(files));
        this.nodeService.getTreeTableNodes().then((files: any) => this.treeTableValue.set(files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        // Pre-check the first tree table node
        this.selectedTreeTableValue = {
            '0-0': {
                partialChecked: false,
                checked: true
            }
        };
    }
}
