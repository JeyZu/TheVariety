Posts = new Meteor.Collection('posts');

Posts.allow({
	update: function(userId, post) { 
		return ownsDocument(userId, post); 
	},
	remove: function(userId, post) { 
		return ownsDocument(userId, post);
	},
});

Posts.deny({ 
	update: function(userId, post, fieldNames) {
	    // may only edit the following two fields:
	    return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	postInsert: function(postAttributes) {
		//todo check

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
})
