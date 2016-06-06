var Dispatcher = require('./dispatcher');
var Constants = require('./constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _model = {products: [], cart: {}};
var $ = require('jquery');

function createProduct(productObject, callback) {
	$.ajax({
		url: '/products',
		type: 'POST',
		dataType: 'json',
		data: {
			_csrf: productObject._csrf,
			name: productObject.name,
			price: productObject.price
		},
		cache: false,
		success: function (data) {
			console.log('data', data);
			_model.products = data.products;
			callback();
		}.bind(this),
		error: function (xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
}
function deleteProduct(productObject, callback) {
	$.ajax({
		url: '/products',
		type: 'POST',
		dataType: 'json',
		data: {
			_csrf: productObject._csrf,
			_method: 'DELETE',
			item_id: productObject.item_id,
			price: productObject.price
		},
		cache: false,
		success: function (data) {
			console.log('data', data);
			_model.products = data.products;
			callback();
		}.bind(this),
		error: function (xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
}
var Store = assign({}, EventEmitter.prototype, {
	getModel: function () {
		return _model;
	},
	setModel: function (model) {
		_model = model;
	},
	emitter: function (evt) {
		this.emit(evt);
	},
	/**
	 * @param {function} callback
	 */
	addListener: function (evt, callback) {
		this.on(evt, callback);
	},

	/**
	 * @param {function} callback
	 */
	subtractListener: function (evt, callback) {
		this.removeListener(evt, callback);
	}
});

// Register callback to handle all updates
Dispatcher.register(function (action) {
	var text;

	switch (action.actionType) {
		case Constants.PRODUCT_CREATE:
			createProduct(action.product, function () {
				Store.emitter('productChange');
			});
			break;
		case Constants.PRODUCT_DELETE:
			deleteProduct(action.product, function () {
				Store.emitter('productChange');
			});
			break;
		//case 'deleteProduct':
		//	if (TodoStore.areAllComplete()) {
		//		updateAll({complete: false});
		//	} else {
		//		updateAll({complete: true});
		//	}
		//	TodoStore.emitChange();
		//	break;

		//case TodoConstants.TODO_UNDO_COMPLETE:
		//	update(action.id, {complete: false});
		//	TodoStore.emitChange();
		//	break;
		//
		//case TodoConstants.TODO_COMPLETE:
		//	update(action.id, {complete: true});
		//	TodoStore.emitChange();
		//	break;
		//
		//case TodoConstants.TODO_UPDATE_TEXT:
		//	text = action.text.trim();
		//	if (text !== '') {
		//		update(action.id, {text: text});
		//		TodoStore.emitChange();
		//	}
		//	break;
		//
		//case TodoConstants.TODO_DESTROY:
		//	destroy(action.id);
		//	TodoStore.emitChange();
		//	break;
		//
		//case TodoConstants.TODO_DESTROY_COMPLETED:
		//	destroyCompleted();
		//	TodoStore.emitChange();
		//	break;

		default:
		// no op
	}
});

module.exports = Store;