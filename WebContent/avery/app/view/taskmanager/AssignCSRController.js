Ext.define('AOC.view.taskmanager.AssignCSRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assigncsrwindow',
    runTime: AOC.config.Runtime,
    
    onSaveBtnClicked:function(btn){
    	
    	var view = this.getView(),
    		ref = this.getReferences(),
    		csrCombo = ref.csrCombo,
    		obj,
    		comboValue = csrCombo.getValue();
    		if(comboValue){
    		obj = {
    			name:csrCombo.getRawValue(),
    			assignCSRId:csrCombo.getValue(),
    			recordId:view.recordId
    		};
    		}
    		else{
    			Ext.Msg.alert(AOCLit.warningTitle,'Please select CSR');
    			return ;
    		}
    	
    	if(Ext.isFunction(view.callback)){
    		view.callback.call(this, obj);
    	}
    }
});