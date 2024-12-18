import * as Comlink from "comlink";
import {EDITORS} from "../../store/editor/init.ts";
import request from "@/util/request.ts";
import type {TreeNode} from "@/components/codeView/api/file/Type.ts";


export function getFileNode(treeNode:TreeNode):Promise<any>{
    return request.post('/virtual-tree/nodes',treeNode);
}


