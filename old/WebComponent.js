Rpm = {};
Rpm.RegisteredComponents = {};

(function () {
	'use strict';

	Rpm.WebComponent = new Class({
		Implements: [Options, Events],
		options: {
			instanceID: ''
		},
		componentName: 'WebComponent',
		container: null,
		content: null,
		initialize: function(options) {
			this.setOptions(options);
		},
		// You usually don't need to extend renderInside directly, see:
		// - buildComponentContent
		// - connectComponentUI
		renderInside: function (container) {
			this.container = container;
			this.reRender();
		},
		reRender: function () {
			if (this.content === null) {
				this.render();
			}

			var containerRoot = this.container.reactRoot;
			var root = containerRoot ? containerRoot : this.container.attachShadow({mode: 'closed'});

			var content = this.content;
			if (Array.isArray(content)) {
				content = document.createElement('div');
				this.content.forEach(function(child) {
					content.appendChild(child);
				});
			}

			content.addClass(this.componentName + '--container')
			root.appendChild(content);

			var stylesheet = document.createElement('link');
			stylesheet.href = './old/' + this.componentName + '.css';
			stylesheet.rel = 'stylesheet';
			root.appendChild(stylesheet);

			this.connectComponentUI();
			this.addIDToElement(this.container, 'Container');
			// Store this component in the container
			var existing = Rpm.RegisteredComponents[this.options.instanceID];
			if (existing !== undefined) {
				throw "A web component with ID " + this.options.instanceID + " is already registered";
			}
			Rpm.RegisteredComponents[this.options.instanceID] = this;
		},
		render: function () {
			this.content = this.buildComponentContent();
		}.protect(),
		/*
			Build and return a list of DOM elements that make
			up the Component's UI.
		*/
		buildComponentContent: function () {
			return new Element('span', { 'html': 'Rpm.WebComponent (' + this.templateNamespace + ')' });
		},
		addIDToElement: function (el, id) {
			if (this.options.instanceID === '') {
				return;
			}
			el.set('id', this.buildID(id));
		},
		buildID: function (id) {
			return this.options.instanceID + ':' + id;
		},

		/*
			Connect the UI element's events, usually this means 
			eventually firing one of the Component's events.
		*/
		connectComponentUI: function () { },

	});
	
})();