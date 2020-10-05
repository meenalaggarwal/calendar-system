var createUser = function(dbClient, data, callback) {
	dbClient.query("Insert into users (name, username, password) values ('" + 
		data.name + "','" + data.username + "','" + data.password + "')", function(err, data) {
			callback(err, data);
		});
};


var loginUser = function(dbClient, data, callback) {
	dbClient.query("Select * from users where username='" + 
		data.username + "' and password='" + data.password + "'", function(err, user) {
			callback(err, user.rows);
		});
};

var createAppointment = function(dbClient, data, callback) {
	dbClient.query("Insert into appointments (userId, date, startTime, endTime, title, description) values ('" + 
		data.userId + "','" + data.date + "','" + data.startTime + "','" + data.endTime + 
		"','" + data.title + "','" + data.description + "')", function(err, data) {
			callback(err, data);
		});
};

var updateAppointment = function(dbClient, data, appointmentId, callback) {
	var sqlStatement = "Update appointments set ";
	var update = false;
	if (data.date) {
		sqlStatement += "date='" + data.date + "',";
		update = true;
	} else if (data.startTime) {
		sqlStatement += "startTime='" + data.startTime + "',";
		update = true;
	} else if (data.endTime) {
		sqlStatement += "endTime='" + data.endTime + "',";
		update = true;
	} else if (data.title) {
		sqlStatement += "title='" + data.title + "',";
		update = true;
	} else if (data.description) {
		sqlStatement += "description='" + data.description + "',";
		update = true;
	}
	if (update) {
		sqlStatement = sqlStatement.substring(0, sqlStatement.length - 1);
		sqlStatement += " where id='" + appointmentId + "'";
		dbClient.query(sqlStatement, function(err, data) {
			callback(err, data);
		});
	} else {
		callback(null, null);
	}
};

var getAppointment = function(dbClient, userId, date, callback) {
	dbClient.query("Select * from appointments where userid='" + userId + "' and date='" + date + "'", function(err, user) {
		callback(err, user.rows);
	});
};

module.exports = {
	createUser: createUser,
	loginUser: loginUser,
	getAppointment: getAppointment,
	createAppointment: createAppointment,
	updateAppointment: updateAppointment
};
