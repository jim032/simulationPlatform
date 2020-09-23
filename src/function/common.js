/*计算两个坐标的方法*/
export default {
	distance(x1, y1, x2, y2) {
		return Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)))
	},

	/*获取最小值的下标*/
	getMinIndex(arr) {
		var obj = {}
		var min = arr[0].distance;
		for(var i = 0; i < arr.length; i++) {
			if(min >= arr[i].distance) {
				min = arr[i].distance;
				obj.index = i;
				obj.point = arr[i].point
				obj.num = arr[i].num
				obj.div = arr[i].div
			}
		}
		return obj;
	},

	//清除坐标数组中的值
	clear(div, arr) {
		let that = this;
		let index = 0;
		for(var i = 0; i < arr.length; i++) {
			if(div == arr[i].div) {
				index = i;
				break;
			}
		}
		arr.splice(index, 4);
	},

	//初始化四个div的坐标当前坐标数组localArray
	initPointInfo(top, p1, p2, p3, p4, scrollTop, localArray) {
		let localtmp = localArray;
		if(localtmp.length == 0) {
			localtmp = [];
			localtmp.push({x: Math.round(p1.left),y: Math.round((p1.top) + scrollTop + top),num: 1,div: 1})
			localtmp.push({x: Math.round(p1.right),y: Math.round((p1.top) + scrollTop + top),num: 2,div: 1})
			localtmp.push({x: Math.round(p1.right),y: Math.round((p1.bottom) + scrollTop + top),num: 3,div: 1})
			localtmp.push({x: Math.round(p1.left),y: Math.round((p1.bottom) + scrollTop + top),num: 4,div: 1})
			
			localtmp.push({x: Math.round(p2.left),y: Math.round((p2.top) + scrollTop + top),num: 1,div: 2})
			localtmp.push({x: Math.round(p2.right),y: Math.round((p2.top) + scrollTop + top),num: 2,div: 2})
			localtmp.push({x: Math.round(p2.right),y: Math.round((p2.bottom) + scrollTop + top),num: 3,div: 2})
			localtmp.push({x: Math.round(p2.left),y: Math.round((p2.bottom) + scrollTop + top),num: 4,div: 2})
			
			localtmp.push({x: Math.round(p3.left),y: Math.round((p3.top) + scrollTop + top),num: 1,div: 3})
			localtmp.push({x: Math.round(p3.right),y: Math.round((p3.top) + scrollTop + top),num: 2,div: 3})
			localtmp.push({x: Math.round(p3.right),y: Math.round((p3.bottom) + scrollTop + top),num: 3,div: 3})
			localtmp.push({ x: Math.round(p3.left), y: Math.round((p3.bottom) + scrollTop + top), num: 4, div: 3 })

			localtmp.push({ x: Math.round(p4.left), y: Math.round((p4.top) + scrollTop + top), num: 1, div: 4 })
			localtmp.push({ x: Math.round(p4.right), y: Math.round((p4.top) + scrollTop + top), num: 2, div: 4 })
			localtmp.push({ x: Math.round(p4.right), y: Math.round((p4.bottom) + scrollTop + top), num: 3, div: 4 })
			localtmp.push({ x: Math.round(p4.left), y: Math.round((p4.bottom) + scrollTop + top), num: 4, div: 4 })

		} 
		else {
			let tmp = localtmp;
			for(let i = 0; i < tmp.length; i++) {
				if(tmp[i].div == '1' && tmp[i].num == 1) {
					tmp.splice(i, 1, { x: Math.round(p1.left), y: Math.round(p1.top + scrollTop), num: 1, div: 1 })
				} else if(tmp[i].div == '1' && tmp[i].num == 2) {
					tmp.splice(i, 1, { x: Math.round(p1.right), y: Math.round(p1.top + scrollTop), num: 2, div: 1 })
				} else if(tmp[i].div == '1' && tmp[i].num == 3) {
					tmp.splice(i, 1, { x: Math.round(p1.right), y: Math.round(p1.bottom + scrollTop), num: 3, div: 1 })
				} else if(tmp[i].div == '1' && tmp[i].num == 4) {
					tmp.splice(i, 1, { x: Math.round(p1.left), y: Math.round(p1.bottom + scrollTop), num: 4, div: 1 })
				} else if(tmp[i].div == '2' && tmp[i].num == 1) {
					tmp.splice(i, 1, { x: Math.round(p2.left), y: Math.round(p2.top + scrollTop), num: 1, div: 2 })
				} else if(tmp[i].div == '2' && tmp[i].num == 2) {
					tmp.splice(i, 1, { x: Math.round(p2.right), y: Math.round(p2.top + scrollTop), num: 2, div: 2 })
				} else if(tmp[i].div == '2' && tmp[i].num == 3) {
					tmp.splice(i, 1, { x: Math.round(p2.right), y: Math.round(p2.bottom + scrollTop), num: 3, div: 2 })
				} else if(tmp[i].div == '2' && tmp[i].num == 4) {
					tmp.splice(i, 1, { x: Math.round(p2.left), y: Math.round(p2.bottom + scrollTop), num: 4, div: 2 })
				} else if(tmp[i].div == '3' && tmp[i].num == 1) {
					tmp.splice(i, 1, { x: Math.round(p3.left), y: Math.round(p3.top + scrollTop), num: 1, div: 3 })
				} else if(tmp[i].div == '3' && tmp[i].num == 2) {
					tmp.splice(i, 1, { x: Math.round(p3.right), y: Math.round(p3.top + scrollTop), num: 2, div: 3 })
				} else if(tmp[i].div == '3' && tmp[i].num == 3) {
					tmp.splice(i, 1, { x: Math.round(p3.right), y: Math.round(p3.bottom + scrollTop), num: 3, div: 3 })
				} else if(tmp[i].div == '3' && tmp[i].num == 4) {
					tmp.splice(i, 1, { x: Math.round(p3.left), y: Math.round(p3.bottom + scrollTop), num: 4, div: 3 })
				} else if(tmp[i].div == '4' && tmp[i].num == 1) {
					tmp.splice(i, 1, { x: Math.round(p4.left), y: Math.round(p4.top + scrollTop), num: 1, div: 4 })
				} else if(tmp[i].div == '4' && tmp[i].num == 2) {
					tmp.splice(i, 1, { x: Math.round(p4.right), y: Math.round(p4.top + scrollTop), num: 2, div: 4 })
				} else if(tmp[i].div == '4' && tmp[i].num == 3) {
					tmp.splice(i, 1, { x: Math.round(p4.right), y: Math.round(p4.bottom + scrollTop), num: 3, div: 4 })
				} else if(tmp[i].div == '4' && tmp[i].num == 4) {
					tmp.splice(i, 1, { x: Math.round(p4.left), y: Math.round(p4.bottom + scrollTop), num: 4, div: 4 })
				}
			}
			localtmp = tmp
		}
		return localtmp;
	}

}