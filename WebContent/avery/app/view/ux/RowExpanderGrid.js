
Ext.define('AOC.view.ux.RowExpanderGrid', {
	/*
	 * Inspired by : http://www.rahulsingla.com/blog/2010/04/extjs-preserving-rowexpander-markup-across-view-refreshes
	 * Reappend element to DOM : http://stackoverflow.com/questions/20143082/does-extjs-automatically-garbage-collect-components
	 */

	    extend: 'Ext.ux.RowExpander',

	    alias: 'plugin.cmprowexpander',

	    rowBodyTpl : ['<div></div>'],
	    expandOnDblClick:false,
	     expandOnEnter:false,
	    obj_recordId_componentId: {},
	     
	    init: function(grid) {
	        this.callParent(arguments) ;
	        
	        var view = grid.getView() ;
	        view.on('refresh', this.onRefresh, this);
	        view.on('expandbody', this.onExpand, this);
	        
	        grid.on('destroy', this.onDestroyGrid, this) ;
	        grid.headerCt.on('columnresize', this.onColumnResize, this) ;
	        
	        this.obj_recordId_componentId = {} ;
	    },
	    
	    getRecordKey: function(record) {
	        return (record.internalId);
	    },
	    
	    createComponent: function(view, record, rowNode, rowIndex) {
	        return Ext.create('Ext.Component') ;
	    },
	    
	    onExpand: function(rowNode, record, expandRow) {
	        var recordId = this.getRecordKey(record) ;
	        if( Ext.isEmpty( this.obj_recordId_componentId[recordId] ) ) {
	            var view = this.grid.getView(),
	                newComponent = this.createComponent(view, record, rowNode, view.indexOf(rowNode)),
	                targetRowbody = Ext.DomQuery.selectNode('div.x-grid-rowbody', expandRow) ;
	            
	            while (targetRowbody.hasChildNodes()) {
	                targetRowbody.removeChild(targetRowbody.lastChild);
	            }
	            newComponent.render( targetRowbody ) ;
	            newComponent.getEl().swallowEvent([
	                                        'mousedown', 'mouseup', 'click',
	                                        'contextmenu', 'mouseover', 'mouseout',
	                                        'dblclick', 'mousemove'
	                                    ]);
	            this.obj_recordId_componentId[recordId] = newComponent.getId() ;
	        }
	    },
	    
	    onRefresh: function(view) {
	        var reusedCmpIds = [] ;
	        Ext.Array.each( view.getNodes(), function(node) {
	            var record = view.getRecord(node),
	                recordId = this.getRecordKey(record) ;
	                
	            if( !Ext.isEmpty(this.obj_recordId_componentId[recordId]) ) {
	                var cmpId = this.obj_recordId_componentId[recordId] ;
	                
	                reusedCmpIds.push(cmpId) ;
	                var reusedComponent = Ext.getCmp(this.obj_recordId_componentId[recordId]),
	                    targetRowbody = Ext.DomQuery.selectNode('div.x-grid-rowbody', node);
	                while (targetRowbody.hasChildNodes()) {
	                    targetRowbody.removeChild(targetRowbody.lastChild);
	                }
	                
	                targetRowbody.appendChild( reusedComponent.getEl().dom );
	                reusedComponent.doLayout() ;
	            }
	        },this) ;
	        
	        
	        // Do Garbage collection
	        // Method 1 ( http://skirtlesden.com/static/ux/download/component-column/1.1/Component.js )
	        var keysToDelete = [] ;
	        Ext.Object.each( this.obj_recordId_componentId, function( recordId, testCmpId ) {
	            comp = Ext.getCmp(testCmpId);
	            el = comp && comp.getEl();

	            if (!el || (true && (!el.dom || Ext.getDom(Ext.id(el)) !== el.dom))) {
	                // The component is no longer in the DOM
	                if (comp && !comp.isDestroyed) {
	                    comp.destroy();
	                    keysToDelete.push(recordId) ;
	                }
	            }
	        }) ;
	        
	        // Method 2
	        /*
	        Ext.Object.each( this.obj_recordId_componentId, function( recordId, testCmpId ) {
	            if( !Ext.Array.contains( reusedCmpIds, testCmpId ) ) {
	                comp = Ext.getCmp(testCmpId);
	                comp.destroy();
	                keysToDelete.push(recordId) ;
	            }
	        }) ;
	        */
	        
	        // Clean map
	        Ext.Array.each( keysToDelete, function(mkey) {
	            delete this.obj_recordId_componentId[mkey] ;
	        },this);
	    },
	    
	    onColumnResize: function() {
	        Ext.Object.each( this.obj_recordId_componentId, function( recordId, cmpId ) {
	            Ext.getCmp(cmpId).doLayout();
	        }) ;
	    },
	     
	    onDestroyGrid: function() {
	        Ext.Object.each( this.obj_recordId_componentId, function(recordId, cmpId) {
	            Ext.getCmp(cmpId).destroy() ;
	        }) ;
	     },
	     getHeaderConfig: function() {
	         var me = this,
	             lockable = me.grid.ownerLockable;

	         return {
	             width: me.headerWidth,
	             lockable: false,
	             autoLock: true,
	             sortable: false,
	             resizable: false,
	             draggable: false,
	             hideable: false,
	             menuDisabled: true,
	             tdCls: Ext.baseCSSPrefix+'grid-cell-special',
	             innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
	             renderer: function(type, config, cell, rowIndex, cellIndex, e, view) {
	             	var me=this;
	             	var record=config.record;
	             	var nestedGridRefrence=me.nestedGridRefrence;
	             	var length=record.get(nestedGridRefrence).length;
	             	if(me.showMandatoryValidationField){
	             		var mandatoryVariableDataFieldFlag=record.data.mandatoryVariableDataFieldFlag;
		        		var checkvalue=mandatoryVariableDataFieldFlag.trim();
		    			if(checkvalue.substr(0,1)!='S' && record.get('status')==waitingForCSRStatus){
		    				config.tdCls='invalid';
		    			}
	             	}
	             	if(length!=0)
	             		return '<div class="custom-row-expander" role="presentation"></div>';
	             	else
	             		return '<div class="hiderowexpander" role="presentation"></div>';
	             },
	             processEvent: function(type, view, cell, rowIndex, cellIndex, e, record) {
	                 if (e.getTarget('.custom-row-expander')) {
	                     if (type === "click") {
	                         me.toggleRow(rowIndex, record);
	                         return me.selectRowOnExpand;
	                     }
	                 }
	             },

	             // This column always migrates to the locked side if the locked side is visible.
	             // It has to report this correctly so that editors can position things correctly
	             isLocked: function() {
	                 return lockable && (lockable.lockedGrid.isVisible() || this.locked);
	             },

	             // In an editor, this shows nothing.
	             editRenderer: function() {
	                 return '&#160;';
	             }
	         };
	     }
	});