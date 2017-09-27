(function () {

	// 6. 切换月份 (越界进位)
	// 计数器
	var stepMonth = 0;
	var stepYear = 0;

	var nowTimeObj = new Date();
	var showYear = nowTimeObj.getFullYear();
	var showMonth = nowTimeObj.getMonth();

	var datepickerUI = document.querySelector('.datepicker');
	var inputDate = document.getElementById('input-date');

	var isOpen = false;

	// 给不变的元素添加点击事件
	datepickerUI.addEventListener('click', function (e){

		var aim = e.target;
		
		/**
		 * 如果乱点击	
		 * 忽略操作
		 */
		if (!aim.classList.contains('datepicker-btn')) {}
		/**
		 * 如果点到了翻页按钮
		 * 那就翻页喽
		 */
		if (aim.classList.contains('datepicker-btn-prev')) {
			// alert('-');
			stepMonth --;
			doChange(stepMonth, showMonth, showYear);
		} else if (aim.classList.contains('datepicker-btn-next')) {
			// alert('+');
			stepMonth ++;
			doChange(stepMonth, showMonth, showYear);
		}
		/**
		 * 如果点到了日期单元格
		 * 填写日期
		 */
		if (aim.tagName.toLowerCase() == 'td') {
			var dateText = '';
			var index = aim.id;

			// alert(data[index].year);

			dateText += data[index].year + '-';
			dateText += data[index].month + '-';
			dateText += data[index].date;

			inputDate.value = dateText;

			clickDate();
			inputDate.focus();
		}

		
	}, false);


	function doChange(stepMonth, showMonth, showYear) {
		showMonth = showMonth + stepMonth;

		console.log(showYear, showMonth, stepMonth);
		var ctx = datepickerCreate(showYear, showMonth);
		rander(ctx);

	}




	// 8. 打开和关闭组件
	inputDate.onclick = clickDate;

	function clickDate() {
		if (isOpen) {
			datepickerUI.style.display='none';
			isOpen = false;
		} else {
			datepickerUI.style.display='block';
			isOpen = true;

			// 弹出时动态计算位置
			var top    = inputDate.offsetTop;
			var left   = inputDate.offsetLeft;
			var height = inputDate.offsetHeight;

			// 设置弹出位置
			datepickerUI.style.top = top + height + 2 + 'px';
			datepickerUI.style.left = left + "px";
		}
		
	}

})();
