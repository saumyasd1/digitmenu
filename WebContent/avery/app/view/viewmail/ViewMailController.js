Ext.define('AOC.view.viewmail.ViewMailController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.viewMailController',
  
    runTime : AOC.config.Runtime,
    //emailGridRecordArray:[],
    
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
        	    disregard: function(cmp) {}
            }
        });
        //Adding functionality related to Menu item visibility
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
  		  callout.calloutArrowLocation='bottom-left'; 
  		  callout.relativePosition='b-t';
  		  callout.relativeOffsets = [75, 0];
  	  }else{
  		  callout.calloutArrowLocation='top-left'; 
  		  callout.relativePosition='t-b';
  		callout.relativeOffsets = [75, 5];
  	  }
        callout.show();
    },
    
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="disregard"">Disregard</div>',
            '</tpl>'
        );
    },
    
    backButton:function() {
    	var owner = this.getView().ownerCt,
    		itemId = '#'+owner.itemId;
    	
    	if(owner.itemId=='emailPanel'){  		   
    	   var panel=Ext.ComponentQuery.query('#emailPanel')[0];
    	   var emailManagement=panel.down('#EmailMangementitemId');
    	   panel.getLayout().setActiveItem(emailManagement);
    	   emailManagement.getView().refresh();
    	   emailManagement.getStore().load();
    	}
    	else if(owner.itemId=='taskManagerPanel'){  		   
    	   var panel=Ext.ComponentQuery.query('#taskManagerPanel')[0];
    	   var taskManager=panel.down('#TaskManagerGriditemId');
    	   panel.getLayout().setActiveItem(taskManager);
    	   taskManager.getView().refresh();	
    	   taskManager.getStore().load();
    	}
    },
  	
  	onSaveBtnClicked:function(btn){	
  		Ext.getBody().mask('Saving....');
  		var me = this,
  			gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
  			editorPlugin = gridView.editingPlugin;
  		
  		if(editorPlugin.editing){
  			gridView.focus();
  		}
  		
  		var len = gridView.emailGridRecordArray.length;
  		
  		for(var i=0; i<len; i++){
  			var rec = gridView.emailGridRecordArray[i];
  			if((rec.fileContentType == 'Order' && !rec.productLineId) || (rec.fileContentType == 'AdditionalData' && !rec.productLineId)){
  				Ext.Msg.alert(AOCLit.warningTitle,'Please select Partner Data Structure.');
  	  			Ext.getBody().unmask();
  	  			return;
  			}
  		}
  		
		var parameters = Ext.JSON.encode({json:gridView.emailGridRecordArray});
  		
  		Ext.Ajax.request({
	        method: 'PUT',
	        jsonData: parameters,
	        url: applicationContext+'/rest/orderattachements/updateattachments',
	        success: function(response, opts) {
	           
	        	gridView.emailGridRecordArray = [];
	            Ext.getBody().unmask();
	            me.verifyIdentifiedDisregardRecords();
	            Ext.Msg.alert('Success', 'Current state saved successfully');
	            gridView.store.load();
	            
	        },
	        failure: function(response, opts) {
	            var msg = response.responseText;
	            msg = msg.replace("Exception:", " ");
	            Ext.Msg.alert('Alert Message', msg);
	            Ext.getBody().unmask();
	        }
	    });
  		
  	},
  	
  	onDataStructureChange:function(combobox, newValue, eOpts){
  		 var dataStructureCombo = Ext.ComponentQuery.query('#dataStructureItemId')[0];
  		 var button = Ext.ComponentQuery.query('#processButton')[0];

  		 if(!Ext.isEmpty(newValue)) {
  			dataStructureCombo.setHidden(false).setDisabled(false);
  		    button.setHidden(true).setDisabled(true);
	    }
  		 else {
  			dataStructureCombo.setHidden(true).setDisabled(true);
  		    button.setHidden(true).setDisabled(true);
	    }
	},
	
	onProcessOrderBtnClicked:function(){
		var me = this;
		Ext.Msg.show({
		    title:'Process Order',
		    message: 'Are you sure, you want to process order?',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	var gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
						trackingId = gridView.trackingId,
						obj = {id:trackingId, status:gridView.isIdentifiedFlag ? AOCLit.identifiedStatus  :''};
				
					Ext.getBody().mask('Processing Order....');
					Ext.Ajax.request({
						method: 'PUT',
				        jsonData: Ext.JSON.encode(obj),
				        url: applicationContext+'/rest/emailqueue/identified/' +trackingId,
				        success: function(response, opts) {
				            var jsonString = Ext.JSON.decode(response.responseText);
				            Ext.getBody().unmask();
				            AOC.util.Helper.fadeoutMessage('Success','Order Proccessed successfully');
				            me.backButton();
				        },
				        failure: function(response, opts) {
				            var msg = response.responseText;
				            msg = msg.replace("Exception:", " ");
				            Ext.Msg.alert('Alert Message', msg);
				            Ext.getBody().unmask();
				        }
				    });
		        } 
		    }
		});
	},
	editEmailAttachmentGridColumn:function(editor, context){
		var me = this,
			record = context.record
			grid = editor.grid,
			obj = {
				productLineId:record.get('dataStructureNameId'), 
				id:record.get('id'),
				status:1,
				fileContentType:record.get('contentType'),
				additionalDataFileKey:record.get('additionalDataFileKey')
			},
			len = grid.emailGridRecordArray.length;
		
		if(len == 0){
			grid.emailGridRecordArray.push(obj);
			return;
		}
		
		for(var i = 0; i < len; i++){
			if(grid.emailGridRecordArray[i].id == record.get('id')){
				grid.emailGridRecordArray[i].productLineId = record.get('dataStructureNameId');
				grid.emailGridRecordArray[i].fileContentType = record.get('contentType');
				grid.emailGridRecordArray[i].additionalDataFileKey = record.get('additionalDataFileKey');
				return;
			}
		}
		
		grid.emailGridRecordArray.push(obj);
	},
	
	verifyIdentifiedDisregardRecords:function(){
		var me = this,
			gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
			store = gridView.store,
			refs = this.getReferences(),
			saveBtn = refs.saveEmailAttachmentBtn;
			downLoadAttachmentBtn = refs.downLoadAttachmentBtn,
			totalCount = store.getCount(),
			totalIdentifiedCount = 0,
			totalUnidentifiedCount = 0,
			totalDisregardCount = 0,
			totalAdditionalFile = 0;
		
		store.each(function(record){
			if(record.get('contentType') == 'Additional File'){
				totalAdditionalFile++;
			}
			if(record.get('status') == AOCLit.emailAttachmentInfoGridIdentifiedStatus){
				totalIdentifiedCount++;
			}else if(record.get('status') == AOCLit.emailAttachmentInfoGridUnIdentifiedStatus){
				totalUnidentifiedCount++;
			}else{
				totalDisregardCount++;
			}
		});
		
		if(totalCount > 0){
			saveBtn.setDisabled(false);
			downLoadAttachmentBtn.setDisabled(false);
			
			if(totalCount == totalAdditionalFile){
				gridView.isIdentifiedFlag = false;
				me.enableDisableProcessBtn(true);
				return;
			}
			if(totalCount == totalIdentifiedCount){
				gridView.isIdentifiedFlag = true;
			}
			//If all record are identified or identified+disregard then processorder btn will enabled
			if(totalCount == totalIdentifiedCount || (totalIdentifiedCount > 0 && totalCount == (totalIdentifiedCount + totalDisregardCount))){
				me.enableDisableProcessBtn(false);
				gridView.isIdentifiedFlag = true;
			}else{
				gridView.isIdentifiedFlag = false;
				//if all recrod are unindetified/Disregard then disable process order btn
				me.enableDisableProcessBtn(true);
			}
		}else{
			downLoadAttachmentBtn.setDisabled(true);
			saveBtn.setDisabled(true);
			me.enableDisableProcessBtn(true);
		}
		//If status is identified then save and process order btn will disabled
		if(gridView.status == AOCLit.emailIdentifiedStatus){ 
			saveBtn.setDisabled(true);
			me.enableDisableProcessBtn(true);
		}else{
			//If emailQueue status is Unidentified or totalCount > 0 then save btn will enabled
			if(gridView.status == AOCLit.emailUnidentifiedStatus && totalCount > 0){
				saveBtn.setDisabled(false);
			}else{
				saveBtn.setDisabled(true);
			}
		}
	},
	
	enableDisableProcessBtn:function(showFlag){
		var refs = this.getReferences(),
			button = refs.processOrderBtn;
		button.setDisabled(showFlag);
	},
	
	onViewShow:function(){
		var me = this,
			gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
			store = gridView.store;
		
		store.on('load',function(){
			me.verifyIdentifiedDisregardRecords();
		});
	},
	
	onEmailAttachmentGridCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='emailAttachmentLink'){
			this.downLoadFile(record.get('filePath'), record.get('fileName'));
		}
	},
	
	downLoadFile:function(filePath, fileName){
		var form = Ext.create('Ext.form.Panel', { 
			standardSubmit: true,   
			url : applicationContext+'/rest/orderattachements/download/'+filePath +'/'+fileName
		});
		form.submit({
			method : 'GET'
		});
	},
	
	onDownloadAttachmentBtnClick:function(){
		var me = this,
			refs = me.getReferences(),
			gridView = refs.emailAttachmentInfoGrid,
			recordsArray = gridView.getSelectionModel().getSelection(),
			len = recordsArray.length;
		
		if(len > 0){
			var interVal = setInterval(function(){
				if(len >= 0 && recordsArray[len-1]){
					me.downLoadFile(recordsArray[len-1].get('filePath'),recordsArray[len-1].get('fileName'));
					len = len-1;
				}else{
					clearInterval(interVal);
				}
				
			},1000);
		}else{
			Ext.Msg.alert(AOCLit.warningTitle, AOCLit.selectAttachmentFileMsg);
		}
	},
	//<debug>
	//(Amit Kumar)Add assignCsrBtn functionality for taskmanager screen
	//</debug>
	onAssignCSRBtnClicked:function(btn){
		var me = this,
			view = me.getView(),
			taskManagerGrid = view.contextGrid,
			assignCsrWin = Ext.create('AOC.view.taskmanager.AssignCSRWindow',{
				callback:function(rec){
					assignCsrWin.mask(AOCLit.pleaseWaitTitle);
			    	Ext.Ajax.request({
			    		method:'GET',
			    		url: applicationContext+'/rest/emailqueue/assigncsr/'+rec.recordId+'/'+rec.assignCSRId,
					    success : function(response, opts) {
					    	assignCsrWin.unmask();
					  		Ext.Msg.alert('Success','CSR assigned successfully');
					  		assignCsrWin.close();
					  		me.backButton();
					  		taskManagerGrid.store.load();
				        },
				        failure: function(response, opts) {
				        	assignCsrWin.unmask();
						}
					});
				},
				recordId:view.currentRecordId
			});
		assignCsrWin.show();
	}
});
