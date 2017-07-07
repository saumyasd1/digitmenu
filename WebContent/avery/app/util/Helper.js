Ext.define('AOC.util.Helper',{
    singleton : true,
    alternateClassName:['Helper'],
    config : {
        mainContainerTip : null
    },
    constructor : function(config){
		var ordderColorMap =new Ext.util.HashMap();
		ordderColorMap.add('Received','#ED2691');
		ordderColorMap.add('Waiting CS Review','#FFC500');
		ordderColorMap.add('Waiting System Response','#25B3EE');
		ordderColorMap.add('Successful','#09CF86');
		ordderColorMap.add('Failed','#FF0000');
		
		this.orderColorMap = ordderColorMap;
    },
	getSwitchButtonHtml: function(event, status, cssClass){
		var switchBorder='',
		circlePadding;
		if('on' == status){
		  circlePadding = '16px';
		}else{
		  switchBorder = 'style="border:1px solid #bcbcbc;"';
		  circlePadding = '0px';
		}
		var leftStyle = !Ext.isEmpty(cssClass)?'style="top:1px;"':'';
		cssClass = Ext.isEmpty(cssClass)?'':cssClass;
		
		var html = '<span class="text-style-switch'+cssClass+'">';
		//#AC-3110 Change the literal for off text.
		html +='<span class="onoff-text'+cssClass+'"><b>'+'InActive'+'</b></span>';
		html +='<div '+leftStyle+' event="'+event+'" class="onoffswitch">';
		html +='<label event="'+event+'"'+switchBorder+'  class="onoffswitch-label">';
		html +='<span event="'+event+'" class="onoffswitch-inner-'+status+'"></span>';
		html +='<span event="'+event+'" style="left:'+circlePadding+';" class="onoffswitch-switch"></span>';
		html +='</label>';
		html+='</div>';
		html +='<span class="on-text'+cssClass+'">'+'<b>Active'+'</b></span>';
		html+='</span>';
		return html;
	},
	getVariableComboStore:function(variableName){
		var store=Ext.data.StoreManager.lookup(variableName+'Id');
		if(Ext.isEmpty(store)) {
			store =  Ext.create('Ext.data.ArrayStore',{
				storeId:variableName+'Id',
				fields : ['variableFieldName'],
				proxy:{
					type : 'memory'
				}
			});
		}
		return store;
	},
	loadVariableComboStore:function(variableName){
		var store=this.getVariableComboStore(variableName);
		if(store.getCount()==0){
			var response = Ext.Ajax.request({
				async: false,
				url: applicationContext+'/rest/orderconfigurations/variable/'+variableName
			});
			var items = Ext.decode(response.responseText);
			var jsonValue=Ext.decode(response.responseText);
			var serviceStoreData = [];
			if(jsonValue.length > 0){
				Ext.Array.forEach(jsonValue,function(item){
					var service = [item];
					serviceStoreData.push(service);
				});
				store.loadRawData(serviceStoreData);
			}
		}
	},
	BulkUpdate:function(grid, selection, eOpts){
		if(selection.startCell){
			var store = grid.store;
			var intialCell = selection.startCell;
			
			if(intialCell!=null && store.getCount() > 0){
				var dataindex=intialCell.column.dataIndex,
					value=intialCell.record.get(dataindex),
					initialrowIdx=intialCell.rowIdx,
					lastrowIdx=selection.endCell.rowIdx,
					start=initialrowIdx,
					end=lastrowIdx;
				
				function updateRecord(index){
					store.getAt(index).set(dataindex, value);
					//For Status field change code value
					if(dataindex == 'status'){
						if(value == AOCLit.cancelStatusOrderLine){
							store.getAt(index).set('iconName', 'cancel');
							store.getAt(index).set('colorCode', '#808080');
						}else{
							store.getAt(index).set('iconName', 'warning');
							store.getAt(index).set('colorCode', '#FF0000');
						}
						store.getAt(i).set('codeValue', intialCell.record.get('codeValue'));
					}
				}
				if(end < start && start > 0){
					for(var i= start;i >= end; i--){
						updateRecord(i);
					}
				}else if(end > start){
					for(var i= start;i <= end; i++){
						updateRecord(i);
					}
				}
			}
		}
  	},
    getCodeStore:function(type){
		var store=Ext.data.StoreManager.lookup(type+'id');
		if(Ext.isEmpty(store)){
			store =  Ext.create('Ext.data.ArrayStore',{
				storeId:type+'id',
				fields : ['code','value'],	
				proxy:{
					type : 'memory'
				}
			});
		}
		return store
    },
	loadCodeStore:function(type){
		var store=this.getCodeStore(type);
		if(store.getCount()==0){
			var appendUrl='';
			if(type!='code'){
				appendUrl='/type/'+type;
			}
			var response = Ext.Ajax.request({
				async: false,
				url: applicationContext+'/rest/code'+appendUrl
			});
			var items = Ext.decode(response.responseText);
			var jsonValue=Ext.decode(response.responseText);
			if(jsonValue.ArrayList.length>0){
				Ext.Array.forEach(jsonValue.ArrayList,function(item){
					store.add(item);
				});
			}
		}
	},
    getOrderLineEditor:function(record,value){
		var store=record.store;
		var i=store.find('id',record.id);
		//Amit Kumar - show all row editor
		//if(i==0){
			return Ext.create('Ext.grid.CellEditor', {
				field: {
					xtype: 'textfield',
					allowBlank: false
				}
			});
//		}else{
//			return false;
//		}
    },
    createToolTip : function(el,lit,anchor){
        var me     = this;
        return Ext.create('Ext.tip.ToolTip', {
            target : el,
            html   : lit,
            anchor : (anchor) ? anchor : 'top'
        });
    },
    getSatus:function(obj){
    	/*
    	 * Implementing generic function for displaying colorCode and iconName on all screens
    	 * */
    	var iconColor = obj.data.colorCode;
    	if(obj.data.colorCode === '#008000'){
    		iconColor = '#4AA02C';
    	}
    	return '<span style="margin-right:3px;"><i style="font-size:15px; color:'+iconColor+'" class="' + AOC.config.Settings.buttonsCls[obj.data.iconName] + '"></i></span><span><font color="' +iconColor+'">'+obj.data.codeValue+'</font></span>';
    },
    setCookie:function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    },
    getCookie:function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            c = c.charAt(0)==' '?c.substring(1):c;
            if (c.indexOf(name) == 0){
            return c.substring(name.length,c.length);
            }
        }
        return "";
    },
    deleteCookie:function(cname){
    	 var name = cname + "=";
    	document.cookie = name+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    },
    sendAjaxRequest : function(url, method,async, bodyData,callerObject,failureFunction,successFnc,failureContent){
    	var data;
        Ext.Ajax.request({
        method: method,
         url: url,
         jsonData : bodyData,
         async : async,
         headers : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ==",
            "Content-Type"  : "application/json"
          },
         success : function(res){
        	var responseText = res.responseText;
        	if(!Ext.isEmpty(successFnc))
        		successFnc(res,callerObject);	
        	if(!Ext.isEmpty(responseText)){
        		data = Ext.decode(responseText);
        	}
        },
        failure : function(res){
        	if(!Ext.isEmpty(failureFunction))
        		callerObject[failureFunction](res,failureContent);
        }
      });
        return data;
	},
	fadeoutMessage : function(parm1,parm2,parm3,param4){        
			var el,
			title,
			msg,
			ms,
			nextStepMsg,
			zindex,
			m,
			slideFrom;
			 nextStepMsg = !Ext.isEmpty(param4)?'<br><br>'+param4:'';
		if (typeof arguments[0] !== "object"){
			el = document.body;
			title = parm1;
			msg = parm2 || '';
			//AC:3967 - Update fade out duration
			ms = (!parm3) ? 30000 : parm3;
			slideFrom = 't';
		} else {
			el = parm1.el || document.body;
			title = parm1.title || '';
			msg = parm1.msg || '';
			ms = parm1.ms || 2000;
			slideFrom = parm1.slideFrom || 't';
		}
		var style="";
		if(!el.msgCt){
			 var w = 480,
			 h = 60,
			 left = Ext.getBody().getViewSize().width,
			 l = (left-w)/2;
			zindex='width:'+w+'px;min-height:'+h+'px;left:'+l+'px;'; 
			style='style="min-height:'+h+'px;"';
			el.msgCt = Ext.core.DomHelper.insertFirst(el, {
				id:'aoc-msg-div',
				style:zindex
			}, true);
			el.msgCt.on({click:function(event,el){
				 var event=el.getAttribute('event');
				 if(event){
					 m.hide();
					 m.destroy();
					 el.msgCt=null;
				 }
			}});
		} else {
			el.msgCt.update('<div '+style+' class="aoc-msg"><div style="width:23px;height:60px;top:5px;float:left;"><img src="avery/resources/images/tick.png" /></div><div style="float:left;word-wrap: break-word;width:91%;">' + msg +nextStepMsg+'</div><div style="float:left;"><img style="cursor:pointer;" event="close" src="avery/resources/images/close-round-alt.png" /></div></div>');
			return;
		}
		m = Ext.core.DomHelper.append(el.msgCt, '<div '+style+' class="aoc-msg"><div style="width:23px;height:60px;top:5px;float:left;"><img src="avery/resources/images/tick.png" /></div><div style="float:left;word-wrap: break-word;width:91%;">' + msg +nextStepMsg+'</div><div  style="float:left;"><img style="cursor:pointer;" event="close" src="avery/resources/images/close-round-alt.png" /></div></div>', true);
		m.hide();
		m.slideIn(slideFrom, {
			easing: 'easeOut',
			duration: 500}).ghost(slideFrom, {
			duration: 10,
			delay: ms,
			remove: true,
			callback:function(){
				el.msgCt.remove();
				el.msgCt=null;
			}
		});
	},
	notifyByImage : function(config){
		if(config.isValid()){
			config.setFieldStyle('background-image:url('+AOC.config.Settings.buttonIcons.success+');background-repeat:no-repeat;background-position:right;');
		}else{
			config.setFieldStyle('background-image:url('+AOC.config.Settings.buttonIcons.invalid_field+');background-repeat:no-repeat;background-position:right;');
		}
	},
	hideMandatoryMessage:function(obj){
		obj.down('#messageFieldItemId').setValue('').setVisible(true);
		obj.down('#messageFieldItemId').setHidden('true');
	},
	notifyByMessage: function(obj) {
		obj.down('#messageFieldItemId').setValue('').setVisible(true);
		obj.down('#messageFieldItemId').setHidden('true');
	},
	
	//(Amit Kumar) add showHideEMailBodySubjectField in ViewMailDetail from Email and TaskManager
	showHideEmailBodySubjectFields:function(form, currentRecord){
    	var data = currentRecord.data,
    		emailSubjectRBOMatchField = form.queryById('emailSubjectRBOMatch'),
    		emailSubjectProductLineMatch = form.queryById('emailSubjectProductLineMatch'),
    		emailSubjectPartnerMatch = form.queryById('emailSubjectPartnerMatch'),
    		emailBodyRBOMatch = form.queryById('emailBodyRBOMatch'),
    		emailBodyProductLineMatch = form.queryById('emailBodyProductLineMatch');
    	
    	emailSubjectRBOMatchField[data.emailSubjectRBOMatch ? 'show':'hide']();
    	emailSubjectProductLineMatch[data.emailSubjectProductLineMatch ? 'show':'hide']();
    	emailSubjectPartnerMatch[data.emailSubjectPartnerMatch ? 'show':'hide']();
    	emailBodyRBOMatch[data.emailBodyRBOMatch ? 'show':'hide']();
    	emailBodyProductLineMatch[data.emailBodyProductLineMatch ? 'show':'hide']();
    },
    
    loadDependendVariableComboStore:function(variableName,systemId,OrgCode){
		var store =  Ext.create('Ext.data.ArrayStore',{
			fields : ['variableFieldName'],
			proxy:{
				type : 'memory'
			}
		});
			var response = Ext.Ajax.request({
				async: false,
				url: applicationContext+'/rest/orderconfigurations/orgId/'+variableName+'/'+systemId+'/'+OrgCode
			});
			var jsonValue=Ext.decode(response.responseText);
			var serviceStoreData = [];
			if(jsonValue.length > 0){
				Ext.Array.forEach(jsonValue,function(item){
					var service = [item];
					serviceStoreData.push(service);
				});
				store.loadRawData(serviceStoreData);
			}
			return store;
		
	},
	
	//(Amit Kumar) add funcitons for check enable/disable and menu item style 
	getEnableMenuItemStyle:function(){
		return 'border-bottom: none !important;background: #FFFFFF;cursor:pointer;';
	},
	getDisableMenuItemStyle:function(){
		return 'border-bottom: none !important;background: #FFFFFF;cursor:default;';
	},
	isEmailQueueViewMailEnabled:function(status){
		if(status == AOCLit.unrecognizedEmailStatus){
			return false;
		}
		return true;
	},
	isEmailQueueViewOrderEnabled:function(status,orderQueueCount){
		if(status == AOCLit.orderEmailProcessed && orderQueueCount>0 ){
			return true;
		}
		return false;
	},
	isEmailQueueMoveToTaskManagerEnabled:function(status){
		if(status == AOCLit.emailUnidentifiedStatus){
			return true;
		}
		return false;
	},
	advancedSearch:function(view,values){
		var store = view.contextGrid.store;
		
		if(Ext.isEmpty(values.siteId)){
			var currentUserId = AOCRuntime.getUser().siteId;
			values.siteId = currentUserId;
		}
		
		if (values) {
			store.proxy.setFilterParam('query');
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: Ext.JSON.encode(values)
            });
            view.contextGrid.lookupReference('clearAdvSearch').show();
        }
		setTimeout(function(){view.close()},100);
	},
	quickSearch:function(view, value){
		var store = view.store;
		if (value != null && !Ext.isEmpty(value)) {
			store.proxy.setFilterParam('query');
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: Ext.JSON.encode(value)
            });
            //store.load({params:{query:Ext.JSON.encode(value)}});
        }
	},
	getDependendVariableComboStore:function(variableName,systemId,OrgCode){
			var response = Ext.Ajax.request({
				async: false,
				url: applicationContext+'/rest/orderconfigurations/orgId/'+variableName+'/'+systemId+'/'+OrgCode
			});
			var jsonValue=Ext.decode(response.responseText);
			return jsonValue;
	},
	
	loadOrderLineGridStore:function(store, id){
		store.load({params:{ id: id }});
	},
	clearCSRCombo:function(combo,e){
		var store = combo.store;
		var index = store.find("csrName",combo.getRawValue(),'',false,false,true);
		if(index == -1){
			combo.setValue('');
		}
	},
	clearCombo:function(combo,e){
	  	var store = combo.store;
		var index = store.find(combo.displayField,combo.getRawValue(),'',false,false,true);
		if(index == -1){
			combo.setValue('');
		}
	},
		
	resetWebOrderForm:function(webOrderView){
		var refs = webOrderView.getReferences(),
			form = refs.webform;
		
		form.resetFormFields();
		form.isResubmit = false;
		webOrderView.lookupReference('rboCombo').disable();
		webOrderView.lookupReference('partnerCombo').getStore().load();
		var attachmentInfoGrid = refs.webOrderAttachmentInfoGrid;
		attachmentInfoGrid.store.removeAll();
		attachmentInfoGrid.getView().refresh();
		webOrderView.lookupReference('orderFileType').setDisabled(true);
		webOrderView.rboId = '';
		webOrderView.productLineId = '';
		
	},
	changeScreen:function(screenName, tabIndex){
		var con = AOC.app.getController('MenuController');
		con.changeTabPanel(tabIndex);
        var section= Ext.ComponentQuery.query(screenName)[0];
        section.getLayout().setActiveItem(0);
	},
	
	getIconClass:function(value){
		if(value.substr(0,1)=='T'){
			//7CFFAA 4AA02C 7CF2A5
			return '<i style="color:#7CF2A5;font-size:16px;" class="fa fa-check"/>';
		}
		else if(value.substr(0,1) == 'F'){//FFC7B0
			return '<i style="color:#FFC7B0;font-size:16px;" class="fa fa-times"/>';
		}
		else{
			return '<i style="color:orange;font-size:16px;" class="fa fa-exclamation-triangle"/>';
		}
	},
	showToast: function(type, msg) {
		var style = '',
			title = '',
			iconCls = '',
			bodyStyle='';
		
		switch(type){
			case 'failure':
				//style = 'box-shadow:0px 0px 4px 0px #808080;background-color:#f5b4a5;';
				title='Failure';
				iconCls='fa fa-exclamation-circle failure-icon';
				//bodyStyle='background-color:#f5b4a5;font-size:13px;color#2c3e50;';
				break;
			case 'validation':
				//style = 'box-shadow:0px 0px 4px 0px #808080;background-color:#f7f985;';
				title='Warning';
				iconCls='fa fa-exclamation-triangle warning-icon';
				//bodyStyle='background-color:#f7f985;font-size:13px;color#2c3e50;';
				break;
			default:
				//style = 'box-shadow:0px 0px 4px 0px #808080;background-color:#ebffeb;',
				title = 'Success';
				iconCls = 'fa fa-check success-icon';
				//bodyStyle='background-color:#ebffeb;font-size:13px;color:#2c3e50;';
				break;
		}
		
        Ext.toast({
            html: msg,
            closable: true,
            autoClose:false,
            title:title,
//            bodyStyle:bodyStyle,
            style:style,
            iconCls:iconCls,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
	},
	actionColumnRenderer:function(v, metadata, record){
    	return '<i class="x-fa fa-ellipsis-v" style="color:#2c3e50;font-size:16px;cursor:pointer;font-style:inherit;"></i>';
    },
	//(Amit Kumar)Common function for orderlinegrid and bulkupdate orderline grid column renderer
	qtyColumnRenderer:function(value, metadata, record){
		if(value){
			return Number(value)
		}
		return '';
	},
	onCustomerOrderQty:function(value, metadata, record){
		if(parseInt(value) > -1) {
			if(value == '0'){
				metadata.style = AOCLit.cellColor;
			}
			
			if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine && (record.get('waiveMOQ')=='false' || record.get('waiveMOQ')==false)){
				var moqValidationFlag = record.data.moqvalidationFlag  ? record.data.moqvalidationFlag : record.data.moqvalidationFlag.trim();
				
				if(moqValidationFlag.substr(0,1) == 'F'){
					metadata.style = AOCLit.mandatoryValidationCellColor;
				}
			}
			
			if(record.get('status')==AOCLit.customerQtyMismatchStatusOrderline || record.get('status')==AOCLit.errorInCustomerOrderQtyStatusOrderLine ){
				metadata.style = AOCLit.cellColor;
			}
		   return value;
		} else {	
			metadata.style = AOCLit.cellColor;
			return value;
		}
	},
	onUpdateMoqRenderer:function(value, metadata,rec){
		var checkMOQ=rec.data.moqvalidationFlag.trim();
		var allowOrderLineEdit=AOC.config.Runtime.getAllowOrderLineEdit();
		if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine && allowOrderLineEdit==true && rec.data.waiveMOQ==false && checkMOQ.substr(0,1)=='F'){
			return '<i style="font-size:16px;cursor:pointer;" class="EnableUpdateMoq fa fa-cart-plus"/>';
		}
		else{
			return '<i style="font-size:16px;" class="fa fa-ban"/>';
		}
	},
	onOrderLineDateRenderer:function(v, metadata, record){
 		if(!Ext.isEmpty(v) && new Date(Ext.util.Format.dateRenderer()(record.get('orderedDate'))) > new Date(Ext.util.Format.dateRenderer()(v))
 				&& record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
 			metadata.style = AOCLit.cellColor;
 			return Ext.Date.format(v, AOCLit.dateFormat);
 		}
 		return !Ext.isEmpty(v) ? Ext.Date.format(v, AOCLit.dateFormat) : '';
 	},
 	onOrdererDateRenderer:function(value, metadata,record){
 		if(value=='' || value == null) {
  			metadata.style = AOCLit.cellColor;
          }
          else{
        	return Ext.Date.format(value,'Y-m-d');
         	return Ext.Date.format(value, AOCLit.dateFormat);
          }
  	},
	onAtoColumnRenderer:function(value, metadata, record){
		if(value == '' || value == null) {
			metadata.style = AOCLit.cellColor;
		}
		return value;
	},
	onWaveMoqColumnRenderer:function(value, metadata, record){
		var v = 'N';
		if(value){
			v = 'Y';
		}
		return v;
	},
	onStatusComboAfterRender:function(combo){
		var store = combo.store;
        //(Amit Kumar 12-01-2017)only waitingfor cs verification and cancel status will visible in combo
        store.filterBy(function(record){
       	 	return (record.get('code') == AOCLit.waitingForCSRStatusOrderLine || record.get('code') == AOCLit.cancelStatusOrderLine);
        });
	},
	onStatusComboFocus:function(combo){
		var store = combo.store,
    		index = store.find('code',combo.getValue());
		
    	if(index == -1){
    		combo.setValue('');
    	}
	},
	onComboAfterRender:function(combo){
		var store = combo.store,
			obj = {variableFieldName:'None'},
			index = store.find('variableFieldName', 'None','', false, false, true);
	
		if(index == -1){
			store.insert(0,new Ext.data.Record(obj));
		}
	},
	onComboSelect:function(combo){
		var value = combo.getValue();
		if(value == 'None'){
			combo.setValue('');
		}
	},
	onAveryItemNumberColumnRenderer:function(value, metadata, record){
		if(value == '') {
        	if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine){
        		metadata.style = AOCLit.cellColor;
        	}
        } else {
        	if(value==AOCLit.averyItemNotFoundText || value==AOCLit.duplicateMappingLabel){
        		metadata.style = AOCLit.cellColor;
        	}
        }
		return value;
	},
	onBulkOrderColumnRenderer:function(value, metadata, rec){
		if(!Ext.isEmpty(value)){
			var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
			var checkvalue=bulkSampleValidationFlag ? bulkSampleValidationFlag.trim() :'';
			if(checkvalue.substr(0,1) != 'T'){
				metadata.style = AOCLit.mandatoryValidationCellColor;
			}
		}else{
			metadata.style = AOCLit.cellColor;
		}
		return value;
	},
	onPageSizeColumnRenderer:function(value, metadata, rec){
		var htlSizePageValidationFlag = rec.get('htlsizePageValidationFlag') ? rec.get('htlsizePageValidationFlag').trim() : '';
		if(htlSizePageValidationFlag.substr(0, 1) != 'T'){
			metadata.style = AOCLit.mandatoryValidationCellColor;
		}
		return value;
	},
	setUserProfileIcon:function(fileSrc){
		 var user = AOCRuntime.getUser(),
         	viewPort = Ext.ComponentQuery.query('viewport')[0],
         	viewModel = viewPort.getViewModel();
		 
	     viewModel.set('userInfo.fileSrc', fileSrc);
	},
	updateProfileInfo: function () {
        var user = AOCRuntime.getUser(),
            name = user.firstName,
            viewport = Ext.ComponentQuery.query('viewport')[0],
            name = (!Ext.isEmpty(user.lastName)) ? name + ' ' + user.lastName : name;
        
        user.name = name;
        
        var viewModel = viewport.getViewModel();
        user.fileSrc = viewModel.get('userInfo.fileSrc') ? viewModel.get('userInfo.fileSrc') : this.getFilePath();
        viewModel.set('userInfo', user);
    },
//    updateHeaderUserName: function () {
//        var userInfo = AOCRuntime.getUser(),
//            name = userInfo.firstName,
//            name = (!Ext.isEmpty(userInfo.lastName)) ? name + ' ' + userInfo.lastName : name,
//    		aocheader = Ext.ComponentQuery.query('viewport aocheader')[0],
//    		viewModel = aocheader.getViewModel(),
//    		profileImage = aocheader.down('#profileImage');
//        
//    	profileImage.setSrc(Helper.getFilePath());
//    	viewModel.set('userInfo.name', name);
//    },
    getFilePath:function(record){
    	if(record){
    		var data = record.data,
    			fileName = data.fileName,
    			filePath = data.filePath;
    		 if(fileName){
    	    	   var str = filePath ? filePath :'',
    	    		   fPath = str ? (str.indexOf('AveryDennison') > -1 ? str.substr(str.indexOf('FileStore')) : ''):'';
    	    		   filePath = fPath+'/'+fileName;
    	    		   
    	    		 return filePath;
    	    	  }
    	}
    	else{
	    	var userinfo = AOCRuntime.getUser();
	    		fileName = userinfo.fileName,
	    		filePath = userinfo.filePath;
	    	  if(fileName){
	    	   var str = filePath ? filePath :'',
	    		   fPath = str ? (str.indexOf('AveryDennison') > -1 ? str.substr(str.indexOf('FileStore')) : ''):'';
	    		   filePath = fPath+'/'+fileName;
	    		 return filePath;
	    	  }
	    	 }
    	},
	siteNameForSuperAdminOnly:function(obj){
		if(AOCRuntime.getUser().role != 1 ) obj.setHidden(true);
		if(obj.xtype == 'combo' || obj.xtype == 'combobox') { obj.getStore().load();}
	},
	getSystemComboList: function (siteId) {
        var systemStore = Ext.StoreManager.lookup('userSystemStore'),
            proxy = new Ext.data.proxy.Rest({
                url: applicationContext + '/rest/system/site/' + siteId,
                appendId: true,
                reader: {
                    type: 'json'
                },
                autoLoad: true
            });
        systemStore.setProxy(proxy);
    },
    loadSystemCsrCodeGrid:function(systemCsrCodeGrid, systemCsrCodeOwner, systemCsrNonCodeOwner, systemCsrCombinedCodes){
    	var grid = systemCsrCodeGrid,
    		store = grid.store;
    	
    	 Ext.Ajax.request({
         	url:applicationContext+'/rest/systemcsrcode',
         	method:'GET',
         	params:{systemCsrCombinedCodes:systemCsrCombinedCodes},
         	success: function (response, opts) {
         		var systemCsrGridData = Ext.JSON.decode(response.responseText),
         			gridData = systemCsrGridData.data,
         			yes = systemCsrCodeOwner,
         			no = systemCsrNonCodeOwner;
         		
         		if(yes!=null)
         			yes = systemCsrCodeOwner.split(',');
         		if(no!=null)
         			no = systemCsrNonCodeOwner.split(',');
         		for(i=0;i<gridData.length;i++){
             		if(yes.indexOf(systemCsrGridData.data[i].id.toString()) != -1){
             			gridData[i].codeOwner = 'Y'
             		}
             		else{
             			gridData[i].codeOwner = 'N'
             		}
         		}
         		store.loadData(gridData);
             },
             failure: function (response, opts) {
                 msg = response.responseText;
                 Helper.showToast('failure', msg);
             }
         });
    },
    loadAdvanceCSRStore:function(field){
    	var store = field.store;
    	field.store.load({params:{siteId:AOCRuntime.getUser().siteId}});
    },
    //partner screen
    getExcelStore:function(){
		return [['None','None'],['One Sheet in a file','One Sheet in a file'],['Multiple order sheets in a file','Multiple order sheets in a file']];
	},
	getYesNoStore:function(){
		return [['None','None'],['Yes','Yes'],['No','No']];
	},
	getFileNameContentStore:function(){
		return [['None','None'],['File Name','File Name'],['File Content','File Content']];
	},
	getIdentificationTypeStore:function(){
		return [['None','None'],['RBO','RBO'],['Product Line','Product Line']];
	},
	getProductLineStore:function(){
		return[ ['PFL','PFL'],['HTL','HTL'],['WVL','WVL'],
	        ['GG','GG'],['WVL/GG','WVL/GG'],['PFL/HTL/WVL','PFL/HTL/WVL'],['PFI/HTL/WVL/Offset','PFI/HTL/WVL/Offset'],
	        ['PFL/WVL','PFL/WVL'],['HTL/WVL','HTL/WVL'],['HTL/PFL','HTL/PFL'],['PFL/WVL/PSI', 'PFL/WVL/PSI'],
	        ['HTL/Woven/PFL/Hangtag/Sticker', 'HTL/Woven/PFL/Hangtag/Sticker'],['PSI', 'PSI'],['HTL/WVL/Speciality', 'HTL/WVL/Speciality'],
	        ['Thermal/ PFL', 'Thermal/ PFL'], ['RFID', 'RFID'], ['Offset', 'Offset'], ['OFF/FLE', 'OFF/FLE'],
	        ['OFF/PFL/WOV/IMP', 'OFF/PFL/WOV/IMP'], ['Woven & Offset', 'Woven & Offset']
		];
	},
	getSystemStore:function(){
		return [
		    ['ORACLE','ORACLE'],['VIPS','VIPS'],['SPARROW','SPARROW']
		];
	},
	getSiteName:function(siteId){
		switch (siteId){
			case 2: return 'South China';
			case 3: return 'Suzhou';
			case 4: return 'Vietnam';
		}
	}
});
