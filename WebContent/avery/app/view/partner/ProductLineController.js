Ext.define('AOC.view.productline.ProductLineController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.productlineMain',
    runTime : AOC.config.Runtime,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper','AOC.view.partner.SystemGrid','AOC.view.partner.OrgGrid'],
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var createproductline=this.getView();
		var panel=createproductline.down('#listPanel');
		var productline=Ext.ComponentQuery.query("#partnerproductlinegriditemId")[0],
		valueObj='',valueObj2='',form=this.getView().down('form'),
		AdvancedPropertiesForm=this.getView().down('#AdvancedPropertiesForm');
		editMode=this.getView().editMode,url='',
		length=0,hiddenProductLineField=this.getView().lookupReference('productLineHidden'),productLineValue=hiddenProductLineField.getValue();
		if(editMode){
			Id=createproductline.productlineId;
			url=applicationContext+'/rest/productLines/'+Id;
			form.updateRecord();
			AdvancedPropertiesForm.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges();
			valueObj2=AdvancedPropertiesForm.getRecord().getChanges();
			var parameters=Ext.JSON.encode(valueObj);
			var parameters=Ext.JSON.encode(valueObj2);
			length=Object.keys(valueObj).length;
			Msg=AOCLit.updateProdLineMsg;
		}
		else{
			var systemcontainer=this.getView().lookupReference('systemcontainer'),
			checkboArray=systemcontainer.checkboArray,currentcheckBox,systemGridStore,orgGridStore;
			var orderSystemInfo=new Array();
			for(var jj=0;jj<checkboArray.length;jj++){
				currentcheckBox=me.getView().lookupReference(checkboArray[jj]);
				if(currentcheckBox.getValue()){
					systemGridStore=me.getView().lookupReference(checkboArray[jj]+'systemGrid').getStore();
					orgGridStore=me.getView().lookupReference(checkboArray[jj]+'orgGrid').getStore();
					var orgInfo=new Array(),currentStore;
					for(var k=0;k<orgGridStore.getCount();k++){
						currentStore=orgGridStore.getAt(k).data;
						orgInfo.push(currentStore);
					}
					systemGridStore.getAt(0).data.orgInfo=orgInfo;
					orderSystemInfo.push(systemGridStore.getAt(0).data);
					
				}
			}
			Id=productline.partnerid;
			partnerName=productline.partnerName;
			var partner='';
			partner={id:Id,partnerName:partnerName};
			url=applicationContext+'/rest/productLines';
			valueObj=form.getValues(false,false,false,true);
			valueObj2=AdvancedPropertiesForm.getValues(false,true,false,true);
			parameters={
					rboId:valueObj.rboId,
					partnerId:Id,
					CSRPrimaryID:valueObj.CSRPrimaryEmail,
					CSRSecondaryID:valueObj.CSRSecondaryEmail,
					waivemoa:valueObj.waivemoa,
					waivemoq:valueObj.waivemoq,
					shipmentsample:valueObj.shipmentsample,
					factorytransfer:valueObj.factorytransfer,
					localbilling:valueObj.localbilling,
					llkk:valueObj.llkk,
					orderSystemInfo:orderSystemInfo,
					productLineType:productLineValue,
					email:valueObj.email
					
		    	};
			methodMode='POST';
			length=1;
			Msg=AOCLit.addProdLineMsg;
		}
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
				    success : function(response, opts) {
				    		var jsonString=Ext.JSON.decode(response.responseText);
				    		var valueExist=jsonString.valueExist;
				    		if(valueExist){
				    			Ext.getBody().unmask();
				    			createproductline.lookupReference('rboName').focus();
				    			createproductline.down('#messageFieldItemId').show();
				    			createproductline.down('#messageFieldItemId').setValue(AOCLit.entryExistMsg);
				    			return false;
				    		}
				    	Ext.getBody().unmask();
				    	createproductline.destroy();
				    	AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			//Ext.Msg.alert('Alert Message',Msg);
			  			//productline.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	createproductline.destroy();
              }
      	});
		}
		else{
				createproductline.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
		}
		this.runTime.setWindowInEditMode(false);
	}
		else{
			createproductline.down('#messageFieldItemId').setValue(AOCLit.editFieldEntryMsg).setVisible(true);
			Ext.getBody().unmask();
	}
    },
	CancelDetails:function()
	{       
		    Ext.getBody().unmask();
			this.getView().destroy();
			this.runTime.setWindowInEditMode(false);
			this.runTime.getActiveGrid().store.load();
	},
	createproductline:function(){
			win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
				modal:true,
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
                	var win=Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
 	      			if(!win){
 	      				var data=e.record;
 	      				 var id=data.id;
 	      			    win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
 	      				modal:true,
 	      				partnerName:me.getView().partnerName,
 	      			    editMode:true,
 	      			    rec:data,
 	      			    productlineId:id,
 	      			    listeners: {
		     	        	'close':function( panel, eOpts ) {
		     	        		 Ext.getBody().unmask();
		     	        		 win.destroy();
		     	            }
 	      			    }
 	      			});
 	      			 win.down('#titleItemId').setValue(AOCLit.editPartProdLine).setVisible(true);
 	      			  win.show();
 	              }
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
	    	Ext.getBody().mask('Loading....');
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
			    		systemcontainer.checkboArray=new Array();
			    		if(jsonString.length==0){
			    			AOC.util.Helper.fadeoutMessage('Success','No System Configured for the selected site. Please select another site');
			    			Ext.getBody().unmask();
			    			return false;
			    		}
			    		
			    		for(var i=0;i<jsonString.length;i++){
			    			systemcontainer.add(me.getSystemContainer(jsonString[i]));
			    			systemcontainer.checkboArray.push(jsonString[i].name);
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
	    			storeId:'systemStore'+selectedSystemArray.id,
	    			data:jsonValue
		      	});
	    		var systemStore=Ext.create('Ext.data.Store',{
	    			fields:['id','name'],
	    			storeId:'systemStore'+selectedSystemArray.id,
	    			data:[{
	    				'csrname':'','systemId':selectedSystemArray.id
	    			}]
	    		});
	    		var orgOrderStore;
	    		if(totalOrgConfigured>0){
	    			orgOrderStore=Ext.create('Ext.data.Store',{
		    			fields:['id','name'],
		    			storeId:'orgStore'+selectedSystemArray.id,
		    			data:[{
		    				'orgCodeId':jsonValue[0].id,'default':true
		    			}]
		    		});
	    		}
	    		return [{
	    			xtype:'checkbox',
	    			boxLabel  : selectedSystemArray.name,
	    			reference  : selectedSystemArray.name,
                    name      :selectedSystemArray.name,
                    inputValue: selectedSystemArray.id,
                    listeners:{
                    	'change':function(cmp,newValue){
                    		var systemGrid=me.getView().lookupReference(cmp.name+'systemGrid'),
                    		orgGrid=me.getView().lookupReference(cmp.name+'orgGrid');
                    		if(newValue){
                    			orgGrid.setDisabled(false);
                    			systemGrid.setDisabled(false);
                    		}else{
                    			orgGrid.setDisabled(true);
                    			systemGrid.setDisabled(true);
                    		}
                    	}
                    }
	    		},{
	    			xtype:'systemgrid',
	    			store:systemStore,
	    			disabled:true,
	    			reference:selectedSystemArray.name+'systemGrid'
	    		},{
	    			xtype:'fieldcontainer',
	    			layout:'hbox',
	    			items:[{
		    			xtype:'orggrid',
		    			width:800,
		    			store:orgOrderStore,
		    			orgStore:orgStore,
		    			uniqueName:selectedSystemArray.name,
		    			maxRecord:totalOrgConfigured,
		    			disabled:true,
		    			reference:selectedSystemArray.name+'orgGrid'
		    		},{
	    				xtype:'button',
	    				margin:'40 0 0 20',
	    				maxRecord:totalOrgConfigured,
	    				text:'Plus',
	    				listeners:{
	    					'click':function(cmp){
	    						if(orgOrderStore.getCount()<totalOrgConfigured){
	    							orgOrderStore.add({orgCodeId:''});
	    							orgOrderStore.commit();
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
	    	}
	    	
});