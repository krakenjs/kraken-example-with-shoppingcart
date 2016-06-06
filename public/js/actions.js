var Dispatcher = require('./dispatcher');
var Constants = require('./constants');
var Actions = {

	/**
	 * @param  {string} text
	 */
	addProduct: function(product) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.PRODUCT_CREATE,
			product: product
		});
	},
	deleteProduct: function(product) {
		//update application
		Dispatcher.dispatch({
			actionType: Constants.PRODUCT_DELETE,
			product: product
		});
	},
	//
	///**
	// * @param  {string} id The ID of the ToDo item
	// * @param  {string} text
	// */
	//updateText: function(id, text) {
	//	AppDispatcher.dispatch({
	//		actionType: TodoConstants.TODO_UPDATE_TEXT,
	//		id: id,
	//		text: text
	//	});
	//},
	//
	///**
	// * Toggle whether a single ToDo is complete
	// * @param  {object} todo
	// */
	//toggleComplete: function(todo) {
	//	var id = todo.id;
	//	var actionType = todo.complete ?
	//	  TodoConstants.TODO_UNDO_COMPLETE :
	//	  TodoConstants.TODO_COMPLETE;
	//
	//	AppDispatcher.dispatch({
	//		actionType: actionType,
	//		id: id
	//	});
	//},
	//
	///**
	// * Mark all ToDos as complete
	// */
	//toggleCompleteAll: function() {
	//	AppDispatcher.dispatch({
	//		actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
	//	});
	//},
	//
	///**
	// * @param  {string} id
	// */
	//destroy: function(id) {
	//	AppDispatcher.dispatch({
	//		actionType: TodoConstants.TODO_DESTROY,
	//		id: id
	//	});
	//},
	//
	///**
	// * Delete all the completed ToDos
	// */
	//destroyCompleted: function() {
	//	AppDispatcher.dispatch({
	//		actionType: TodoConstants.TODO_DESTROY_COMPLETED
	//	});
	//}

};

module.exports = Actions;