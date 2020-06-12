# Backup API
The backup API deals with requesting backups, retrieve previous backups and downloading backups.

Endpoints:
- `GET /api/backup/list`
- `GET /api/backup/<filename>`
- `POST /api/backup/request`

## Retrieve list of requested backups
`GET /api/backup/list`

Retrieves a list of previously requested backups. 

### Parameters
- No parameters.

### Returns 
- Returns an array called backups of backup objects

### Response example
```json
{
   "backups":[
      {
         "_id":"5ed96723e09bfb6bf577f412",
         "ownerId":"5ed93c10df41f340d111de08",
         "created":1591306019482,
         "filename":"backup-404533f999445b3a2333-1591306019469.zip",
         "__v":0
      },
      {
         "_id":"5ed96723e09bfb6bf577f413",
         "ownerId":"5ed93c10df41f340d111de08",
         "created":1591306019524,
         "filename":"backup-b4e2a055a0124089d305-1591306019520.zip",
         "__v":0
      }
   ]
}
```

## Download specific backup
`GET /api/backup/<filename>`

Retrieves the backup file with the specified filename.

### Parameters
No parameters.

### Returns
Returns a ZIP file with all the user's data.

## Request new backup
`POST /api/backup/request`

Sends a request for a new backup file to be created.

### Parameters
No parameters.

### Returns
An object with a success flag.

### Response example
```json
{
   "success":true
}
```
