(function(){
	function getProductItem(){
		var _this = _p;
		var html = '<div class="spec-item">' +
			'<div class="clearfix spec-item-head">' +
			'<div class="pull-left spec-item-space">' +
			'<div>' +
			'<select class="form-control j-spec-select" >' +
			'<option value="customer">自定义</option>';
		if(items.length){
			$.each(JSON.parse(items),function(i,v){
				html += '<option value="' + (v.id || '') + '">' + v.name + '</option>'
			});
		}
		html += '</select>' +
			'</div>' +
			'</div>' +
			'<div class="pull-left spec-item-space hide"><div><input class="form-control j-gg-name" type="text" placeholder="请输入规格名称" /></div></div>' +
			'<div class="pull-left spec-item-space"><label><input class="spec-item-checkbox" type="checkbox" name="checkboxsss" > 影响价格</label></div>' +
			'<div class="pull-right spec-item-close"><img src="/res/img/pc/common/close.png" alt="" /></div>' +
			'</div>' +
			'<div class="clearfix spec-item-body">' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'<div class="pull-left spec-item-space"><div><input class="form-control spec-text" type="text" /></div></div>' +
			'</div>' +
			'</div>';
		html = $(html);
		html.find('.spec-item-checkbox').on('change',function(){
			_this.changePrice();
		});
		html.find('.j-spec-select').on('change',function(){
			var $this = $(this),
				text = $this.find(':selected').text(),
				value = $this.find(':selected').val(),
				$changeInputs = $this.closest('.spec-item').find('.spec-text');

			if(text == '自定义'){
				$this.closest('.spec-item-space').next('.spec-item-space').removeClass('hide');
				$changeInputs.val('');
			}else{
				$this.closest('.spec-item-space').next('.spec-item-space').addClass('hide').val('');
				//ajax
				var arr = [];
				$.ajax({
					url: '/boss/goods/getItem',
					data: {
						guigeId : value
					},
					success: function (data) {
						arr = data.data.list;
						$changeInputs.each(function(i,v){
							if(arr[i]){
								this.value = arr[i];
							}else{
								this.value = '';
							}
						});
					}
				});
			}
		}).trigger('change');
		html.find('.spec-text').on('input propertychange',function(){
			html.find('.spec-item-checkbox').trigger('change');
		});
		html.find('.j-gg-name').on('input propertychange',function(){
			html.find('.spec-item-checkbox').trigger('change');
		});
		$addprocon.append(html);
	}
	var $addprobtn = $('#j_addProduct'),
		$addprocon = $('#j_addProductContainer'),
		$thead = $('#j_thead'),
		$tbody = $('#j_tbody'),
		$addpaccon = $('#j_addPacketContainer'),
		$modal = $('#j_packageModal'),
		$changeType = $('#change-goods-type'),
		$guigeCon = $('.zsg-goods-guige-con'),
		$guigeAdd = $('.zsg-goods-guige-add'),
		$pakageCon = $('.zsg-goods-pakage-con'),
		$pakageAdd = $('.zsg-goods-pakage-add'),
		$selectedVal = $changeType.val();

	var _p = {
		init : function(){
			this.bind();
			this.setSel();
			this.setSub();
		},
		setSub : function () {
			var $form = $('#j_subForm'),
				$saveButton = $('#save-goods-button'),
				_this = this,
				callback = function(){
					$('input[name="file"]').prop("disabled",true);
					//$saveButton.hide();
					var data = {};
					if($selectedVal == 3){
						data = {
							list : JSON.stringify(_this.getUpJson())
						};
					}else{
						data = {
							guige : JSON.stringify(_this.getSpecJson()),
							effectPrice : JSON.stringify(_this.getImpactPriceJson())
						}
					}
					data.selectedval = $selectedVal;
					$form.ajaxSubmit({
						dataType : 'json',
						data : data,
						success : function(json){
							$('input[name="file"]').prop("disabled",false);
							if(json.code == 200){
								$.messager.popup('操作成功！');
								window.location.href = json.data.url;
							}else {
									$.messager.popup(json.msg||"操作失败！");
								//$saveButton.show();
							}
						}
					});
				};
			$form.validate({
				errorPlacement : function(error,element){
					var $pali = element.closest('.content-item'),
						$errP = $pali.find('.help-block');
					$pali.addClass('has-error');
					$errP.addClass('text-danger').empty().html( error.html() );
				},
				onfocusout : function(element){
					$(element).valid();
				},
				submitHandler : function(form){
					callback();
					return false;
				}
			});
			$form.on('change','[type="radio"],[type="checkbox"]',function(){
				$(this).closest('.content-item').removeClass('has-error').find('.help-block').removeClass('text-danger');
			});
			$form.on('focus','[type="text"],textarea',function(){
				$(this).closest('.content-item').removeClass('has-error').find('.help-block').removeClass('text-danger');
			});
		},
		setSel : function(){
			var _this = this,
				$category = $('#change-category'),
				$storeId = $('#storeId'),
				$con = $('#j_addProductContainer');
			$category.on('change',function(){//变更门店
				$.ajax({
					url: '/boss/goods/getGuige',
					data: {
						storeId : $storeId.val(),
						categoryId : $category.val()
					},
					success: function (data) {
						$con.html(data);
						$con.find('.spec-item-checkbox').on('change',function(){
							_this.changePrice();
						});
					}
				});
			});
		},
		getNormalTh : function(list){
			var str = '<tr>';
			for(var i = 0;i < list.length;i++){
				str += '<td>' + list[i] + '</td>';
			}
			str += '<td>售价</td><td>库存</td></tr>';
			return str;
		},
		getOtr : function(list,idx){
			var _this = this,
				arr = [],
				len = 0,
				lens = [],
				num = 1,
				i = 0,
				j = 0,
				m = 0,
				spans = 1;
			for(i = 0;i < list.length;i++){
				if(list[i].length){
					lens.push(list[i].length);
					num *= lens[i];
				}
			}
			for(i = 0;i < num;i++){
				arr.push('<tr><td><input class="form-control j-spec-price" type="text" value="0" /></td><td><input class="form-control j-spec-stock" type="text" value="0" /></td></tr>');
			}
			$tbody.html(arr.join(''));
			var $trs = $tbody.find('tr'),star = 0;
			for(i = list.length - 1;i >= 0;i--){
				len = list[i].length;
				star = 0;
				if(len){
					for(j = 0;j < (num/spans);j++){
						$trs.eq(j*spans).prepend('<td rowspan="' + spans + '">' + list[i][star] + '</td>');
						star < len - 1 ? star++ : star = 0;
					}
					spans *= list[i].length;
				}
			}
		},
		changePrice : function(){
			var _this = this,
				$chs = $addprocon.find('.spec-item-checkbox:checked'),
				list = [],
				idx = 0,
				thead = [];
			$chs.each(function(){
				var $fa = $(this).closest('.spec-item'),
					$ins = $fa.find('.spec-text'),
					$sel = $fa.find('.j-spec-select'),
					$opt = $sel.find('option:checked'),
					hidetxt = $fa.find('.j-gg-name').val(),
					txt = ($opt.text() != '自定义' ? $opt.text() : hidetxt),
					arr = [],
					arr_idx = 0;
				$ins.each(function(i,v){
					if(v.value){
						arr.push(v.value);
						arr_idx += 1;
					}
				});
				if(arr_idx){
					thead.push(txt);
					list.push(arr);
				}
			});
			if(thead.length){
				$thead.html(this.getNormalTh(thead));
				this.getOtr(list);
			}else{
				$thead.empty();
				$tbody.empty();
			}
		},
		getSpecJson : function(){
			var arr = [];
			$addprocon.find('.spec-item').each(function(){
				var $this = $(this),
					$sel = $this.find('.j-spec-select'),
					$ins = $this.find('.spec-text'),
					$opt = $sel.find('option:checked'),
					hidetxt = $this.find('.j-gg-name').val() || '',
					guigeId = $opt.val() || '',
					txt = ($opt.text() != '自定义' ? $opt.text() : hidetxt),
					impactprice = $this.find('.spec-item-checkbox').prop('checked'),
					opt = {
						title : txt,
						guigeId : guigeId,
						impactprice : impactprice,
						list : []
					};
				$ins.each(function(){
					if(this.value){
						opt.list.push(this.value);
					}
				});
				arr.push(opt);
			});
			return arr;
		},
		getImpactPriceJson : function(){
			var arr = [];
			$tbody.find('tr').each(function(){
				var $this = $(this),
					price = parseFloat($this.find('.j-spec-price').val()) || 0,
					stock = parseInt($this.find('.j-spec-stock').val()) || 0;
					arr.push({
					price : price,
					stock : stock
				});

			});
			return arr;
		},
		bind : function(){
			var _this = this;
			$changeType.on('change',function(){
				$selectedVal = $changeType.val()
				if('3' == $selectedVal) {
					$pakageCon.removeClass('hide');
					$pakageAdd.removeClass('hide');
					$('#shangpin-con').removeClass('hide');
					$guigeCon.addClass('hide');
					$guigeAdd.addClass('hide');
					$('#guige-con').addClass('hide');
					$thead.addClass('hide');
					$tbody.addClass('hide');
				}else {
					$guigeCon.removeClass('hide')
					$guigeAdd.removeClass('hide')
					$('#guige-con').removeClass('hide');
					$pakageCon.addClass('hide');
					$pakageAdd.addClass('hide');
					$('#shangpin-con').addClass('hide');
				}
			});
			$addpaccon.on('click','.spec-item-close',function(){
				$(this).closest('.spec-item').remove();
			});
			$addprobtn.on('click',function(){
				getProductItem()
			});
			$addprocon.find('.j-spec-select').on('change',function(){
				var $this = $(this),
					text = $this.find(':selected').text(),
					value = $this.find(':selected').val(),
					$changeInputs = $this.closest('.spec-item').find('.spec-text');;
				if(text == '自定义'){
					$this.closest('.spec-item-space').next('.spec-item-space').removeClass('hide');
					$addprocon.find('.spec-item-checkbox').trigger('change');
				}else {
					$this.closest('.spec-item-space').next('.spec-item-space').addClass('hide').val('');
					//ajax
					var arr = [];
					$.ajax({
						url: '/boss/goods/getItem',
						data: {
							guigeId : value
						},
						success: function (data) {
							arr = data.data.list;
							$changeInputs.each(function(i,v){
								if(arr[i]){
									this.value = arr[i];
								}else{
									this.value = '';
								}
							});
							$addprocon.find('.spec-item-checkbox').trigger('change');
						}
					});
				}
			});
			$addprocon.find('.spec-item-checkbox').on('change',function(){
				_this.changePrice();
			}).trigger('change');
			$addprocon.find('.spec-text').on('input propertychange',function(){
				$addprocon.find('.spec-item-checkbox').trigger('change');
			});
			$addprocon.find('.j-gg-name').on('input propertychange',function(){
				$addprocon.find('.spec-item-checkbox').trigger('change');
			});
			if(prices.length){
				var $preprices = $tbody.find('.j-spec-price');
				if($preprices.length > 0) {
					$.each(JSON.parse(prices),function(i,v){
						$preprices[i].value = v;
					});
				}
			}
			$addprocon.on('click','.spec-item-close',function(){
				var $this = $(this),
					$par = $this.closest('.spec-item'),
					$check = $par.find('.spec-item-checkbox'),
					bFlag = $check.prop('checked');
				$par.remove();
				if(bFlag){
					_this.changePrice();
				}
			});
			$modal.on('click','.list-group-item',function(){
				var $this = $(this),
					id = $this.data('id'),
					txt = $this.text();
				//此处应有ajax  下面内容是ajax回调中执行
				$.ajax({
					url: '/boss/goods/getGoodsDetail',
					data: {
						goodsId : id
					},
					dataType : 'json',
					type : 'get',
					success: function (data) {
						_this.addItem(data.data.data);
						$modal.modal('hide');
					}
				});
			});
		},
		getUpJson : function(){
			var list = [];
			$addpaccon.find('.spec-item').each(function(){
				var $this = $(this),
					$labels = $this.find('.content-item-label'),
					opt = {
						goodsName : $this.data('name'),
						goodsId : $this.data('id'),
						goodsPrice : $this.find('.spec-item-price').val(),
						guiges : []
					};
				$labels.each(function(){
					var $that = $(this),
						$checks = $that.find(':checked');
						id = $that.data('id'),
						name = $that.data('name'),
						obj = {
							guigeId : id,
							guigeName : name,
							items : []
						};
					$checks.each(function(){
						var $item = $(this);
						obj.items.push({
							itemId : $item.val(),
							itemName : $item.data('name')
						});
					});
					opt.guiges.push(obj);
				});
				list.push(opt);
			});
			return list;
		},
		addItem : function(opt){
			$addpaccon.append(this.getProductItem(opt));
		},
		getGuigeLabel : function(list){
			var str = '';
			for(var i = 0;i < list.length;i++){
				str += '<label><input type="checkbox" value="' + list[i].itemId + '" data-name="' + list[i].itemName + '"> ' + list[i].itemName + '</label>&nbsp;&nbsp;&nbsp;';
			}
			return str;
		},
		getguigeList : function(list){
			var _this = this,
				str = '';
			for(var i = 0;i < list.length;i++){
				str += '<li data-id="' + list[i].guigeId + '" data-name="' + list[i].guigeName + '" class="content-item content-item-label">\
					<span class="content-item-title hyphenate">' + list[i].guigeName + '</span>\
					<div class="content-item-main">' + _this.getGuigeLabel(list[i].itemList) + '</div>\
					<p class="help-block"></p>\
				</li>';
			}
			return str;
		},
		getProductItem : function(opt){
			var _this = this;
			return ['<div data-id="' + opt.goodsId + '" data-name="' + opt.goodsName + '" class="spec-item">',
				'<div class="clearfix spec-item-head">',
				'<h5 class="pull-left spec-item-head-title">' + opt.goodsName + '</h5>',
				'<div class="pull-right spec-item-close"><img src="/res/img/pc/common/close.png" alt=""></div>',
				'</div>',
				'<div class="clearfix spec-item-body">',
				'<ul class="list-unstyled">',
				'<li class="content-item">',
				'<span class="content-item-title hyphenate">入账价格</span>',
				'<div class="content-item-main">',
				'<input type="text" name="name1" class="form-control spec-item-price" placeholder="请输入名称"> 元',
				'</div>',
				'<p class="help-block"></p>',
				'</li>',
				_this.getguigeList(opt.list),
				'</ul>',
				'</div>',
				'</div>'].join('');
		}
	};

	$(function(){
		_p.init();
		window._create_package_js = _p;
	});
})();