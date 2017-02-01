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
		this.orderColorMap=ordderColorMap;
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
			if(intialCell!=null){
				var dataindex=intialCell.column.dataIndex,
					value=intialCell.record.get(dataindex),
					initialrowIdx=intialCell.rowIdx,
					lastrowIdx=selection.endCell.rowIdx,
					start=initialrowIdx,
					end=lastrowIdx;
					//columnSortable = intialCell.column.sortable;
				
				intialCell.column.sortable = false;
				if(lastrowIdx < initialrowIdx){
					start = lastrowIdx;
					end = initialrowIdx;
					//start=lastrowIdx-1;
					//end=initialrowIdx-1;
				}
				for(var i= start;i <= end; i++){
					store.getAt(i).set(dataindex, value);
					//For Status field change code value
					if(dataindex == 'status'){
						if(value == AOCLit.cancelStatusOrderLine){
							store.getAt(i).set('iconName', 'cancel');
							store.getAt(i).set('colorCode', '#808080');
						}else{
							store.getAt(i).set('iconName', 'warning');
							store.getAt(i).set('colorCode', '#FF0000');
						}
						store.getAt(i).set('codeValue', intialCell.record.get('codeValue'));
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
		if(i==0){
			return Ext.create('Ext.grid.CellEditor', {
				field: {
					xtype: 'textfield',
					allowBlank: false
				}
			});
		}else{
			return false;
		}
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
    	return '<img style="margin-right:3px;" src="' + AOC.config.Settings.buttonIcons[obj.data.iconName] + '" /><font color="' +obj.data.colorCode+'">'+obj.data.codeValue+'</font>';
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
    		emailBodyRBOMatch = form.queryById('emailBodyRBOMatch'),
    		emailBodyProductLineMatch = form.queryById('emailBodyProductLineMatch');
    	
    	emailSubjectRBOMatchField[data.emailSubjectRBOMatch ? 'show':'hide']();
    	emailSubjectProductLineMatch[data.emailSubjectProductLineMatch ? 'show':'hide']();
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
	        view.close();
	},
	quickSearch:function(view,value){
		var store = view.store;
		if (value != null && value != '') {
            store.load({params:{query:Ext.JSON.encode(value)}});
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
	}
});
