import G6 from "@antv/g6";
import Group from "antd/lib/input/Group";

export const data = {
    nodes: [
        { x: 50, y: 100, shape: "diamond" }, // 最简单的
        { x: 150, y: 100, shape: "diamond", size: [50, 100] }, // 添加宽高
        { x: 250, y: 100, color: "red", shape: "diamond" }, // 添加颜色
        { x: 350, y: 100, label: "菱形", shape: "diamond" }, // 附加文本
        { x: 350, y: 200, label: "custom", shape: "custom" }, // 附加文本
        { x: 350, y: 300, label: "萝卜投研\n哈哈产品图谱", shape: "rect" }, // 附加文本
    ]
};

G6.registerNode('custom', {
    setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if(name === 'running') {
          if(value) {
            shape.animate({
              r: 20,
              repeat: true
            }, 1000);
          } else {
            shape.stopAnimate();
            shape.attr('r', 10);
          }
        }
      }
  }, 'circle');

G6.registerNode("diamond", {
    draw(cfg, group) {
        const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
        const width = size[0];
        const height = size[1];
        const shape = group.addShape("path", {
            attrs: {
                //  / 1 \
                // 4     2
                //  \ 3 /
                path: [
                    ["M", 0, 0 - height / 2], // 上部顶点
                    ["L", width / 2, 0], // 右侧点
                    ["L", 0, height / 2], // 下部
                    ["L", -width / 2, 0], // 左侧
                    ["Z"] // 封闭
                ],
                stroke: cfg.color // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
            }
        });
        if (cfg.label) {
            // 如果有文本
            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            // style.text = cfg.label;
            group.addShape("text", {
                // attrs: style
                attrs: {
                    x: 0, // 居中
                    y: 0,
                    textAlign: "center",
                    textBaseline: "middle",
                    text: cfg.label,
                    fill: "#666"
                }
            });
        }
        return shape;
    },
    setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if(name === 'selected') {
          if(value) {
            shape.attr('fill', 'red');
          } else {
            shape.attr('fill', 'white');
          }
        }
      }
});
