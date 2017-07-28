Ext.define('AOC.view.home.ReportFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.reportcontroller',
    runTime: AOC.config.Runtime,
    getReport:function(){
    	var view=this.getView(),url='',reportWindow = view.up('window');
    	var reportForm=view.getForm();
    	if(reportForm.isValid()){
    	var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,query='',obj='';
    	obj={datecriteriavalue:'orderemailqueue.receivedDate'};
     	 if(radioGroupValue=='dailyReport'){
     		 url=applicationContext + '/rest/orders/download/dailyreport';
     	 }else{
     		url=applicationContext + '/rest/orders/download/openreport';
     		obj.fromDate=this.lookupReference('fromDate').getSubmitValue();
     		obj.toDate=this.lookupReference('toDate').getSubmitValue();
     	 } 
     	var rboCombo =this.lookupReference('rboName'),
     		rboStore = rboCombo.store,
     		rboName = [],
     		partnerCombo =  this.lookupReference('partner'),
     		partnerStore = partnerCombo.store,
     		partnerName = [],
     		siteCombo = this.lookupReference('siteName'),
     		siteStore = siteCombo.store,
     		siteName = [],
     		csrCombo = this.lookupReference('csrCombo'),
     		csrStore = csrCombo.store,
     		csrName = [],
     		timeZone =this.lookupReference('timeZone');
     		
	
	 	if(rboCombo.getValue() == 'all'){
	 		rboStore.each(function(rec){
				if(rec.get('id') != 'all' ){
					if(AOCRuntime.getUser().siteId == rec.get('site') || AOCRuntime.getUser().role == 1){
						rboName.push(rec.get('rboName'));
					}
				}
			});
		}else{
			rboName.push(rboCombo.getRawValue());
		}
	
		if(partnerCombo.getValue() == 'all'){
			partnerStore.each(function(rec){
				if(rec.get('id') != 'all'){
					if(AOCRuntime.getUser().siteId == rec.get('site') || AOCRuntime.getUser().role == 1){
						partnerName.push(rec.get('id'));
					}
				}
			});
		}else{
			partnerName.push(partnerCombo.getValue());
		}
	
		if(siteCombo.getValue() == 'all'){
			siteStore.each(function(rec){
				if(rec.get('id') != 'all' ){
					siteName.push(rec.get('id'));
				}
			});
		}else{
			siteName.push(siteCombo.getValue());
		}
	
		if(csrCombo.getValue() == 'all'){
			csrStore.each(function(rec){
				if(rec.get('userId') != 'all' ){
					csrName.push(rec.get('userId'));
				}
			});
		}else{
			csrName.push(csrCombo.getValue());
		}
	
		var statusCombo =this.lookupReference('status'),
		statusStore = statusCombo.store,
		statusCode =[];
		if(statusCombo.getValue() == 'all'){
			statusStore.each(function(rec){
				if(rec.get('code') != 'all'){
					statusCode.push(rec.get('code'));
				}
			});
		}else{
			statusCode.push(statusCombo.getValue());
		}
	
		obj.partnerId = partnerName.join(',');
		obj.RBOName = rboName.join(',');
		obj.csrId = csrName.join(',');
		obj.Status = statusCode.join(',');
		obj.timeZone = timeZone.getValue();
		var userInfo = AOCRuntime.getUser();
		if(userInfo.role == 1){
			obj.siteId = siteName.join(',');
		}
		else{
			obj.siteId = userInfo.siteId;
		}
		
		var values = reportForm.getValues();
			query = Ext.JSON.encode(obj);
	
     	var form = Ext.create('Ext.form.Panel', { 
            standardSubmit: true,   
            url : url
        });
     	
     	form.submit({
        	method : 'GET',
        	params:{query:query}
        });
    	}else{
    		Ext.MessageBox.alert('', AOCLit.emptyFilter);
    	}
    	reportWindow.close();
    },
    onRadioButtonChange:function(obj){
    	var value=obj.getValue().rb;
    	if(value=='dailyReport'){
    		this.lookupReference('fromDate').setHidden(true);
    		this.lookupReference('toDate').setHidden(true);
    	}else{
    		this.lookupReference('fromDate').setHidden(false);
    		this.lookupReference('toDate').setHidden(false);
    	}
    },
    
    onPartnerSelect:function(obj){
    	var me = this,
    		view = me.getView(),
    		statusCombo =this.lookupReference('status'),
    		rboCombo = me.lookupReference('rboName'),
    		partnerCombo = me.lookupReference('partner'),
    		partnerStore = partnerCombo.store,
	    	partnerId =[];

    	if(partnerCombo.getValue() == 'all'){
    		partnerStore.each(function(rec){
    			if(rec.get('id') != 'all'){
    				if(AOCRuntime.getUser().siteId == rec.get('site') || AOCRuntime.getUser().role == 1){
    					partnerId.push(rec.get('id'));
					}
    			}
    		});
    	}else{
    		partnerId.push(partnerCombo.getValue());
    	}
	    view.el.mask(AOCLit.pleaseWait);
    	var response = Ext.Ajax.request({
    		url: applicationContext + '/rest/productLines/rboList',
    		method:'GET',
    		params:{partnerId:partnerId.join()},
    		success : function(response, opts) {
				var jsonValue = Ext.decode(response.responseText).rbo;
    				serviceStoreData = [];
    				
    	    	if(jsonValue.length>0){
    	    		var rboStore = rboCombo.store;
    	    		rboStore.loadData(jsonValue);
    	    		rboCombo.setDisabled(false);
    	    		rboStore.filterBy(function(rboRec){
    	    			var userSiteId = AOCRuntime.getUser().siteId;
    					if(userSiteId){
    						if(rboRec.get('site') == userSiteId){
    							return true;
    						}
    						return false;
    					}
    					return true;
    	    		});
    	    	}else{
    	    		Helper.showToast('failure', AOCLit.noRboMsg);
    	    	}
    	    	view.el.unmask();
	        },
	        failure: function(response, opts) {
	        	view.el.unmask();
                msg = response.responseText;
                Helper.showToast('failure', msg);
                view.unmask();
                view.close();
            }
    	});
    	rboCombo.enable();
    	statusCombo.enable();
    },
    onReportFormAfterRender: function(form){
    	var siteCombo = form.lookupReference('siteName'),
          	siteStore = siteCombo.store,
          	userInfo = AOCRuntime.getUser(),
          	csrCombo = form.lookupReference('csrCombo'),
          	csrComboStore = csrCombo.store,
          	siteId = userInfo.siteId;
      
    	siteStore.load({
    		params: {
    			siteId: siteId
    		}
    	});
    	
    	if(AOCRuntime.getUser().role != 1 ){
    		csrComboStore.load({
    			params: {
    			siteId: siteId
    			}
    		});
    	}
    },
    onSiteSelect: function(siteCombo){
    	var me = this,
    		siteComboValue = siteCombo.getValue(),
    		siteComboStore = siteCombo.store,
    		refs = me.getReferences(),
    		csrCombo = refs.csrCombo;
    	
    	csrCombo.enable();
    	csrCombo.store.proxy.extraParams = {
		    siteId: siteComboValue == 'all' ? '' : siteComboValue
		};
    	csrCombo.store.load();
    	csrCombo.reset();
    },
    insertAllInStore:function(store, obj){
    	store.on('load',function(){
			store.insert(0,new Ext.data.Record(obj));
		},store);
    },
    onRBOComboExpand:function(field){
    	var store = field.store,
    		obj ={id:'all', rboName:'Select All', site:AOCRuntime.getUser().siteId};
    	
    	var index = store.find('id', 'all');
		if(index == -1){
			store.insert(0, new Ext.data.Record(obj));
		}
    },

    onPartnerComboExpand:function(field){
    	var store = field.store,
    		obj ={id:'all', name:'Select All', site:AOCRuntime.getUser().siteId};
    	
    	var index = store.find('id', 'all');
		if(index == -1){
			store.insert(0, new Ext.data.Record(obj));
		}
    },
    onPartnerComboAfterRender:function(combo){
    	var store = combo.store;
    	
    	store.on('load',function(store){
    		var userSiteId = AOCRuntime.getUser().siteId;
    		store.filterBy(function(rec){
    			if(userSiteId){
    				if(rec.get('site') == userSiteId){
    					return true;
    				}
    				return false;
    			}
    			return true;
    		});
    	}, store);
    },
    onStatusComboAfterRender:function(combo){
    	var store = combo.store,
			obj ={code:'all',value:'Select All'};
    	
    	var index = store.find('code', 'all');
    	if(index == -1){
    		store.insert(0,new Ext.data.Record(obj));
    	}
    },
    onSiteComboAfterRender:function(combo){
    	if(AOCRuntime.getUser().role == 1){
    		var store = combo.store,
    			obj ={id:'all',name:'Select All'};
    		
    		this.insertAllInStore(store, obj);
		}
    },
    onCSRComboAfterRender:function(combo){
    		var store = combo.store,
    			obj ={userId:'all',csrName:'Select All'};
    		
    		this.insertAllInStore(store, obj);
    }
});