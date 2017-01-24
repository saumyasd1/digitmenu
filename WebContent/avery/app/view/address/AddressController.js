Ext.define('AOC.view.address.AddressController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.addressMain',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.AddressAdvanceSearch','AOC.util.Helper'],
    runTime : AOC.config.Runtime,
    
	clearAdvancedSearch:function(btn){
	        var grid = this.getView();
	        var store = grid.store;
	        store.clearFilter();
	        store.loadPage(1);
	        btn.hide();
	    },
		getQuickSearchResults:function(cmp){
	    	var view = this.getView(),
	        value = cmp.getValue();
	        Helper.quickSearch(view,{siteNumber: value}),
	        cmp.orderedTriggers[0].show();
	    },
		   getSearchResults:function(cmp,e){
			   var me=this;
			   if (e.getKey() == e.ENTER) {
				   me.getQuickSearchResults(cmp);
			   }
		   },
		   clearSearchResults:function(cmp){
			   var grid=this.getView();
			   	var store = grid.store;
			   	store.clearFilter();
				store.loadPage(1);
				cmp.setValue('');
				cmp.orderedTriggers[0].hide();
		   },
		   
   openAdvancedSearchWindow:function(){
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.AddressAdvanceSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
    		advanceSearchWin.show();
    	}
    },
    onSearchBtnClicked:function(btn){
    	  var view = this.getView(),
    	  	  refs = view.getReferences(),
    	  	  form = refs.addressAdvanceSearchForm.getForm(),
    	  	  values = form.getValues();
    	      values.datecriteriavalue = 'createdDate';
    	  	  store = view.contextGrid.store;
            Helper.advancedSearch(view,values);
    },
	openAddAddressWindow:function(currentRecord,id){
		var mode=this.runTime.getWindowInEditMode();
		var win=Ext.ComponentQuery.query('#createaddressmanageItemId')[0];
		var title=mode ?'Edit Address':'Add Address';
		if(!win){
		    var data={"id":""};
		    win=Ext.create('AOC.view.address.AddAddress',{
			modal:true,
			rec:currentRecord,
			editMode:mode,
			ID:id
		});
	    win.down('#titleItemId').setValue(AOCLit.title).setVisible(true);
		win.show();
		}
	},
	saveAddressDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
		var createaddress=this.getView();
		var grid=Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
		var panel=createaddress.down('#listPanel');
		var valueObj='',form=this.getView().down('form');
		var refs = this.getReferences();
		var editMode=this.getView().editMode,url='';
		var methodMode='';
		var length=0;
		if(editMode){
			ID=createaddress.ID;
			url=applicationContext+'/rest/address/'+ID;
			form.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges() ;
			if(valueObj.partnerId!=null){
				var varPartner = valueObj.partnerId;
				var partnerCombo = refs.partnerName;
				var store = partnerCombo.store;
				store.each(function(rec){
					if(rec.get('id') == partnerCombo.getValue()){
						valueObj.address = rec.get('address')
						valueObj.partnerName = rec.get('partnerName')
						valueObj.contactPerson = rec.get('contactPerson')
						valueObj.phone = rec.get('phone')
						valueObj.active = rec.get('active')
						valueObj.lastModifiedBy = rec.get('lastModifiedBy')
						valueObj.lastModifiedDate = rec.get('lastModifiedDate')
					}
				});
				valueObj.varPartner={id:valueObj.partnerId,partnerName:valueObj.partnerName,address:valueObj.address,phone:valueObj.phone,lastModifiedDate:valueObj.lastModifiedDate,lastModifiedBy:valueObj.lastModifiedBy};
			}
			if(valueObj.orgCodeId!=null){
			var varOrgCode=valueObj.orgCodeId;
			var orgCodeCombo = refs.orgName;
			var orgStore = orgCodeCombo.store;
			var siteCombo = refs.siteName;
			var systemCombo = refs.systemName;
			valueObj.orgName = orgCodeCombo.getRawValue();
			valueObj.siteName = siteCombo.getRawValue();
			valueObj.systemName = systemCombo.getRawValue();
			
			orgStore.each(function(rec){
				if(rec.get('id')==orgCodeCombo.getValue()){
				valueObj.systemId = rec.get('systemId')
				}
			});
			valueObj.varOrgCode={id:valueObj.orgCodeId,name:valueObj.orgName,system:{id:valueObj.system, name:valueObj.systemName, site:{id:valueObj.siteId,name:valueObj.siteName}}};
  			
			}
			
			
			
			length=Object.keys(valueObj).length;
			//Msg='Address Updated Successfully';
			var Msg=AOCLit.updateAddressMsg;
			var parameters=Ext.JSON.encode(valueObj);
		}
		else{
			url=applicationContext+'/rest/address';
			valueObj=form.getValues(false,true,false,true);
			var partnerCombo = refs.partnerName;
			var orgCodeCombo = refs.orgName;
			var siteCombo = refs.siteName;
			var systemCombo = refs.systemName;
			valueObj.orgName = orgCodeCombo.getRawValue();
			valueObj.siteName = siteCombo.getRawValue();
			valueObj.systemName = systemCombo.getRawValue();
			var store = partnerCombo.store;
			var orgStore = orgCodeCombo.store;
			
			orgStore.each(function(rec){
				if(rec.get('id')==orgCodeCombo.getValue()){
				valueObj.systemId = rec.get('systemId')	
				}
			});
			store.each(function(rec){
				if(rec.get('id') == partnerCombo.getValue()){
					valueObj.address = rec.get('address')
					valueObj.partnerName = rec.get('partnerName')
					valueObj.contactPerson = rec.get('contactPerson')
					valueObj.phone = rec.get('phone')
					valueObj.active = rec.get('active')
					valueObj.lastModifiedBy = rec.get('lastModifiedBy')
					valueObj.lastModifiedDate = rec.get('lastModifiedDate')
				}
			});
			
			valueObj.orgName = orgCodeCombo.getRawValue();
			methodMode='POST';
			length=1;
			//Msg='Address Added Successfully';
			var Msg=AOCLit.addAddressMsg;
			var parameters={
					varOrgCode:{id:valueObj.orgCodeId,name:valueObj.orgName,system:{id:valueObj.system, name:valueObj.systemName, site:{id:valueObj.siteId,name:valueObj.siteName}}},
      				orgName:valueObj.orgName,
					system:valueObj.system,
					siteId:valueObj.siteId,
					partnerId:valueObj.partnerId,
					siteNumber:valueObj.siteNumber,
					description:valueObj.description,
					address1:valueObj.address1,
					address2:valueObj.address2,
					address3:valueObj.address3,
					address4:valueObj.address4,
					address:valueObj.address,
					city:valueObj.city,
					state:valueObj.state,
					country:valueObj.country,
					zip:valueObj.zip,
					contact:valueObj.contact,
					phone1:valueObj.phone1,
					phone2:valueObj.phone2,
					fax:valueObj.fax,
					email:valueObj.email,
					shippingMethod:valueObj.shippingMethod,
					freightTerms:valueObj.freightTerms,
					shippingInstructions:valueObj.shippingInstructions,
					siteType:valueObj.siteType,
					varPartner:{id:valueObj.partnerId,partnerName:valueObj.partnerName,address:valueObj.address,phone:valueObj.phone,lastModifiedDate:valueObj.lastModifiedDate,lastModifiedBy:valueObj.lastModifiedBy}
					}
		}
	
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
		        	    Ext.getBody().unmask();
		        	    createaddress.destroy();
		        	    AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			grid.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Ext.getBody().unmask();
		        	createaddress.destroy();
              }
      	});
		}else{
			createaddress.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
		}
		this.runTime.setWindowInEditMode(false);
	}
		else{
			createaddress.down('#messageFieldItemId').setValue(AOCLit.editFieldEntryMsg).setVisible(true);
		}
	},
	onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me=this;
	      var callout = Ext.widget('callout', {
	          cls                  : 'white more-menu-item-callout extra',
	          html                 : me.buildMenuTpl.apply("{}"),
	          target               : e.target,
	          calloutArrowLocation : 'top-left',
	          relativePosition     : 't-b',
	          relativeOffsets      : [52,23],
	          dismissDelay         : 0,
	          listeners            : {
                  afterrender : me.onAfterRenderEditCallout,
                  edit: function(cmp){
                	  currentRecord=e.record;
                	  var id=currentRecord.get('id');
                	  me.runTime.setWindowInEditMode(true);
  		        	  var mode=me.runTime.getWindowInEditMode();
  		  		      var win=Ext.ComponentQuery.query('#createaddressmanageItemId')[0];
  		  		      var title=mode ?'Edit Address':'Add Address';
  		  		if(!win){
  		  		    var data={"id":""};
  		  		    win=Ext.create('AOC.view.address.AddAddress',{
  		  			modal:true,
  		  			rec:currentRecord,
  		  			editMode:mode,
  		  			ID:id,
  		  		    listeners: {
	     	        	'close':function( panel, eOpts ) {
	     	        		 Ext.getBody().unmask();
	     	        		 win.destroy();
	     	            }
  		  		    }
  		  		});
  		  	    win.down('#titleItemId').setValue(AOCLit.title).setVisible(true);
  		  		win.show();
  		  		}
                  	callout.destroy();
                  },
                  deleteaddress: function(cmp){
                	  currentRecord=e.record;
                		var ID=record.get('id');
                		Ext.Msg.confirm('Alert',AOCLit.deleteAddressMsg,function(btn){
                			  if(btn=='yes'){
                					Ext.Ajax.request({
                							method:'DELETE',
                							url:applicationContext+'/rest/address/'+ID,
                				        success : function(response, opts) {
                				            AOC.util.Helper.fadeoutMessage('Success',AOCLit.deleteAddMsg);
                				           me.runTime.getActiveGrid().store.load();
                				        },
                				        failure: function(response, opts) {
                		                }
                		        	});
                			  }
                		});
                  	callout.destroy();
                  }
              }
	          });
	      callout.show();   
	      var heightAbove = e.getY() - Ext.getBody().getScroll().top,
	        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
	  	    if(heightBelow<(callout.getHeight()+40)){
	  		  callout.calloutArrowLocation='bottom-left'; 
	  		  callout.relativePosition='b-t';
	  		  callout.relativeOffsets = [55, 0];
	  	  }else{
	  		  callout.calloutArrowLocation='top-left'; 
	  		  callout.relativePosition='t-b';
	  		callout.relativeOffsets = [55, 5];
	  	  }
	        callout.show();
	  },
	  onSiteSelect:function(combo, record){
		  var me = this,
		      refs = me.getReferences(),
		      org = refs.orgName,
		      shippingMethod = refs.shippingMethod,
		      freightTerms = refs.freightTerms,
		  	  system = refs.systemName,
		    systemStore = system.store,
		  	  siteId = record.get('id');
		  
		 me.loadSystemStore(systemStore, siteId );
	     var form =me.getView();
	     if(form !=null && !form.isResubmit){
	    	 system.reset();
	    	 org.reset();
	    	 shippingMethod.reset();
	    	 freightTerms.reset();
	    	 shippingMethod.disable();
	    	 freightTerms.disable();
	    	 org.disable();
	     }
	     system.enable();
	     system.bindStore(systemStore);
	   
	  },
	  onSystemSelect:function(combo, record){
		
		  var refs = this.getReferences(),
		  	  org = refs.orgName,
		  	  store = org.store,
		  	  systemId = record.get('id');
		  var form =this.getView();
		     if(form !=null && !form.isResubmit){
		    	 org.reset();
		    
		     }
		  
		     org.enable();
		  var proxy = new Ext.data.proxy.Rest({
			    url: applicationContext+'/rest/org/system/'+combo.getValue(),
			    appendId: true,
			    reader      : {
				    type : 'json',
				    rootProperty: 'org',
				    totalProperty : 'totalCount'
				},
				autoLoad:true
			});
		 
		 
		  store.setProxy(proxy);
		  store.load();
	  },
	  loadSystemStore:function(systemStore, value){
		  var proxy = new Ext.data.proxy.Rest({
			    url: applicationContext+'/rest/system/site/'+ value,
			    appendId: true,
			    reader      : {
				    type          : 'json',
				    rootProperty          : 'system',
				    totalProperty : 'totalCount'
				},
				autoLoad:true
			});
		  
		  systemStore.setProxy(proxy);
		  systemStore.load();
	  },
	  onOrgSelect:function(combo, record){
		
		  var me = this,
		  	  refs = me.getReferences(),
		      systemRefs = refs.systemName,
		      shippingMethod = refs.shippingMethod,
		      freightTerms = refs.freightTerms,
		      freightStore = freightTerms.store,
		  	  shippinStore = shippingMethod.store,
		  	  systemId = systemRefs.getValue(),
		  	  shipingUrl = 'ShippingMethod/'+systemId + '/'+ combo.getValue(),
		  	  freightUrl  ='FreightTerms/'+systemId + '/'+ combo.getValue();
		  
		  me.loadShippingMethodStore(shippinStore, shipingUrl);
		  me.loadShippingMethodStore(freightStore, freightUrl);
		  var form =me.getView();
		     if(form !=null && !form.isResubmit){
		    	 shippingMethod.reset();
		    	 freightTerms.reset();
		     }
		     
		     shippingMethod.enable();
		     freightTerms.enable();
		   
	  },
	  onAfterRenderEditCallout : function(cmp){
	        var me = this;
	        cmp.el.on({
	            delegate: 'div.user-profile-menu-item',
	            click    : function(e,element){
	                var el    = Ext.get(element),
	                    event = el.getAttribute('event');
	                if (event && !el.hasCls('edit-menu-disabled')){
//	                    cmp.destroy();
	                    me.fireEvent(event);
	                }
	            }
	        });
	    },
	  buildMenuTpl : function(){
	    	  var me=this;
	    	 return Ext.create('Ext.XTemplate',
	    	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deleteaddress"">Delete</div>',
	              '</tpl>'
	          );
	       },
	closeWindow: function(){
		Ext.getBody().unmask();
		this.getView().destroy();
		this.runTime.setWindowInEditMode(false);
		var grid=Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
		grid.store.load();
	},
	
	loadShippingMethodStore:function(store, url){
		var response = Ext.Ajax.request({
			async: false,
			url: applicationContext+'/rest/orderconfigurations/orgId/'+url
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
		}else{
			store.removeAll();
		}
	},
	deleteResource:function(record){
		var ID=record.get('id');
		var me=this;
		Ext.Msg.confirm('Alert',AOCLit.deleteAddressMsg,function(btn){
			  if(btn=='yes'){
					Ext.Ajax.request({
							method:'DELETE',
							url:applicationContext+'/rest/address/'+ID,
				        success : function(response, opts) {
							Ext.Msg.alert('Alert Message',AOCLit.deleteAddMsg);
							me.runTime.getActiveGrid().store.load();
				        },
				        failure: function(response, opts) {
		                }
		        	});
			  }
		});
	},
	 HideMandatoryMessage:function(){
		   var createaddress=this.getView();
		   createaddress.down('#messageFieldItemId').setValue('').setVisible(true);
		   createaddress.down('#messageFieldItemId').setHidden('true');
	   },
	  notifyByMessage:function()
	    {
		  var addresssearch=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
		  addresssearch.down('#messageFieldItemId').setValue('').setVisible(true);
		  addresssearch.down('#messageFieldItemId').setHidden('true');
	    }
});