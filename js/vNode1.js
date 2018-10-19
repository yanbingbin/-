! function(x) {
	function VNode(tagName, props, children) {
		this.tagName = tagName;
		this.props = props;
		this.children = children;
		if(typeof VNode.render == "undefined") {
			VNode.prototype.render = function() {
				//创建el
				var el = document.createElement(this.tagName);

				//设置属性
				for(var propName in this.props) {
					this.setAttr(el, propName, this.props[propName]);
				}

				//递归创建子节点
				this.children.forEach((child) => {
					var childNode = (child instanceof VNode) ? child.render() : document.createTextNode(child);
					el.appendChild(childNode);
				});

				return el;
			}
			VNode.render = true;
		}

		if(typeof VNode.setAttr == "undefined") {
			VNode.prototype.setAttr = function(node,key,value) {
				switch(key) {
					case 'style':
						node.style.cssText = value;
						break;
					case 'value':
						var tagName = node.tagName || ''
						tagName = tagName.toLowerCase()
						if(tagName === 'input' || tagName === 'textarea') {
							node.value = value
						} else {
							node.setAttribute(key, value)
						}
						break
					default:
						node.setAttribute(key, value)
						break
				}
			}
			VNode.setAttr = true;
		}
	}
	x.VNode = VNode;
}(window);

var vNode1 = new VNode('div', {
	'id': 'container'
}, [
	new VNode('h1', {
		style: 'color:red'
	}, ['vdom与html相互转换']),
	new VNode('p', {}, ['hello vdom and html']),
	new VNode('ul', {}, [new VNode('li', {}, ['item #1']), new VNode('li', {}, ['item #2'])]),
])

var rootNode = vNode1.render();
document.body.appendChild(rootNode);