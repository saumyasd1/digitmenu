Ext.define('AOC.view.taskmanager.AssignCSRWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assigncsrwindow',
    runTime: AOC.config.Runtime,
    
    onSaveBtnClicked:function(btn){
    	var view = this.getView(),
    		ref = this.getReferences(),
    		csrCombo = ref.csrCombo,
    		obj = {
    			name:csrCombo.getRawValue(),
    			Id:csrCombo.getValue(),
    			recordId:view.recordId
    		};
    	if(Ext.isFunction(view.callback)){
    		view.callback.call(this, obj);
    	}
    	view.close();
    }
});