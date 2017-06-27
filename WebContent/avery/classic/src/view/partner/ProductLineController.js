Ext.define('AOC.view.productline.ProductLineController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.productlineMain',
    runTime : AOC.config.Runtime,
    active:false,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper'],
    init: function () {
        var me = this;
        me.menuTpl = me.buildMenuTpl();
    },
    onSaveDetails:function(){
		Ext.getBody().mask('Saving....').dom.style.zIndex = '99999';
		var me=this;
		var createproductline=this.getView();
		refs = me.getReferences();
		advancedPropertiesForm = refs.advancedPropertiesForm,
		orderForm = refs.orderForm,
		additionalData = refs.additionalData;
		
		var panel=createproductline.down('#listPanel'),advancedPropertiesForm=this.getView().down('#AdvancedPropertiesForm');
		if(!panel.getForm().isValid() || !advancedPropertiesForm.getForm().isValid()){
			var getFormInvalidFields=this.getFormInvalidFields(panel.getForm());
			createproductline.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
			Ext.getBody().unmask();
			advancedPropertiesForm.expand();
	    	orderForm.expand();
	    	additionalData.expand();
			return false;
		}
		var productline=Ext.ComponentQuery.query("#partnerproductlinegriditemId")[0],
		valueObj='',form=this.getView().down('form');
		editMode=this.getView().editMode,url='',site=this.getView().lookupReference('site'),
		length=0,hiddenProductLineField=this.getView().lookupReference('productLineHidden'),productLineValue=hiddenProductLineField.getValue();
		var systemcontainer=this.getView().lookupReference('systemcontainer'),
		checkboArray=systemcontainer.checkboArray,currentcheckBox,systemGridStore,orgGridStore,currentOrgGrid='',
		currentSystemGrid='';
		var orderSystemInfo=new Array(),isCheckBoxSelected=false;
		for(var jj=0;jj<checkboArray.length;jj++){
			currentcheckBox=me.getView().lookupReference(checkboArray[jj]);
			if(currentcheckBox && currentcheckBox.getValue()){
				//renderer:'validationRendered'
				isCheckBoxSelected=true;
				currentSystemGrid=me.getView().lookupReference(checkboArray[jj]+'systemGrid');
				systemGridStore=currentSystemGrid.getStore();
				currentOrgGrid=me.getView().lookupReference(checkboArray[jj]+'orgGrid');
				currentSystemGrid.showValidationError=true;
				currentSystemGrid.getView().refresh();
				if(currentSystemGrid.isSystemGridNotValid){
					Ext.getBody().unmask();
					createproductline.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryCellMsg).setVisible(true);
					return false;
				}
				orgGridStore=currentOrgGrid.getStore();
				var orgInfo=new Array(),currentStore;
				currentOrgGrid.showValidationError=true;
				currentOrgGrid.getView().refresh();
				for(var k=0;k<orgGridStore.getCount();k++){
					currentStore=orgGridStore.getAt(k).data;
					orgInfo.push(currentStore);
				}
				systemGridStore.getAt(0).data.orgInfo=orgInfo;
				orderSystemInfo.push(systemGridStore.getAt(0).data);
				
			}
		}
		if(!isCheckBoxSelected){
			Ext.getBody().unmask();
			createproductline.down('#messageFieldItemId').setValue(AOCLit.checkSystemChechBoxMsg).setVisible(true);
			return false;
		}
		var viewModel=this.getView().getViewModel(),dataModel=viewModel.getData(),
		attachmentRequiredField=this.getView().lookupReference('attachmentRequired');
		var attachmentRequired=attachmentRequiredField.getValue().attachmentRequired;
		if(editMode){
			Id=createproductline.productlineId;
			url=applicationContext+'/rest/productLines/'+Id;
			methodMode='PUT';
			userId = AOCRuntime.getUser().id,
			valueObj=form.getValues(false,true,false,true);
			length=Object.keys(valueObj).length;
			Msg=AOCLit.updateProdLineMsg;
			parameters={
					rboId:valueObj.rboId,
					partnerId:Id,
					csrPrimaryId:valueObj.csrPrimaryId,
					csrSecondaryId:valueObj.csrSecondaryId,
					waiveMOA:valueObj.waiveMOA,
					waiveMOQ:valueObj.waiveMOQ,
					shipmentSample:valueObj.shipmentSample ? valueObj.shipmentSample: false,
					factoryTransfer:valueObj.factoryTransfer ? valueObj.factoryTransfer: false,
					localBilling:valueObj.localBilling ? valueObj.localBilling: false,
					llkk:valueObj.llkk ? valueObj.llkk: false,
					sizeCheck:valueObj.sizeCheck ? valueObj.sizeCheck: false,
					fiberpercentagecheck:valueObj.fiberpercentagecheck? valueObj.fiberpercentagecheck: false,
					orderSystemInfo:orderSystemInfo,
					productLineType:productLineValue,
					userId:userId,
					siteChanged:site.siteChanged
		    	};
		}
		else{
			
			Id=productline.partnerid;
			partnerName=productline.partnerName;
			partner={id:Id,partnerName:partnerName};
			url=applicationContext+'/rest/productLines';
			valueObj=form.getValues(false,false,false,true);
			methodMode='POST';
			length=1;
			Msg=AOCLit.addProdLineMsg;
			parameters={
					rboId:valueObj.rboId,
					partnerId:Id,
					CSRPrimaryID:valueObj.CSRPrimaryId,
					CSRSecondaryID:valueObj.CSRSecondaryId,
					waivemoa:valueObj.waiveMOA,
					waivemoq:valueObj.waiveMOQ,
					shipmentsample:valueObj.shipmentSample,
					factorytransfer:valueObj.factoryTransfer,
					localbilling:valueObj.localBilling,
					llkk:valueObj.llkk,
					sizeCheck:valueObj.sizeCheck,
					fiberpercentagecheck:valueObj.fiberpercentagecheck,
					orderSystemInfo:orderSystemInfo,
					productLineType:productLineValue
		    	};
		}
		var secondParam={
				emailSubjectProductLineMatch:dataModel.emailSubjectProductLineMatch,
				email:valueObj.email,
				emailSubjectRBOMatch:dataModel.emailSubjectRBOMatch,
				emailBodyProductLineMatch:dataModel.emailBodyProductLineMatch,
				emailBodyRBOMatch:dataModel.emailBodyRBOMatch,
				fileRBOMatch:dataModel.fileRBOMatch,
				fileProductlineMatch:dataModel.fileProductlineMatch,
				fileOrderMatch:dataModel.fileOrderMatch,
				orderFileNameExtension:dataModel.orderFileNameExtension,
				orderFileNamePattern:dataModel.orderFileNamePattern,
				orderMappingID:dataModel.orderMappingID,
				orderSchemaID:dataModel.orderSchemaID,
				attachmentFileNameExtension_1:dataModel.attachmentFileNameExtension_1,
				attachmentFileNamePattern_1:dataModel.attachmentFileNamePattern_1,
				attachmentSchemaID_1:dataModel.attachmentSchemaID_1,
				attachmentMappingID_1:dataModel.attachmentMappingID_1,
				attachmentIdentifier_1:dataModel.attachmentIdentifier_1,
				dataStructureName:dataModel.dataStructureName,
				active:dataModel.active,
				attachmentRequired:attachmentRequired,
				fileOrderMatchCell:dataModel.fileOrderMatchCell,
				fileOrderMatchSheet:dataModel.fileOrderMatchSheet,
				fileOrderMatch:dataModel.fileOrderMatch,
				fileRBOCellMatch:dataModel.fileRBOCellMatch,
				fileRBOSheetMatch:dataModel.fileRBOSheetMatch,
				attachmentFileOrderMatchCell:dataModel.attachmentFileOrderMatchCell,
				attachmentFileOrderMatchSheet:dataModel.attachmentFileOrderMatchSheet,
				attachmentFileOrderMatch:dataModel.attachmentFileOrderMatch,
				attachmentFileProductlineMatchCell:dataModel.attachmentFileProductlineMatchCell,
				attachmentFileProductlineMatchSheet:dataModel.attachmentFileProductlineMatchSheet,
				attachmentFileProductlineMatch:dataModel.attachmentFileProductlineMatch,
				fileProductlineCellMatch:dataModel.fileProductlineCellMatch,
				fileProductlineSheetMatch:dataModel.fileProductlineSheetMatch,
				attachmentFileNameExtension_2:dataModel.attachmentFileNameExtension_2,
				attachmentFileNamePattern_2:dataModel.attachmentFileNamePattern_2,
				attachmentSchemaID_2:dataModel.attachmentSchemaID_2,
				attachmentMappingID_2:dataModel.attachmentMappingID_2,
				attachmentIdentifier_2:dataModel.attachmentIdentifier_2,
				attachmentFileNameExtension_3:dataModel.attachmentFileNameExtension_3,
				attachmentFileNamePattern_3:dataModel.attachmentFileNamePattern_3,
				attachmentSchemaID_3:dataModel.attachmentSchemaID_3,
				attachmentMappingID_3:dataModel.attachmentMappingID_3,
				attachmentIdentifier_3:dataModel.attachmentIdentifier_3,
				attachmentFileNameExtension_4:dataModel.attachmentFileNameExtension_4,
				attachmentFileNamePattern_4:dataModel.attachmentFileNamePattern_4,
				attachmentSchemaID_4:dataModel.attachmentSchemaID_4,
				attachmentMappingID_4:dataModel.attachmentMappingID_4,
				attachmentIdentifier_4:dataModel.attachmentIdentifier_4
		};
		secondParam.active = me.active;
		Ext.merge(parameters,secondParam);
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
				    success : function(response, opts) {
				    		var jsonString=Ext.JSON.decode(response.responseText);
				    		var valueExist=jsonString.valueExist;
				    		if(valueExist){
				    			Ext.getBody().unmask();
				    			createproductline.down('#dataStructureName').focus();
				    			createproductline.down('#messageFieldItemId').show();
				    			createproductline.down('#messageFieldItemId').setValue(AOCLit.entryExistMsg);
				    			return false;
				    		}
				    	Ext.getBody().unmask();
				    	createproductline.destroy();
				    	Helper.showToast('Success',Msg);
			  			productline.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Helper.showToast('validation',Msg);
		        	Ext.getBody().unmask();
		        	createproductline.destroy();
              }
      	});
		this.runTime.setWindowInEditMode(false);
    },
    onCancelDetails:function(){       
	    Ext.getBody().unmask();
		this.getView().destroy();
		this.runTime.setWindowInEditMode(false);
		this.runTime.getActiveGrid().store.load();
	},
	createproductline:function(){
		var viewModel=Ext.create('Ext.app.ViewModel',{});
		
		var win = Ext.create('AOC.view.partner.CreatePartnerProductLine',{
			viewModel:viewModel,
			partnerName:this.getView().partnerName,
			title:AOCLit.addPartProdLine
		});
		win.show();
	},
	onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me = this;
	      var callout = Ext.widget('callout', {
	          cls: 'white more-menu-item-callout extra',
	          html: me.menuTpl.apply(record.data),
	          target: e.target,
	          calloutArrowLocation: 'top-left',
	          relativePosition: 't-b',
	          relativeOffsets: [52,23],
	          dismissDelay: 0,
	          listeners: {
                afterrender : me.onAfterRenderEditCallout,
                edit: function(cmp){
      				var data = e.record,
      					id=data.id;
      				
 	      			 Ext.Ajax.request({
						method:'GET',
						url:applicationContext+'/rest/productLines/'+id,
						success : function(response, opts) {
							var jsonString=Ext.JSON.decode(response.responseText).ProductLine;
							var viewModel=Ext.create('Ext.app.ViewModel',{
								data:jsonString
							});
							var win = Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
		 	      			if(!win){
								win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
			 	      				partnerName:me.getView().partnerName,
			 	      			    editMode:true,
			 	      			    viewModel:viewModel,
			 	      			    title:AOCLit.editPartProdLine,
			 	      			    rec:jsonString,
			 	      			    productlineId:id,
			 	      			    listeners: {
					     	        	'close':function( panel, eOpts ) {
					     	        		 Ext.getBody().unmask();
					     	        		 win.destroy();
					     	            }
			 	      			    }
			 	      			});
		 	      			}
		 	      			win.show();
				        },
				        failure: function(response, opts) {
				        	Helper.showToast('failure','Error while trying to fetch partner data structure information from the server.');
		                }
		        	});
 	      			 
                	callout.destroy();
                },
                viewPartnerDataStructure:function(cmp){
      				var data = e.record,
      					id=data.id;
 	      			 Ext.Ajax.request({
						method:'GET',
						url:applicationContext+'/rest/productLines/'+id,
						success : function(response, opts) {
							var jsonString=Ext.JSON.decode(response.responseText).ProductLine;
							var viewModel=Ext.create('Ext.app.ViewModel',{
								data:jsonString
							});
							var win = Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
		 	      			if(!win){
								win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
			 	      				partnerName:me.getView().partnerName,
			 	      			    editMode:true,
			 	      			    viewModel:viewModel,
			 	      			    title:'View Partner Data Structure',
			 	      			    rec:jsonString,
			 	      			    productlineId:id,
			 	      			    listeners: {
					     	        	'close':function( panel, eOpts ) {
					     	        		 Ext.getBody().unmask();
					     	        		 win.destroy();
					     	            }
			 	      			    }
			 	      			});
		 	      			}
		 	      			win.show();
				        },
				        failure: function(response, opts) {
				        	Helper.showToast('failure','Error while trying to fetch partner data structure information from the server.');
		                }
		        	});
                	callout.destroy();
                },
                deleteproductline: function(cmp){
                	var data=e.record;
	     			    var id=data.id;
	     			    var partner='';
	     			    partner={id:id};
	     			    Ext.MessageBox.confirm('Confirm Action', AOCLit.delPartProdLine, function(response) {
 	     				  if (response == 'yes') {
 	     					Ext.Ajax.request({
     							method:'DELETE',
     							url:applicationContext+'/rest/productLines/'+id,
     				        success : function(response, opts) {
     				        	Helper.showToast('Success',AOCLit.deleteProdLineMsg);
     							me.runTime.getActiveGrid().store.load();
     				        },
     				        failure: function(response, opts) {
     		                }
     		        	});
 	     				  }else if(response == 'no'){
 	     				  return true;
 	     				  }
 	     				  });
 		        	 this.destroy();
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
	    	      '<div style="width: 140px !important;border-bottom: none !important;{[this.getEditAddressStyle(values)]};" class="user-profile-menu-callout {[this.isEditEnableDisable(values)]}"  event="edit">Edit</div>',
	    	      '<div style="width: 140px !important;border-bottom: none !important;{[this.getViewAddressStyle(values)]}" class="user-profile-menu-callout {[this.isViewEnableDisable(values)]}"  event="viewPartnerDataStructure">View</div>',
	              '<div style="width: 140px !important;border-bottom: none {[this.getDeleteAddressStyle(values)]}" class="user-profile-menu-callout {[this.isDeleteEnableDisable(values)]}"  event="deleteproductline">Delete</div>',
	              {
	    		 	isEditEnableDisable: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return 'order-profile-menu-item';
	                    }
	                    return 'user-profile-menu-item';
	                },
	                getEditAddressStyle: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return Helper.getDisableMenuItemStyle();
	                    }
	                    return Helper.getEnableMenuItemStyle();
	                },
	                isDeleteEnableDisable: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return 'order-profile-menu-item';
	                    }
	                    return 'user-profile-menu-item';
	                },
	                getDeleteAddressStyle: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return Helper.getDisableMenuItemStyle();
	                    }
	                    return Helper.getEnableMenuItemStyle();
	                },
	    		 	isViewEnableDisable: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return 'user-profile-menu-item';
	                    }
	                    return 'order-profile-menu-item';
	                },
	                getViewAddressStyle: function (v) {
	                    if (AOCRuntime.getUser().role == 3) {
	                        return Helper.getEnableMenuItemStyle();
	                    }
	                    return Helper.getDisableMenuItemStyle();
	                } 
	              }
	          );
	       },
	  backButton:function() {
		   var panel=Ext.ComponentQuery.query('#partnerPanel')[0];
	       var partnerMangement=panel.down('#PartnerMangementitemId');
	       panel.getLayout().setActiveItem(partnerMangement);
	       partnerMangement.getView().refresh();
	       partnerMangement.getStore().load();
	},
	getProductLineBasedOnSearch:function() {
	 	var valueObj=this.getView().getForm().getValues(false,true);
	 	var FromDate=this.lookupReference('fromDate').getValue();
	 	var ToDate=this.lookupReference('toDate').getValue();
	 	if(FromDate<=ToDate)
	 		{
    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
    		valueObj.datecriteriavalue='createdDate';
		var parameters=Ext.JSON.encode(valueObj);
    	var grid=this.runTime.getActiveGrid();
    	var archievegrid=Ext.ComponentQuery.query('#productLineArchiveGrid')[0];
    	if(archievegrid !=null)
    		{
    		var currentView = Ext.ComponentQuery.query('#archivemanageitemId')[0];
    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
			var grid=archievegrid;
    		}
    	var store=grid.store;
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
            property:'query',
            value:parameters
        });
        grid.down('#clearadvanedsearch').show();
        this.getView().up('window').hide();
	 }
	 	 else
	 		 {
			    var productlinesearch=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
	 	            productlinesearch.down('#messageFieldItemId').setValue(AOCLit.setDateMsg).setVisible(true);
	 		 } 	
	},
	   HideMandatoryMessage:function(){
		   var createproductline=this.getView();
		   createproductline.down('#messageFieldItemId').setValue('').setVisible(true);
		   createproductline.down('#messageFieldItemId').setHidden('true');
	   },
	   notifyByMessage:function()
	    {
		    var productlinesearch=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
		    productlinesearch.down('#messageFieldItemId').setValue('').setVisible(true);
	    },
	    onSiteSelect:function(cmp){
	    	Ext.getBody().mask('Loading....').dom.style.zIndex = '99999';;
	    	var value=cmp.getValue(),me=this;
	    	Ext.Ajax.request( {
				method: 'GET',
			    url : applicationContext+'/rest/system/site/'+value,
			    success : function(response, opts) {
			    	var systemContainer=me.getView().lookupReference('systemcontainer'),
			    	itemsTobeRemoved=systemContainer.items.items;
			    	for(var j=itemsTobeRemoved.length-1;j>=0;j--){
			    		systemContainer.remove(itemsTobeRemoved[j]);
			    	}
			    		var jsonString=Ext.JSON.decode(response.responseText),systemcontainer=me.getView().lookupReference('systemcontainer');
			    		if(jsonString.length==0){
			    			Helper.showToast('validation','No System Configured for the selected site. Please select another site');
			    			Ext.getBody().unmask();
			    			return false;
			    		}
			    		checkboArray=new Array();
			    		for(var i=0;i<jsonString.length;i++){
			    			systemcontainer.add(me.getSystemContainer(jsonString[i]));
			    			systemcontainer.checkboArray.push(jsonString[i].name);
			    		}
			    		if(me.getView().editMode)
			    		if(!cmp.changedBefore){
			    			cmp.changedBefore=true;
			    			var view=me.getView(),data=view.getViewModel().getData(),
				    		listOrderSystemInfo=data.listOrderSystemInfo;
				    		if(listOrderSystemInfo.length>0){
				    			for(var i=0;i<listOrderSystemInfo.length;i++){
				    				var system=listOrderSystemInfo[i].varSystem,systemName=system.name,
				    				checkBox=view.lookupReference(systemName);
				    				checkBox.setValue(true),
				    				orgGrid=view.lookupReference(systemName+'orgGrid');
				    				var systemStore=Ext.data.StoreManager.lookup('systemStore'+system.id),orgStore=Ext.data.StoreManager.lookup('orgInfoStore'+system.id);
				    				systemStore.removeAll();
				    				systemStore.add(listOrderSystemInfo[i]);
				    				orgStore.removeAll();
				    				orgStore.add(listOrderSystemInfo[i].listOrgInfo);
					  	    		var index=orgStore.find('default',true);
					  	    		  if(index!=-1){
					  	    			orgGrid.getSelectionModel().select(index);
					  	    		  }
				    			}
				    		}
			    		}else{
			    			cmp.siteChanged=true;		
			    			}
			    	Ext.getBody().unmask();
			  		
	        },
	        failure: function(response, opts) {
	        	
          }
	    })
	    	},
	    	getSystemContainer:function(selectedSystemArray){
	    		var me=this;
	    		var response = Ext.Ajax.request({
		            async: false,
		            url: applicationContext+'/rest/org/system/'+selectedSystemArray.id
		        });
		        var items = Ext.decode(response.responseText);
		      	var jsonValue=Ext.decode(response.responseText),
		      	totalOrgConfigured=jsonValue.length;
		      	var orgStore=Ext.create('Ext.data.Store',{
	    			fields:['id','name'],
	    			storeId:'orgStore'+selectedSystemArray.id,
	    			data:jsonValue
		      	});
		      	
				var index = orgStore.find('id','none','', false, false, true),
					obj = {id:'none',name:'None'};
			
				if(index == -1){
					orgStore.insert(0,new Ext.data.Record(obj));
				}
	    		var systemStore=Ext.create('Ext.data.Store',{
	    			fields:['id','name',{
	    				name:'newRecord',defaultValue:false
	    			}],
	    			storeId:'systemStore'+selectedSystemArray.id,
	    			data:[{
	    				'csrname':'','systemId':selectedSystemArray.id,newRecord:true
	    			}]
	    		});
	    		var orgOrderStore,data='';
	    		if(totalOrgConfigured>0){
	    			data={
		    				'orgCodeId':jsonValue[0].id,'isDefault':true,newRecord:true
	    			};
	    		}
	    			orgOrderStore=Ext.create('Ext.data.Store',{//isDefault
		    			fields:['id','name',{
		    				name:'newRecord',defaultValue:false
		    			},{
		    				name:'isDefault',mapping:'default'
		    			}],
		    			storeId:'orgInfoStore'+selectedSystemArray.id,
		    			data:[data]
		    		});
	    			if(totalOrgConfigured==0)
	    				orgOrderStore.removeAll();
	    		
	    		return [{
	    			xtype:'checkbox',
	    			border:true,
	    			margin : '0 0 0 0',
	    			anchor:'100%',
	    			readOnly : AOCRuntime.getUser().role == 3 ? true : false,
	    			boxLabel  : selectedSystemArray.name,
	    			reference  : selectedSystemArray.name,
                    name      :selectedSystemArray.name,
                    inputValue: selectedSystemArray.id,
                    listeners:{
                    	'change':function(cmp,newValue){
                    		var systemGrid=me.getView().lookupReference(cmp.name+'systemGrid'),
                    		orgGrid=me.getView().lookupReference(cmp.name+'orgGrid'),
                    		plusButton=me.getView().lookupReference(cmp.name+'Plus');
                    		if(newValue){
                    			orgGrid.show();
                    			systemGrid.show();
                    			plusButton.show();
                    		}else{
                    			orgGrid.hide();
                    			systemGrid.hide();
                    			plusButton.hide();
                    		}
                    	}
                    }
	    		},
	    		{
	    			xtype:'systemgrid',
	    			store:systemStore,
	    			border:true,
	    			margin : '0 0 0 0',
	    			style:'border:solid 1px #ccc;',
	    			hidden:true,
	    			anchor:'100%',
	    			reference:selectedSystemArray.name+'systemGrid'
	    		},
	    		{
	    			xtype:'fieldcontainer',
	    			layout:'hbox',
	    			border:false,
	    			anchor:'100%',
	    			margin : '1 0 0 0',
	    			items:[
    			       {
			    			xtype:'orggrid',
			    			flex:1,
			    			store:orgOrderStore,
			    			style:'border:solid 1px #ccc;',
			    			orgStore:orgStore,
			    			uniqueName:selectedSystemArray.name,
			    			maxRecord:totalOrgConfigured,
			    			hidden:true,
			    			systemId:selectedSystemArray.id,
			    			reference:selectedSystemArray.name+'orgGrid'
    			       },
    			       {
		    				xtype:'button',
		    				margin:'45 0 0 5',
		    				maxRecord:totalOrgConfigured,
		    				text:'Org',
		    				cls:'blue-btn',
		    				iconCls:'x-fa fa-plus',
		    				reference:selectedSystemArray.name+'Plus',
		    				hidden:true,
		    				listeners:{
		    					click:function(cmp, pressed){
		    						if((orgOrderStore.getCount() < totalOrgConfigured) && (AOCRuntime.getUser().role != 3) ){
		    							orgOrderStore.add({orgCodeId:'',newRecord:true, isDefault:false});
		    							//orgOrderStore.commit();
		    						}else{
		    							if(AOCRuntime.getUser().role != 3){
		    								Helper.showToast('validation','Cannot add any more rows.');
		    							}
		    						}
		    					}
		    				}
		    			}
			        ]
	    		}]
	    	},
	    	onProductLineChange:function(cmp,newValue){
	    		var productLineCombo=this.getView().lookupReference('productLineTypeCombo'),
	    		hiddenProductLineField=this.getView().lookupReference('productLineHidden');
	    		if(newValue){
	    			productLineCombo.show();
	    			hiddenProductLineField.setValue(productLineCombo.getValue());
	    		}else{
	    			productLineCombo.hide();
	    			hiddenProductLineField.setValue('MIXED');
	    		}
	    	},
	    	onProductLineComboChange:function(cmp,value){
	    		var hiddenProductLineField=this.getView().lookupReference('productLineHidden');
	    		hiddenProductLineField.setValue(value);
	    	},
	    	onElClick:function(e, target){
	    		var me = this,
	    			el = Ext.get(target);
	    		if(AOCRuntime.getUser().role != 3 ){
		    		if(el.hasCls('activeBtn')){
		    			var isToggleOff = el.hasCls('fa-toggle-off');
		    			me.setActiveBox(isToggleOff, el);
		    		  }
	    		}
	    	},
	    	setActiveBox:function(active, el){
	    		var me = this,
	    			el = el ? el : Ext.get(Ext.select('.activeBtn').elements[0]),
	    			onClass = 'activeBtn fa fa-toggle-on',
    				offClass= 'activeBtn fa fa-toggle-off';
	    		
	    		if(active){
    				el.removeCls(offClass);
    				el.addCls(onClass);
    				el.setStyle({
    					color:'green'
    				});
    				me.active = true;
    			}else{
    				el.removeCls(onClass);
    				el.addCls(offClass);
    				el.setStyle({
    					color:'#ccc'
    				});
    				me.active = false;
    			}
	    	},
	    	afterWindowRender:function(win){
	    		win.el.on('click', this.onElClick, this);
	    		
	    		var me=this,roleId = AOCRuntime.getUser().role,
	    			view=this.getView(),combo=view.lookupReference('productLineTypeCombo'),unique=view.lookupReference('unique'),
	    		mixed=view.lookupReference('mixed'),
	    		productLineHidden=view.lookupReference('productLineHidden'),data=view.getViewModel().getData();
	    		me.setActiveBox(data.active);
	    		
	    		if(data.productLineType=='MIXED'){
	    			unique.setValue(false);
	    			mixed.setValue(true);
	    			combo.hide();
	    			productLineHidden.setValue('MIXED');
	    		}else{
	    			unique.setValue(true);
	    			mixed.setValue(false);
	    			combo.show();
	    			productLineHidden.setValue(data.productLineType);
	    		}
	    		this.getView().lookupReference('attachmentRequired').setValue({
	    			attachmentRequired : data.attachmentRequired
                });
	    		if(view.editMode){
	    			var count=AOCLit.maxAdditionalFieldAllowed,highestValuePresent=1;
	    			for(var j=count;j>1;j--){
	    				if(me.hasAdditionFieldData(j)){
	    					highestValuePresent=j;
	    					break;
	    				}
	    			}
	    			if(parseInt(highestValuePresent)>1){
	    				view.additionalFieldCount=highestValuePresent;
	    				for(var jj=highestValuePresent;jj>1;jj--){
	    					view.down('#AdditionalData').add(this.getAttachementContainer(jj));
	    		    		if(jj==AOCLit.maxAdditionalFieldAllowed){
	    		    			view.down('#addMoreAdditionalFieldButton').disable();
	    		    		}
		    			}
	    			}
	    			var viewmodel=view.getViewModel();
	    			view.setViewModel(viewmodel);
	    			view.down('#AdditionalData').updateLayout();
	    		}
	    		if(roleId == 3){
	    			me.setReadOnlyView(true);
	    			me.setButtonDisabled(true);
	    		}
	    		
	    	},
	    	getFormInvalidFields: function(form) {
	    	    var invalidFields = [];
	    	    Ext.suspendLayouts();
	    	    form.getFields().filterBy(function(field) {
	    	        if (field.validate()) return;
	    	        invalidFields.push(field.getName());
	    	    });
	    	    Ext.resumeLayouts(true);
	    	    return invalidFields;
	    	},
	    	getAttachementContainer:function(count){
	    		var nameCount='',allowBlank=false;
	    			if(parseInt(count)>1){
	    				nameCount=count;
	    				allowBlank=true;
	    			}
	    		return [{
					xtype: 'fieldcontainer',
					flex:1,
					layout: {
						type:'hbox',
						align:'stretch'
					},
					margin : '0 0 5 0',
					defaults:{
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.topLabelAlign,
						flex:1
					},
					items:[
						{
							xtype:'combo',
							itemId:'FileType'+count,
							name: 'fileType'+count,
							allowBlank:allowBlank,
							fieldLabel:'File Type ' +nameCount,
							maxLength : '50',
							store:[['pdf','pdf'],['xls/xlsx','xls/xlsx'],['txt','txt']],
							bind:'{attachmentFileNameExtension_'+count+'}',
							editable:false,
							itemId:'attachmentFileNameExtension_'+count+'',
							enforceMaxLength: true,
							blankText:'File Type is required'
						},
						{
							xtype:'textfield',
							itemId:'FileNamePattern'+count,
							name: 'fileNamePattern'+count,
							fieldLabel:'File Name Pattern '+nameCount,
							margin:'0 0 0 10',
							bind:'{attachmentFileNamePattern_'+count+'}'
						}
					]
				},
				{
					xtype: 'fieldcontainer',
					layout: 'column',
					flex:1,
					layout: {
						type:'hbox',
						align:'stretch'
					},
					margin : '0 0 5 0',
					defaults:{
						labelSeparator:'',
						labelStyle:Settings.config.defaultFormLabelStyle,
						labelAlign:Settings.form.topLabelAlign,
						flex:1
					},
					defaultType:'textfield',
					items:[
						{
							itemId:'SchemaId'+count,
							name: 'schemaId'+count,
							bind:'{attachmentSchemaID_'+count+'}',
							fieldLabel:'Schema ID '+nameCount
						},
						{
							itemId:'MappingId'+count,
							name: 'mappingId'+count,
							bind:'{attachmentMappingID_'+count+'}',
							fieldLabel:'Mapping ID '+nameCount,
							margin:'0 0 0 10'
						}
					]
				},
				{
					xtype:'textfield',
					itemId:'MatchType'+count,
					labelStyle:Settings.config.defaultFormLabelStyle,
					labelAlign:Settings.form.topLabelAlign,
					name: 'matchType'+count,
					fieldLabel:'Match Type '+nameCount,
					bind:'{attachmentIdentifier_'+count+'}',
					labelSeparator:'',
					width:450
				}
			]
    	},
    	addMoreAdditionalField:function(cmp){
    		var view=this.getView(),count=parseInt(view.additionalFieldCount)+1;
    		view.additionalFieldCount=count;
    		view.down('#AdditionalData').add(this.getAttachementContainer(count));
    		if(count==AOCLit.maxAdditionalFieldAllowed){
    			cmp.disable();
    		}
    	},
    	onRequiredChange:function (field, newValue, oldValue) {
    		var view=this.getView();
    		view.down('#AdditionalData').setDisabled(newValue);
    		view.down('#addMoreAdditionalFieldButton').setDisabled(newValue);
    		view.down('#attachmentFileNameExtension_1').allowBlank=newValue;
		 },
		 hasAdditionFieldData:function(count){
			 var data=this.getView().getViewModel().getData(),
			 attachmentFileNameExtension='attachmentFileNameExtension_'+count,
			 attachmentFileNamePattern_='attachmentFileNamePattern_'+count,
			 attachmentSchemaID_='attachmentSchemaID_'+count,
			 attachmentMappingID_='attachmentMappingID_'+count,
			 attachmentIdentifier_='attachmentIdentifier_'+count;
			 if(!Ext.isEmpty(data[attachmentFileNameExtension] ) ||
					 !Ext.isEmpty(data[attachmentFileNamePattern_] ) ||
					 	!Ext.isEmpty(data[attachmentSchemaID_] ) ||
					 		!Ext.isEmpty(data[attachmentMappingID_] ) ||
					 			!Ext.isEmpty(data[attachmentIdentifier_] )){
				 return true;
			 }
			 return false;
		 },
		 openAdvancedSearchWindow:function(){
		    	var advanceSearchWin = Ext.create('AOC.view.advsearch.ProductLineAdvanceSearch',{contextGrid:this.getView()});
		    	if(!advanceSearchWin.isVisible()){
		    		advanceSearchWin.show();
		    	}
		 },
		 onSearchBtnClicked:function(btn){
	    	  var view = this.getView(),
	    	  	  refs = view.getReferences(),
	    	  	  form = refs.productlineAdvanceSearchForm.getForm(),
	    	  	  values = form.getValues();
	    	  	  values.datecriteriavalue = 'createdDate';
	    	  	  store = view.contextGrid.store;
	              Helper.advancedSearch(view,values);
		 },
		 clearAdvancedSearch:function(btn){
	        var grid = this.getView();
	        var store = grid.store;
	        store.clearFilter();
	        store.loadPage(1);
	        btn.hide();
		 },
		 getQuickSearchResults: function(cmp) {
	    	var view = this.getView(),
	        value = cmp.getValue();
	        Helper.quickSearch(view,{productLineType: value}),
	        cmp.orderedTriggers[0].show();
		 },
		 getSearchResults: function(cmp, e) {
	        var me = this;
	        if (e.getKey() == e.ENTER) {
	            me.getQuickSearchResults(cmp);
	        }
		 },
		 clearSearchResults: function(cmp) {
	        var grid = this.getView();
	        var store = grid.store;
	        store.clearFilter();
	        store.loadPage(1);
	        cmp.setValue('');
	        cmp.orderedTriggers[0].hide();
		 },
			    setReadOnlyView: function (readOnlyFlag) {
				    var me = this,
				        refs = me.getReferences(),
				        partnerProfileForm = refs.partnerProfileForm,
				        advancePropertiesForm = refs.advancePropertiesForm,
				        orderForm = refs.orderForm,
				        additionalData = refs.additionalData,
				        emailSubjectMatchForm = refs.emailSubjectMatchForm,
				        emailMatchForm = refs.emailMatchForm,
				        fileMatchForm =refs.fileMatchForm,
				        fileMatchAdditionalForm = refs.fileMatchAdditionalForm,

				        //Partner Profile section
				        partnerTextFieldArray = partnerProfileForm.query('[xtype = textfield]'),
				        partnerComboArray = partnerProfileForm.query('[xtype = combo]'),
				        partnerRadioArray = partnerProfileForm.query('[xtype = radio]'),
				        partnerCheckboxArray = partnerProfileForm.query('[xtype = checkboxfield]'),
				        //Advanced properties 
				        advancedPropRadioGroup = advancePropertiesForm.query('[xtype = radiogroup]'),
				        advancedPropButton = advancePropertiesForm.query('[xtype  = button]'),
				        //Order Form
				        orderTextFieldArray = orderForm.query('[xtype = textfield]'),
				        orderComboArray 	= orderForm.query('[xtype = combo]'),
				        //Additional data section
				        additionalDataTextFieldArray = additionalData.query('[xtype = textfield]'),
				        additionalDataComboArray = additionalData.query('[xtype = combo]'),
				        //Email Subject Match section
				        emailSubjectMatchTextFieldArray = emailSubjectMatchForm.query('[xtype = textfield]'),
				        //Email Match form section
				        emailMatchTextFieldArray = emailMatchForm.query('[xtype = textfield]'),
				        //File Match form section
				        fileMatchTextFieldArray = fileMatchForm.query('[xtype = textfield]'),
				        //File Match additional form section 
				        fileMatchAdditionalTextFieldArray = fileMatchAdditionalForm.query('[xtype = textfield]'),
				        
				        tempArray = [].concat(partnerTextFieldArray)
				        			  .concat(partnerComboArray)
			    					  .concat(partnerRadioArray)
			    	                  .concat(partnerCheckboxArray)
			    	                  .concat(advancedPropRadioGroup)
			    	                  .concat(additionalDataComboArray)
			    	                  .concat(orderTextFieldArray)
			    	                  .concat(orderComboArray)
			    	                  .concat(additionalDataTextFieldArray)
			    	                  .concat(emailSubjectMatchTextFieldArray)
			    	                  .concat(emailMatchTextFieldArray)
			    	                  .concat(fileMatchTextFieldArray)
			    	                  .concat(fileMatchAdditionalTextFieldArray);
				    
				    var len = tempArray.length;
				    for (var i = 0; i < len; i++) {
				            tempArray[i].setReadOnly(readOnlyFlag);
				    }
				},
				setButtonDisabled: function(readOnlyFlag){
				    var me = this,
				        refs = me.getReferences(),
				        partnerProfileForm = refs.partnerProfileForm,
				        advancePropertiesForm = refs.advancePropertiesForm,
				        advancedPropButton = advancePropertiesForm.query('[xtype  = button]'),
				        tempArray = [].concat(advancedPropButton);
				    var len = tempArray.length;
				    for (var i = 0; i < len; i++) {
				            tempArray[i].setDisabled(readOnlyFlag);
				    }
				
				},
				onChangeOfSheetCellField:function( obj, newValue, oldValue, eOpts ){
					var me = this,
						refs = me.getView().getReferences(),
						fileMatchForm = refs.fileMatchForm,
						cmpReference = refs[obj.prevItemRef],
						textfieldValue = cmpReference.getValue();
					if(textfieldValue == '') {
						cmpReference.allowBlank = false;
						cmpReference.validateValue(textfieldValue);
					} 
				}
});