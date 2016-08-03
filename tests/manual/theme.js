/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import testUtils from '/tests/ui/_utils/utils.js';

import Collection from '/ckeditor5/utils/collection.js';
import Model from '/ckeditor5/ui/model.js';
import Controller from '/ckeditor5/ui/controller.js';
import View from '/ckeditor5/ui/view.js';
import Template from '/ckeditor5/ui/template.js';

import iconManagerModel from '/theme/iconmanagermodel.js';
import IconManager from '/ckeditor5/ui/iconmanager/iconmanager.js';
import IconManagerView from '/ckeditor5/ui/iconmanager/iconmanagerview.js';

import Icon from '/ckeditor5/ui/icon/icon.js';
import IconView from '/ckeditor5/ui/icon/iconview.js';

import Button from '/ckeditor5/ui/button/button.js';
import ButtonView from '/ckeditor5/ui/button/buttonview.js';

import ListDropdown from '/ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from '/ckeditor5/ui/dropdown/list/listdropdownview.js';

import Toolbar from '/ckeditor5/ui/toolbar/toolbar.js';
import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';

testUtils.createTestUIController( {
	'icon-plain-1':					'#icon-plain-1',
	'icon-plain-2':					'#icon-plain-2',
	'icon-color-1':					'#icon-color-1',
	'icon-color-2':					'#icon-color-2',
	'icon-availability':			'#icon-availability',
	'icon-availability-color':		'#icon-availability-color',

	'button-states':				'#button-states',
	'button-types':					'#button-types',
	'button-icon':					'#button-icon',
	'button-custom':				'#button-custom',
	'button-icon-custom':			'#button-icon-custom',
	'button-icon-states':			'#button-icon-states',
	'button-responsive-1':			'#button-responsive-1',
	'button-responsive-2':			'#button-responsive-2',
	'button-responsive-3':			'#button-responsive-3',

	dropdown:						'#dropdown',

	'toolbar-text':					'#toolbar-text',
	'toolbar-button':				'#toolbar-button',
	'toolbar-rounded':				'#toolbar-rounded',
	'toolbar-wrap':					'#toolbar-wrap',
	'toolbar-separator':			'#toolbar-separator',
	'toolbar-multi-row':			'#toolbar-multi-row',

	body:							'div#body'
} ).then( ui => {
	renderIcon( ui );
	renderButton( ui );
	renderDropdown( ui );
	renderToolbar( ui );
} );

function renderIcon( ui ) {
	// --- IconManager ------------------------------------------------------------

	ui.add( 'body', new IconManager( iconManagerModel, new IconManagerView() ) );

	// --- In-text ------------------------------------------------------------

	ui.add( 'icon-plain-1', icon( 'bold' ) );
	ui.add( 'icon-plain-2', icon( 'quote' ) );

	ui.add( 'icon-color-1', icon( 'bold' ) );
	ui.add( 'icon-color-2', icon( 'quote' ) );

	// --- Availability ------------------------------------------------------------

	iconManagerModel.icons.forEach( i => {
		ui.add( 'icon-availability', icon( i ) );
		ui.add( 'icon-availability-color', icon( i ) );
	} );
}

function renderButton( ui ) {
	// --- States ------------------------------------------------------------

	ui.add( 'button-states', button( {
		label: 'State: normal (none)',
	} ) );

	ui.add( 'button-states', button( {
		label: 'State: disabled',
		isEnabled: false
	} ) );

	ui.add( 'button-states', button( {
		label: 'State: on',
		isOn: true
	} ) );

	// --- Types ------------------------------------------------------------

	const actionButton = button( { label: 'Action button' } );
	const roundedButton = button( { label: 'Rounded corners' } );
	const boldButton = button( { label: 'Bold text' } );

	// TODO: It requires model interface.
	actionButton.view.element.classList.add( 'ck-button-action' );

	// TODO: It requires model interface.
	roundedButton.view.element.classList.add( 'ck-rounded-corners' );

	// TODO: It requires model interface.
	boldButton.view.element.classList.add( 'ck-button-bold' );

	ui.add( 'button-types', actionButton );
	ui.add( 'button-types', roundedButton );
	ui.add( 'button-types', boldButton );

	// --- Icon ------------------------------------------------------------

	iconManagerModel.icons.forEach( i => {
		ui.add( 'button-icon', button( {
			label: i,
			icon: i
		} ) );
	} );

	const styledButton = button( {
		label: 'Button with an icon and custom styles',
		icon: 'italic'
	} );

	// TODO: It probably requires model interface.
	styledButton.view.element.setAttribute( 'style', 'border-radius: 100px; border: 0' );

	ui.add( 'button-icon-custom', styledButton );

	ui.add( 'button-icon-states', button( {
		label: 'Disabled',
		icon: 'bold',
		isEnabled: false
	} ) );

	ui.add( 'button-icon-states', button( {
		label: 'Bold',
		withText: false,
		icon: 'bold'
	} ) );

	const colChangeButton = button( {
		label: 'Icon follows text color',
		icon: 'bold'
	} );

	// TODO: It requires model interface.
	colChangeButton.view.element.id = 'icon-color-change';

	ui.add( 'button-icon-states', colChangeButton );

	// --- Responsive ------------------------------------------------------------

	for ( let i = 1; i < 4; i++ ) {
		ui.add( `button-responsive-${ i }`, button( {
			label: 'A button',
			isEnabled: true
		} ) );

		ui.add( `button-responsive-${ i }`, button( {
			label: 'Bold',
			icon: 'bold',
			isEnabled: true
		} ) );

		const notextButton = button( {
			label: 'Link',
			withText: false,
			icon: 'link'
		} );

		// TODO: It requires model interface.
		notextButton.view.element.classList.add( 'ck-button-action' );

		ui.add( `button-responsive-${ i }`, notextButton );
	}
}

function renderDropdown( ui ) {
	// --- ListDropdown ------------------------------------------------------------

	const collection = new Collection( { idProperty: 'label' } );

	[ 'Arial', 'Tahoma', 'Georgia' ].forEach( font => {
		collection.add( new Model( {
			label: font,
			style: `font-family: ${ font }`
		} ) );
	} );

	const itemListModel = new Model( {
		items: collection
	} );

	ui.add( 'dropdown', dropdown( {
		label: 'Normal state',
		isEnabled: true,
		content: itemListModel
	} ) );

	ui.add( 'dropdown', dropdown( {
		label: 'Disabled',
		isEnabled: false,
		content: itemListModel
	} ) );
}

function renderToolbar( ui ) {
	// --- Text ------------------------------------------------------------

	ui.add( 'toolbar-text', toolbar( [
		icon( 'bold' ),
		text()
	] ) );

	// --- Button ------------------------------------------------------------

	ui.add( 'toolbar-button', toolbar( [
		button(),
		text(),
		button( {
			label: 'Button with an icon',
			icon: 'bold'
		} ),
		dropdown(),
		button()
	] ) );

	// --- Rounded ------------------------------------------------------------

	ui.add( 'toolbar-rounded', toolbar( [
		button( {
			label: 'A button which corners are also rounded because of toolbar class'
		} ),
		button( {
			label: 'Button with an icon',
			icon: 'bold'
		} )
	] ) );

	// --- Wrap ------------------------------------------------------------

	const wrapToolbar = toolbar( [
		button(),
		button(),
		button()
	] );

	wrapToolbar.view.element.style.width = '150px';

	ui.add( 'toolbar-wrap', wrapToolbar );

	// --- Separator ------------------------------------------------------------

	ui.add( 'toolbar-separator', toolbar( [
		button(),
		button(),
		toolbarSeparator(),
		button( {
			label: 'Link',
			icon: 'link'
		} ),
		toolbarSeparator(),
		button( {
			label: 'Unlink RTL',
			icon: 'unlink'
		} )
	] ) );

	// --- Multi row ------------------------------------------------------------

	ui.add( 'toolbar-multi-row', toolbar( [
		button(),
		button(),
		toolbarNewLine(),
		button( {
			label: 'Link',
			icon: 'link'
		} ),
		button( {
			label: 'Unlink RTL',
			icon: 'unlink'
		} ),
		button( {
			label: 'Link',
			icon: 'link'
		} )
	] ) );
}

const TextView = class extends View {
	constructor() {
		super();

		this.element = document.createTextNode( 'Sample text' );
	}
};

function text() {
	return new Controller( null, new TextView() );
}

function icon( name ) {
	const model = new Model( {
		name: name
	} );

	return new Icon( model, new IconView() );
}

function button( {
	label = 'Button',
	isEnabled = true,
	isOn = false,
	withText = true,
	icon
} = {} ) {
	const model = new Model( { label, isEnabled, isOn, withText, icon } );

	return new Button( model, new ButtonView() );
}

function toolbar( children = [] ) {
	const toolbar = new Toolbar( null, new ToolbarView() );

	children.forEach( c => {
		toolbar.add( 'buttons', c );
	} );

	return toolbar;
}

function dropdown( {
	label = 'Dropdown',
	isEnabled = true,
	isOn = false,
	withText = true,
	content = new Model( { items: new Collection( { idProperty: 'label' } ) } )
} = {} ) {
	const model = new Model( { label, isEnabled, content, isOn, withText } );
	const dropdown = new ListDropdown( model, new ListDropdownView() );

	return dropdown;
}

const ToolbarSeparatorView = class extends View {
	constructor() {
		super();

		this.template = new Template( {
			tag: 'span',
			attributes: {
				class: 'ck-toolbar-separator'
			}
		} );
	}
};

function toolbarSeparator() {
	return new Controller( null, new ToolbarSeparatorView() );
}

const ToolbarNewlineView = class extends View {
	constructor() {
		super();

		this.template = new Template( {
			tag: 'span',
			attributes: {
				class: 'ck-toolbar-newline'
			}
		} );
	}
};

function toolbarNewLine() {
	return new Controller( null, new ToolbarNewlineView() );
}
