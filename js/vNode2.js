//VNode里的this指向VNode本身
var VNode = {
	init: function(tagName, props, children) {
		return {
			tagName: tagName || 'div',
			props: props || [],
			children: children || []
		}
	},
	setAttr: function(node, key, value) {
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
	},
	render: function(options) {
		//创建el
		var el = document.createElement(options.tagName);

		//设置属性
		for(var propName in options.props) {
			this.setAttr(el, propName, options.props[propName]);
		}
		let _this = this;
		//递归创建子节点
		options.children.forEach((child) => {
			var childNode = (child instanceof Object) ? _this.render(child) : document.createTextNode(child);
			el.appendChild(childNode);
		});

		return el;
	}
}

var vNode1 = VNode.init('div', {
	'id': 'container'
}, [
	VNode.init('h1', {
		style: 'color:red'
	}, ['vdom与html相互转换']),
	VNode.init('p', {}, ['hello vdom and html']),
	VNode.init('ul', {}, [VNode.init('li', {}, ['item #1']), VNode.init('li', {}, ['item #2'])]),
])

var rootNode = VNode.render(vNode1);
document.body.appendChild(rootNode);