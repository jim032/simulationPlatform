var line1 = '',line2 = '',line3 = '', x1_1 = '',x2_1 = '',x3_1 = '',x22_1 = '',x22_2 = '',x22_3 = '',x33_1 = '',x33_2 = '',x33_3 = '';

var length=null,frames=null, chart=null;
var length1=null,frames1=null, chart1=null;
var length2=null,frames2=null, chart2=null;
var rid = null,rid1 = null,rid2 = null;
var angle= 0,angle1=0 ,angle2= 0;




export default {
	//添加划线点
		addPointLine(num,boxWidth,pointLine,lineList) {
			let that = this;
			let length = pointLine.length
			//首先判断是否是第一个是否需要划线
			switch(parseInt(num)) {
				case 1:
					pointLine.push({ x: 2, y: 40, num: 1 })
					if(length != 0) {
						lineation(pointLine[length - 1].x, pointLine[length - 1].y, 2, 40, pointLine[length - 1].num, 1,pointLine,lineList)
					}
					break;
				case 2:
					pointLine.push({ x: (boxWidth * 0.3333).toFixed(2), y: 40, num: 2 })
					if(length != 0) {
						lineation(pointLine[length - 1].x, pointLine[length - 1].y, (boxWidth * 0.3333).toFixed(2), 40, pointLine[length - 1].num, 2,pointLine,lineList)
					}
					break;
				case 3:
					pointLine.push({ x: (boxWidth * 0.6666).toFixed(2), y: 40, num: 3 })
					if(length != 0) {
						lineation(pointLine[length - 1].x, pointLine[length - 1].y, (boxWidth * 0.6666).toFixed(2), 40, pointLine[length - 1].num, 3,pointLine,lineList)
					}
					break;
				case 4:
					pointLine.push({ x: boxWidth - 2, y: 40, num: 4 })
					if(length != 0) {
						lineation(pointLine[length - 1].x, pointLine[length - 1].y, boxWidth - 2, 40, pointLine[length - 1].num, 4,pointLine,lineList)
					}
					break;

			}
		},
	
	//节点已加入网络划线自适应
	nodeLineAuto(x1,x2,x3,x4,pointLine,lineList,length){
		let lines = ""
		var polyline = document.getElementById("lineBox");

		for(var i = 0; i < length; i++) {
			if(lineList[i].start == 1) {
				if(lineList[i].end == 2) {
					if(i == 0) {
						lines = x1 + " " + 40 + "," + x1 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + 40
					} else {
						lines = x1 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x2, y: 40, num: 2 })

				} else if(lineList[i].end == 3) {
					if(i == 0) {
						lines = x1 + " " + 40 + "," + x1 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					} else {
						lines = x1 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x3, y: 40, num: 3 })

				} else {
					if(i == 0) {
						lines = x1 + " " + 40 + "," + x1 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					} else {
						lines = x1 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x4, y: 40, num: 4 })
				}
			} else if(lineList[i].start == 2) {
				if(lineList[i].end == 1) {
					if(i == 0) {
						lines = x2 + " " + 40 + "," + x2 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					} else {
						lines = x2 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x1, y: 40, num: 1 })

				} else if(lineList[i].end == 3) {
					if(i == 0) {
						lines = x2 + " " + 40 + "," + x2 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					} else {
						lines = x2 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x3, y: 40, num: 3 })

				} else {
					if(i == 0) {
						lines = x2 + " " + 40 + "," + x2 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					} else {
						lines = x2 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x4, y: 40, num: 4 })
				}
			} else if(lineList[i].start == 3) {
				if(lineList[i].end == 1) {
					if(i == 0) {
						lines = x3 + " " + 40 + "," + x3 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					} else {
						lines = x3 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x1, y: 40, num: 1 })

				} else if(lineList[i].end == 2) {
					if(i == 0) {
						lines = x3 + " " + 40 + "," + x3 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					} else {
						lines = x3 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x2, y: 40, num: 2 })

				} else {
					if(i == 0) {
						lines = x3 + " " + 40 + "," + x3 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					} else {
						lines = x3 + " " + 2 + "," + x4 + " " + 2 + "," + x4 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x4, y: 40, num: 4 })
				}
			} else if(lineList[i].start == 4) {
				if(lineList[i].end == 1) {
					if(i == 0) {
						lines = x4 + " " + 40 + "," + x4 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					} else {
						lines = x4 + " " + 2 + "," + x1 + " " + 2 + "," + x1 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x1, y: 40, num: 1 })

				} else if(lineList[i].end == 2) {
					if(i == 0) {
						lines = x4 + " " + 40 + "," + x4 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + 40
					} else {
						lines = x4 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x2, y: 40, num: 2 })

				} else {
					if(i == 0) {
						lines = x4 + " " + 40 + "," + x4 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					} else {
						lines = x4 + " " + 2 + "," + x3 + " " + 2 + "," + x3 + " " + 40
					}
					pointLine.splice(i + 1, 1, { x: x3, y: 40, num: 3 })
				}

			}
			lineList[i].points = lines
			polyline.childNodes[i].setAttribute('points', lines);		
		}
		
	},

	//获胜广播节点划线
	broadCastLine(num, width) {
		var mysvg = document.getElementById("b_line");
		
   chart = document.getElementById("chart")
   chart1 = document.getElementById("chart1")
	 chart2 = document.getElementById("chart2")
		//var rectObj1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
		//var rectObj2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
		//var rectObj3 = document.createElementNS("http://www.w3.org/2000/svg", "path");

    lineParems(num,width);
		//'310'

		if(chart) {
      //rectObj1.setAttribute("marker-end", 'url(#arrow)');
			chart.setAttribute("d", line1);
			chart1.setAttribute("d", line2);
			chart2.setAttribute("d", line3);

		  length = chart.getTotalLength();
      frames = length;
			
			length1 = chart1.getTotalLength();
      frames1 = length1;
      
      length2 = chart2.getTotalLength();
      frames2 = length2;
		  /*
			mysvg.appendChild(rectObj1);
			mysvg.appendChild(rectObj2);
			mysvg.appendChild(rectObj3);
			*/
			//IE代码
			if(!!window.ActiveXObject || "ActiveXObject" in window) {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
				var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
				if(isIE11){
					Frame();
				  Frame1();
				  Frame2();
				  
				}else{
				  chart.setAttribute("class", 'g-rect-IE1');
				  chart1.setAttribute("class", 'g-rect-IE1');
				  chart2.setAttribute("class", 'g-rect-IE1');

				  chart.setAttribute("marker-end",'url(#markerArrow)')
				  chart1.setAttribute("marker-end",'url(#markerArrow)')
				  chart2.setAttribute("marker-end",'url(#markerArrow)')
				}
			
			} else {
				Frame();
				Frame1();
				Frame2();
				/*
				rectObj1.setAttribute("class", 'g-rect-fill1');
				rectObj2.setAttribute("class", 'g-rect-fill1');
				rectObj3.setAttribute("class", 'g-rect-fill1');
				*/
			}
		}
	},
  //获胜节点广播已经画好的线自适应
 
	broadAuto(num, width) {
		var polyline = document.getElementById("b_line");
    lineParems(num,width);
		chart.setAttribute('d', line1);
		chart1.setAttribute('d', line2);
	  chart2.setAttribute('d', line3);
	  length = chart.getTotalLength();
	  length1 = chart1.getTotalLength();
	  length2 = chart2.getTotalLength();
	  chart.style.strokeDasharray = length+10;
	  chart1.style.strokeDasharray = length1+10;
	  chart2.style.strokeDasharray = length2+10;

	}

}


//划线动画效果
function Frame() {
 window.clearInterval(rid);
  arrow.style.display = "block"

  chart.style.strokeDasharray = length+10;
  chart.style.strokeDashoffset = length;
  let point1, point2; 
  rid = setInterval(Frame,100);
  chart.style.strokeDashoffset = frames;
  point1 = chart.getPointAtLength(length - frames);
  point2 = chart.getPointAtLength((length - frames + 2) % length);
  angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  arrow.setAttribute(
    "transform",
    "translate(" +
      [point1.x, point1.y+1] +
      ")" +
      "rotate(" +
      angle * 180 / Math.PI +
      ")"
  );
  frames-=20;
  if (frames <= 0) {
   window.clearInterval(rid);
   arrow.style.display = "none"
   chart.setAttribute("marker-end",'url(#markerArrow)')
   rid = null;
  }
}

function Frame1() {
  window.clearInterval(rid1);
  arrow1.style.display = "block"
  chart1.style.strokeDasharray = length1+10;
  chart1.style.strokeDashoffset = length1;
  let point1, point2; 
  rid1 = setInterval(Frame1,100);
  chart1.style.strokeDashoffset = frames1;
  point1 = chart1.getPointAtLength(length1 - frames1);
  point2 = chart1.getPointAtLength((length1 - frames1 + 2) % length1);
  angle1 = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  arrow1.setAttribute(
    "transform",
    "translate(" +
      [point1.x, point1.y+1] +
      ")" +
      "rotate(" +
      angle1 * 180 / Math.PI +
      ")"
  );
  frames1-=20;
  if (frames1 <= 2) {
   window.clearInterval(rid1);
   arrow1.style.display = "none"
   chart1.setAttribute("marker-end",'url(#markerArrow)')
    rid1 = null;
  }
}


function Frame2() {
  window.clearInterval(rid2);
  arrow2.style.display = "block"
  chart2.style.strokeDasharray = length2+10;
  chart2.style.strokeDashoffset = length2;
  let point1, point2; 
  rid2 = setInterval(Frame2,100);
  chart2.style.strokeDashoffset = frames2;
  point1 = chart2.getPointAtLength(length2 - frames2);
  point2 = chart2.getPointAtLength((length2 - frames2 + 2) % length2);
  angle2 = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  arrow2.setAttribute(
    "transform",
    "translate(" +
      [point1.x, point1.y+1] +
      ")" +
      "rotate(" +
      angle2 * 180 / Math.PI +
      ")"
  );
  frames2-=20;
  if (frames2 <= 2) {
   
   window.clearInterval(rid2);
   arrow2.style.display = "none"
   chart2.setAttribute("marker-end",'url(#markerArrow)')
    rid2 = null;
  }
}

//根据坐标两个节点划线
function lineation(x1, y1, x2, y2, start, end,pointLine,lineList) {

	let that = this;
	var mysvg = document.getElementById("lineBox");
	var rectObj = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	//判断是否是第一条需要画的线
	let length = pointLine.length
	let lines = '';
	if(length >= 3) {
		lines = x1 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + y2
		lineList.push({ start: start, end: end, points: lines });
	} else {
		lines = x1 + " " + y1 + "," + x1 + " " + 2 + "," + x2 + " " + 2 + "," + x2 + " " + y2
		lineList.push({ start: start, end: end, points: lines });
	}

	if(rectObj) {		
		rectObj.setAttribute("points", lines);
		mysvg.appendChild(rectObj);

		//IE代码
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			rectObj.setAttribute("class", 'g-rect-IE');
		} else {
			rectObj.setAttribute("class", 'g-rect-fill');
		}
	}
}
	


//根据参数div的num设置划线的的参数位置
function lineParems(num, width) {
	switch(parseInt(num)) {
		case 1:
			x1_1 = Math.round(width * 0.13)
			x2_1 = Math.round(width * 0.191)
			x3_1 = Math.round(width * 0.267)
			line1 = 'M 80,195 C ' + x1_1 + ' ,180 ' + x2_1 + ' ,160 ' + x3_1 + ' ,10'
			
			x22_1 = Math.round(width * 0.267)
			x22_2 = Math.round(width * 0.434)
			x22_3 = Math.round(width * 0.532)
			line2 = 'M 80,195 C ' + x22_1 + ' ,170 ' + x22_2 + ' ,195 ' + x22_3 + ' ,10'

			x33_1 = Math.round(width * 0.397)
			x33_2 = Math.round(width * 0.62)
			x33_3 = Math.round(width * 0.795)

			line3 = 'M 80,195 C ' + x33_1 + ' ,195 ' + x33_2 + ' ,195 ' + x33_3 + ' ,10'

			break;
		case 2:
			x1_1 = Math.round(width * 0.2)
			x2_1 = Math.round(width * 0.178)
			x3_1 = Math.round(width * 0.158)
			line1 = 'M ' + Math.round(width * 0.26+2) + ' ,195 C ' + x1_1 + ' ,170 ' + x2_1 + ' ,120 ' + x3_1 + ' ,10'
      

      
			x22_1 = Math.round(width * 0.4)
			x22_2 = Math.round(width * 0.44)
			x22_3 = Math.round(width * 0.532)

			line2 = 'M ' + Math.round(width * 0.26 + 83) + ' ,195 C ' + x22_1 + ' ,180 ' + x22_2 + ' ,180 ' + x22_3 + ' ,10'

			x33_1 = Math.round(width * 0.397)
			x33_2 = Math.round(width * 0.62)
			x33_3 = Math.round(width * 0.795)

			line3 = 'M ' + Math.round(width * 0.26 + 83) + ' ,195 C ' + x33_1 + ' ,195 ' + x33_2 + ' ,195 ' + x33_3 + ' ,10'

			break;
		case 3:

			x1_1 = Math.round(width * 0.2)
			x2_1 = Math.round(width * 0.178)
			x3_1 = Math.round(width * 0.158)
			line1 = 'M ' + Math.round(width * 0.525) + ' ,195 C ' + x1_1 + ' ,170 ' + x2_1 + ' ,120 ' + x3_1 + ' ,10'

			x22_1 = Math.round(width * 0.49)
			x22_2 = Math.round(width * 0.45)
			x22_3 = Math.round(width * 0.414)

			line2 = 'M ' + Math.round(width * 0.525) + ' ,195 C ' + x22_1 + ' ,180 ' + x22_2 + ' ,180 ' + x22_3 + ' ,10'

			x33_1 = Math.round(width * 0.65)
			x33_2 = Math.round(width * 0.73)
			x33_3 = Math.round(width * 0.795)

			line3 = 'M ' + Math.round(width * 0.525 + 81) + ' ,195 C ' + x33_1 + ' ,195 ' + x33_2 + ' ,195 ' + x33_3 + ' ,10'

			break;
		case 4:
			x1_1 = Math.round(width * 0.2)
			x2_1 = Math.round(width * 0.178)
			x3_1 = Math.round(width * 0.158)
			line1 = 'M ' + Math.round(width * 0.79) + ' ,195 C ' + x1_1 + ' ,195 ' + x2_1 + ' ,120 ' + x3_1 + ' ,10'

			x22_1 = Math.round(width * 0.49)
			x22_2 = Math.round(width * 0.45)
			x22_3 = Math.round(width * 0.414)

			line2 = 'M ' + Math.round(width * 0.79) + ' ,195 C ' + x22_1 + ' ,180 ' + x22_2 + ' ,180 ' + x22_3 + ' ,10'

			x33_1 = Math.round(width * 0.74)
			x33_2 = Math.round(width * 0.71)
			x33_3 = Math.round(width * 0.68)

			line3 = 'M ' + Math.round(width * 0.79) + ' ,195 C ' + x33_1 + ' ,180 ' + x33_2 + ' ,160 ' + x33_3 + ' ,10'

			break;
	}
}

