# calendar-system

## Database Schema

1. Users table
```
	id: int
	name: string
	username: string
	password: string
```

2. Appointments table
```
	id: int
	userId: int - reference
	title: string
	description: string
	date: date
	startTime: time
	endTime: time
```

## API EndPoints
http://129.146.74.45:3000/swagger.json

## Execution Steps

1. npm install
2. npm start
