Ext.define('AOC.view.ux.Callout', {
    extend: 'Ext.Container',
    alias: 'widget.callout',
    cls: 'default',
    componentCls: 'x-ux-callout',
    floating: true,
    shadow: false,
    padding: 16,
    config: {
        /**
         @cfg {Ext.Component} Target {@link Ext.Component} (optional).
         */

        target: null,
        /**
         @cfg {String} Position relative to {@link #target} - see {@link Ext.Element#alignTo} for valid values.
         */

        relativePosition: 'c-c',
        /**
         @cfg {Array} X and Y offset relative to {@link #target} (optional).
         */

        relativeOffsets: null,
        /**
         @cfg {String} Callout arrow location - valid values: none, top, bottom, left, right, top-right, top-left, bottom-right, bottom-left, left-top, left-bottom, right-top, right-bottom
         */

        calloutArrowLocation: 'none',
        /**
         @cfg {Number} Duration in milliseconds for the fade in animation when a callout is shown.
         */

        fadeInDuration: 200,
        /**
         @cfg {Number} Duration in milliseconds for the fade out animation when a callout is hidden.
         */

        fadeOutDuration: 200,
        /**
         @cfg {Boolean] Indicates whether to automatically hide the callout after a mouse click anywhere outside of the callout.
    */

        autoHide: true,
        /**
         @cfg {Number} Duration in milliseconds to show the callout before automatically dismissing it.  A value of 0 will disable automatic dismissal.
         */

        dismissDelay: 0
    },
    /**
     @protected
     @property {Object} The dismissal timer id.
     */

    dismissTimer: null,
    /**
     @inheritdoc
     */

    initComponent: function() {
        if (Ext.getVersion('extjs') && Ext.getVersion('extjs').isLessThan('4.1.0')) {
            Ext.applyIf(this, this.config);
        }
        return this.callParent(arguments);
    },
    /**
     @inheritdoc
     */

    destroy: function() {
        this.clearTimers();
        return this.callParent(arguments);
    },
    /**
     @inheritdoc
     */

    show: function() {
        var elementOrComponent;
        this.callParent(arguments);
        this.removeCls(['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom', 'right-top', 'right-bottom']);
        if (this.getCalloutArrowLocation() !== 'none') {
            this.addCls(this.getCalloutArrowLocation());
        }
        if (this.getTarget() != null) {
            elementOrComponent = Ext.isString(this.getTarget()) ? Ext.ComponentQuery.query(this.getTarget())[0] : this.getTarget();
            this.getEl().anchorTo(elementOrComponent.el || elementOrComponent, this.getRelativePosition(), this.getRelativeOffsets() || [0, 0], false, 50, Ext.bind(function() {
                this.afterSetPosition(this.getEl().getLeft(), this.getEl().getRight());
            }, this));
        }
        if (!(this.dismissTimer != null) && this.getDismissDelay() > 0) {
            this.dismissTimer = Ext.defer(this.hide, this.getDismissDelay(), this);
        }
        return this;
    },
    /**
     @inheritdoc
     */

    hide: function() {
        this.clearTimers();
        this.getEl().removeAnchor();
        return this.callParent(arguments);
    },
    /**
     @protected
     @method
     Clear any timers that potentially be running.
     */

    clearTimers: function() {
        if (this.dismissTimer != null) {
            clearTimeout(this.dismissTimer);
        }
        this.dismissTimer = null;
    },
    /**
     @inheritdoc
     */

    onShow: function() {
        this.callParent(arguments);
        this.mon(Ext.getDoc(), 'mousedown', this.onDocMouseDown, this);
        this.mon(Ext.getDoc(), 'mousewheel', this.onDocMouseDown, this);
        this.getEl().setOpacity(0.0);
        this.getEl().fadeIn({
            duration: this.getFadeInDuration()
        });
    },
    /**
     @inheritdoc
     */

    onHide: function(animateTarget, cb, scope) {
        this.mun(Ext.getDoc(), 'mousedown', this.onDocMouseDown, this);
        this.mun(Ext.getDoc(), 'mousewheel', this.onDocMouseDown, this);
        this.getEl().fadeOut({
            duration: this.getFadeOutDuration(),
            callback: function() {
                this.getEl().hide();
                this.afterHide(cb, scope);
            },
            scope: this
        });
    },
    /**
     @protected
     Handles a 'mousedown' event on the current HTML document.
     */

    onDocMouseDown: function(event) {
    //AC-3652 - Updated to remove tooltip on click
    	var elementOrComponent = Ext.isString(this.getTarget()) ? Ext.ComponentQuery.query(this.getTarget())[0] : this.getTarget();
        if (this.getAutoHide() && !event.within(this.getEl()) && !event.within(elementOrComponent.el || elementOrComponent)) {
            this.hide();
        }
    }
});