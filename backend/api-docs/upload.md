# Upload API
The upload API handles downloading, uploading and deleting files.

Endpoints:
- `GET /api/upload/<filename>`
- `PUT /api/upload/<jobid>`
- `DELETE /api/upload/<jobid>/<documenttype>`

## Download uploaded file
`GET /api/upload/<filename>`

Downloads a already uploaded file with the specified filename

### Parameters
No parameters.

### Returns
A file.

## Upload file
`PUT /api/upload/<jobid>`

Uploads a file or files and attaches it to the job.

### Parameters
No parameters.

### Returns
A success flag.

### Response example
```json
{
   "success":true
}
```

## Delete file
`DELETE /api/upload/<jobid>/<documenttype>`

Deletes a file of the specified document type and from the specified jobid.

### Parameters
No parameters.

### Returns
A success flag.

### Response example
```json
{
   "success":true
}
```
