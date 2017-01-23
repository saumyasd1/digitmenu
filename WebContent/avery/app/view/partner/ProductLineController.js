Ext.define('AOC.view.productline.ProductLineController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.productlineMain',
    runTime : AOC.config.Runtime,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper','AOC.view.partner.SystemGrid','AOC.view.partner.OrgGrid'],
    SaveDetails:function(){
		Ext.getBody().mask('Saving....').dom.style.zIndex = '99999';
		var me=this;
		var createproductline=this.getView();
		var panel=createproductline.down('#listPanel'),advancedPropertiesForm=this.getView().down('#AdvancedPropertiesForm');
		if(!panel.getForm().isValid() || !advancedPropertiesForm.getForm().isValid()){
			var getFormInvalidFields=this.getFormInvalidFields(panel.getForm());
			createproductline.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
			Ext.getBody().unmask();
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
				if(currentOrgGrid.isOrgGridNotValid){
					Ext.getBody().unmask();
					createproductline.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryCellMsg).setVisible(true);
					return false;
				}
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
			valueObj=form.getValues(false,true,false,true);
			length=Object.keys(valueObj).length;
			Msg=AOCLit.updateProdLineMsg;
			parameters={
					rboId:valueObj.rboId,
					partnerId:Id,
					CSRPrimaryId:valueObj.CSRPrimaryId,
					CSRSecondaryId:valueObj.CSRSecondaryId,
					waiveMOA:valueObj.waiveMOA,
					waiveMOQ:valueObj.waiveMOQ,
					shipmentSample:valueObj.shipmentSample,
					factoryTransfer:valueObj.factoryTransfer,
					localBilling:valueObj.localBilling,
					LLKK:valueObj.LLKK,
					orderSystemInfo:orderSystemInfo,
					productLineType:productLineValue,
					
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
					llkk:valueObj.LLKK,
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
				attachmentIdentifier_4:dataModel.attachmentIdentifier_4,
		};
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
				    			createproductline.lookupReference('dataStructureName').focus();
				    			createproductline.down('#messageFieldItemId').show();
				    			createproductline.down('#messageFieldItemId').setValue(AOCLit.entryExistMsg);
				    			return false;
				    		}
				    	Ext.getBody().unmask();
				    	createproductline.destroy();
				    	AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			productline.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	createproductline.destroy();
              }
      	});
		this.runTime.setWindowInEditMode(false);
    },
	CancelDetails:function()
	{       
		    Ext.getBody().unmask();
			this.getView().destroy();
			this.runTime.setWindowInEditMode(false);
			this.runTime.getActiveGrid().store.load();
	},
	createproductline:function(){
		var viewModel=Ext.create('Ext.app.ViewModel',{
		});
			win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
				modal:true,
				viewModel:viewModel,
				partnerName:this.getView().partnerName
			});
			win.down('#titleItemId').setValue(AOCLit.addPartProdLine).setVisible(true);
			win.show();
       
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
                	
 	      				var data=e.record;
 	      				 var id=data.id;
 	      			 Ext.Ajax.request({
							method:'GET',
							url:applicationContext+'/rest/productLines/'+id,
							success : function(response, opts) {
								var jsonString=Ext.JSON.decode(response.responseText).ProductLine;
								var viewModel=Ext.create('Ext.app.ViewModel',{
									data:jsonString
								});
								var win=Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
			 	      			if(!win){
									win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
				 	      				modal:true,
				 	      				partnerName:me.getView().partnerName,
				 	      			    editMode:true,
				 	      			    viewModel:viewModel,
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
			 	      			win.down('#titleItemId').setValue(AOCLit.editPartProdLine).setVisible(true);
			 	      			win.show();
				        },
				        failure: function(response, opts) {
				        	AOC.util.Helper.fadeoutMessage('Failure','Error while trying to fetch partner data structure information from the server.');
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
     				        	AOC.util.Helper.fadeoutMessage('Success',AOCLit.deleteProdLineMsg);
     							//Ext.Msg.alert('Alert Message','<b>Product Line Deleted Succesfully</b>');
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
	    	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deleteproductline"">Delete</div>',
	              '</tpl>'
	          );
	       },
	openAdvancedSearchWindow:function(e, t, eOpts)
	{
		 var temp=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
if(!temp){
		 temp = Ext.create('AOC.view.base.BaseWindow',{
				 	height:400,
					width:300,
					itemId:'productlinesearchWindowItemId',
					layout: 'fit',
					draggable: false,
					modal:true,
					closeAction:'hide',
				 	items : [{  xtype : 'productlineadvancesearch' }]
			 });
        }
			if (Ext.isIE || Ext.isGecko) {
			    browser = "IE";
			    var d = Ext.get(e.getTarget());
			    var width = temp.width; //width of advanced search panel
			   // box = this.getBox();
			    width = width - 25; //remove margin
			    x = d.getX();
			    y = d.getY();
			    temp.showAt(x - width, y + 26);
			}
			else if (Ext.isChrome || Ext.isSafari) {
				 browser = "Chrome";
				 var d = Ext.get(e.getTarget());
				 var width = temp.width;
				 width=width-24;
				 x=d.getX();
				 y=d.getY();
	        		 temp.show();
			}
			return false;
		},
  backButton:function()
  {
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
	clearAdvancedSerach:function(widget){
		 var temp=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
		 temp.destroy();
		 var grid=this.getView();
		   	var store = grid.store;
			store.clearFilter();
			widget.setVisible(false);
			var temp=grid.down('#advancesearchbutton');
		    temp.enable();
	},
	getQuickSearchResults:function(cmp){
		var store=this.getView().store;
		   var value=cmp.getValue();
		   if(value!=null && value!=''){
	       store.proxy.setFilterParam('query');
	       var parameters='{"productLineType":"'+value+'"}';
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
		   }
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
			    			AOC.util.Helper.fadeoutMessage('Success','No System Configured for the selected site. Please select another site');
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
	    		},{
	    			xtype:'systemgrid',
	    			store:systemStore,
	    			border:true,
	    			margin : '0 0 0 0',
	    			hidden:true,
	    			reference:selectedSystemArray.name+'systemGrid'
	    		},{
	    			xtype:'fieldcontainer',
	    			layout:'hbox',
	    			border:true,
	    			margin : '0 0 0 0',
	    			items:[{
		    			xtype:'orggrid',
		    			width:800,
		    			store:orgOrderStore,
		    			style:'border:solid 1px #ccc;',
		    			orgStore:orgStore,
		    			uniqueName:selectedSystemArray.name,
		    			maxRecord:totalOrgConfigured,
		    			hidden:true,
		    			systemId:selectedSystemArray.id,
		    			reference:selectedSystemArray.name+'orgGrid'
		    		},{
	    				xtype:'button',
	    				margin:'40 0 0 20',
	    				maxRecord:totalOrgConfigured,
	    				text:'Plus',
	    				ui:'white', 
	    				reference:selectedSystemArray.name+'Plus',
	    				hidden:true,
	    				flex:0.5,
	    				listeners:{
	    					'click':function(cmp){
	    						if(orgOrderStore.getCount()<totalOrgConfigured){
	    							orgOrderStore.add({orgCodeId:'',newRecord:true,isDefault:false});
	    							//orgOrderStore.commit();
	    						}else{
	    							AOC.util.Helper.fadeoutMessage('Success','Cannot add any more rows.');
	    						}
	    					}
	    				}
	    			}]
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
	    	afterWindowRender:function(){
	    		var me=this,view=this.getView(),combo=view.lookupReference('productLineTypeCombo'),unique=view.lookupReference('unique'),
	    		mixed=view.lookupReference('mixed'),
	    		productLineHidden=view.lookupReference('productLineHidden'),data=view.getViewModel().getData();
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
									layout: 'column',
									margin : '0 0 5 0',
									defaults:{
										labelSeparator:'',
										labelStyle:Settings.config.defaultFormLabelStyle,
										labelAlign:Settings.form.defaultLabelAlign,
										labelWidth:150,
										width:450
									},
									items:[
										{
											xtype:'combo',
											itemId:'FileType'+count,
											name: 'fileType'+count,
											allowBlank:allowBlank,
											fieldLabel:'File Type ' +nameCount,
											maxLength : '50',
											store:[['pdf','pdf'],['xls/xlxs','xls/xlxs'],['txt','txt']],
											bind:'{attachmentFileNameExtension_'+count+'}',
											editable:false,
											itemId:'attachmentFileNameExtension_'+count+'',
											enforceMaxLength: true
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
									margin : '0 0 5 0',
									defaults:{
										labelSeparator:'',
										labelStyle:Settings.config.defaultFormLabelStyle,
										labelAlign:Settings.form.defaultLabelAlign,
										labelWidth:150,
										width:450
									},
									items:[
										{
											xtype:'textfield',
											itemId:'SchemaId'+count,
											name: 'schemaId'+count,
											bind:'{attachmentSchemaID_'+count+'}',
											fieldLabel:'Schema ID '+nameCount
										},
										{
											xtype:'textfield',
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
									labelAlign:Settings.form.defaultLabelAlign,
									name: 'matchType'+count,
									fieldLabel:'Match Type '+nameCount,
									bind:'{attachmentIdentifier_'+count+'}',
									labelSeparator:'',
									labelWidth : 150,
									width : 450
								}]
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
			 }
	    	
});