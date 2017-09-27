/**
 * 为了程序不污染环境，将其封装在函数中
 *
 * 变量说明：
 * 带有 "now" 的变量名表示当前真实日期;
 * 不带 "now" 的变量名表示 UI 显示日期;
 */
(function () {
	
	function datepickerCreate(yearData, monthData) {        //datepickerCreate()开始
		
		// var yearData, monthData;

	 	var nowTimeObj;

		if (!(yearData+1) || !(monthData+1)) {    // 如果传入的参数不存在
			nowTimeObj = new Date();
			// alert("no");
			// console.log('函数传入的参数为：', nowTimeObj.getFullYear(), nowTimeObj.getMonth());
		}
		else {
			nowTimeObj = new Date(yearData, monthData);
			// alert("yes");
			// console.log('函数传入的参数为：', yearData, monthData);
		}

		// 0. 定义数组储存日期
		data = [];

		// 1. 获取时间数据
		var nowYear = nowTimeObj.getFullYear();
		var nowMonth = nowTimeObj.getMonth();
		var nowWeek = nowTimeObj.getDay();
		var nowDate = nowTimeObj.getDate();

		var year;
		var month;
		var week;
		var date;

		// 2. 计算临界日期
		var thisMonthFirstDate = new Date(nowYear, nowMonth, 1);
		var thisMonthFirstDay = thisMonthFirstDate.getDate();    // 当月第一天
		var thisMonthLastDate = new Date(nowYear, nowMonth + 1, 0);
		var thisMonthLastDay = thisMonthLastDate.getDate();    // 当月最后一天
		var lastMonthLastDate = new Date(nowYear, nowMonth, 0);
		var lastMonthLastDay = lastMonthLastDate.getDate();    // 上月最后一天

		// 3. 计算日历上本月一号前要显示的上月日期 (第一天是周日, 0)
		var beforeDays = thisMonthFirstDate.getDay();    // 上月日期数

		// 4. 主体显示
		var dataIndex = 0;
		for (var i = thisMonthFirstDay - beforeDays; i <= 7 * 6 - beforeDays; i++) {    // 显示六周日期
			// 日期调整
			if (i <= 0) {
				month = nowMonth;
				date = lastMonthLastDay + i;
			} else if (i > thisMonthLastDay) {
				month = nowMonth + 2;
				date = i - thisMonthLastDay;
			}else {
				month = nowMonth + 1;
				date = i;
			}
			// 月份/年份调整
			year = nowYear;
			if (month === 0) {
				month = 12;
				year = nowYear - 1;
			}
			if (month === 13) {
				month = 1;
				year = nowYear + 1;
			}

			// 数据储存
			
			// a. 判断是否是本月
			var isThisMonth;
			if (i >=1 && i <= thisMonthLastDay) {
				isThisMonth = true;
			} else {
				isThisMonth = false;
			}

			// b. 判断是否是今天
			var isToday;
			var now = new Date();
			var today = now.getDate();
			var toMonth = now.getMonth();
			if (date == today && month == toMonth + 1) {
				isToday = 'isToday';
			} else {
				isToday = 'isNotToday';
			}

			data.push({
				year: year,
				month: month,
				date: date,
				isThisMonth: isThisMonth,
				isToday: isToday,
				dataIndex: dataIndex
			});

			dataIndex++;
		}

		// 5. 输出到日历
		var html = '';
		var cout = 0;
		var showMonth = nowMonth + 1;

		// 将一位数变成二位数函数
		function toDouble(number) {
			if (number <= 9) {
				number = '0' + number;
			}
			return number;
		}


		html += '<div class="datepicker-header">' +
				'<span id="datepicker-btn-prev" class="datepicker-btn datepicker-btn-prev">&lt;</span>' +
				'<span id="datepicker-month" class="datepicker-month">' + nowYear + ' - ' + toDouble(showMonth) + '</span>' +
				'<span id="datepicker-btn-next" class="datepicker-btn datepicker-btn-next">&gt;</span>' +
			'</div>' +
			'<div class="datepicker-content">' +
				'<table class="datepicker-calender">' +
					'<thead>' +
						'<th>日</th>' +
						'<th>一</th>' +
						'<th>二</th>' +
						'<th>三</th>' +
						'<th>四</th>' +
						'<th>五</th>' +
						'<th>六</th>' +
					'</thead>' +
					'<tbody>';

		for (var i = 0; i < 6; i++) {
			html += '<tr>'
			for (var j = 0; j < 7; j++) {
				// 附加数组下标作为ID，表示本月的类名，表示今天的类名
				html += '<td id="' + data[cout].dataIndex + '"' + ' class="' + data[cout].isThisMonth + ' ' + data[cout].isToday +'">' + 
							data[cout].date + 
						'</td>';
				cout++;
			}
			html += '</tr>';
		}

		html += '</tbody>' +
				'</table>' +
			'</div>';

		return html;



	}    //datepickerCreate()结束

	/**
	 * 渲染函数
	 */

// <div id="datepicker" class="datepicker"></div>
	var wrapper = document.createElement('div');
	wrapper.className = 'datepicker';
	document.body.appendChild(wrapper);

	function rander (ctx) {
		wrapper.innerHTML = ctx;
	}

	window.rander = rander;
	window.datepickerCreate = datepickerCreate;

})();