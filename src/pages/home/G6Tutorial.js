import React, { useEffect } from "react";
import G6 from "@antv/g6";

import { data } from "./dataG6";

const Util = G6.Util;

function G6Tutorial(params) {
    useEffect(() => {
        // 图画布的定义
        const graph = new G6.Graph({
            container: "mountNode",
            width: 500,
            height: 500,
            modes: {
                // 支持的 behavior
                default: ["drag-node", "click-select", "drag-canvas"]
            }
        });

        // 将 read 方法分解成 data() 和 render 方法，便于整个生命周期的管理
        graph.data(data);
        graph.render();

        // 监听事件，变化不大
        graph.on("node:click", ev => {
            var shape = ev.target;
            var node = ev.item;
            console.log(ev, node.get("keyShape"));
            graph.setItemState(node, "selected", !node.hasState("selected")); // 切换选中
        });
        graph.on("node:mouseenter", ev => {
            //var node = ev.item;
        });
        // 鼠标移动到上面 running，移出结束
        graph.on("node:mouseenter", ev => {
            const node = ev.item;
            graph.setItemState(node, "running", true);
        });
        graph.on("node:mouseleave", ev => {
            const node = ev.item;
            graph.setItemState(node, "running", false);
        });
    }, []);
    return <div id="mountNode" style={{ border: "1px solid #ddd" }} />;
}

export default G6Tutorial;
