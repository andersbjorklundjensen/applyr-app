# Jobs API
The jobs API deals with retrieving, creating, changing and deleting jobs. 

Endpoints:
- `GET /api/job/all`
- `GET /api/job/<id>`
- `POST /api/job`
- `PUT /api/job/<id>`
- `DELETE /api/job/<id>`

## Get list of all jobs
`GET /api/job/all`

Gets a list of all jobs the user has created.

### Parameters
- No parameters.

### Returns
- An array of job objects.

### Response example
```json
{
   "jobs":[
      {
         "_id":"5ee23050230fdf6d4a7fe1f5",
         "positionTitle":"Bilmekaniker",
         "location":"KORGVEGEN 40, 2619 Lillehammer",
         "linkToPosting":"https://www.finn.no/job/fulltime/ad.html?finnkode=181779920",
         "company":"Mjøsbil avd. Lillehammer",
         "dateApplied":1591833600000,
         "currentStatus":1,
         "notes":"",
         "ownerId":"5ed93c10df41f340d111de08",
         "__v":0
      },
      {
         "_id":"5ee2307b230fdf6d4a7fe1f6",
         "positionTitle":"Seksjonsleder kontrollanlegg",
         "location":"Nydalen alle 33, 0484 Oslo",
         "linkToPosting":"https://www.finn.no/job/management/ad.html?finnkode=181781401",
         "company":"Statnett",
         "dateApplied":1591833600000,
         "currentStatus":1,
         "notes":"",
         "ownerId":"5ed93c10df41f340d111de08",
         "__v":0
      }
   ]
}
```

## Get specific job
`GET /api/job/<id>`

Retrieves a specific job by id.

### Parameters
- No parameters.

### Returns
- A job object.

### Response example
```json
{
   "job":{
      "_id":"5ee23050230fdf6d4a7fe1f5",
      "positionTitle":"Bilmekaniker",
      "location":"KORGVEGEN 40, 2619 Lillehammer",
      "linkToPosting":"https://www.finn.no/job/fulltime/ad.html?finnkode=181779920",
      "company":"Mjøsbil avd. Lillehammer",
      "dateApplied":1591833600000,
      "currentStatus":1,
      "notes":"",
      "ownerId":"5ed93c10df41f340d111de08",
      "__v":0
   }
}
```

## Create new job
`POST /api/job`

Creates a new job.

### Parameters
| Parameter     | Type   | Optional | Description                                                        |
| :------------ | :----- | :------- | :----------------------------------------------------------------- |
| positionTitle | String |          | Title of the applied position                                      |
| location      | String |          | Location of job's working place                                    |
| linkToPosting | String |          | Link to the job posting for reference                              |
| company       | String |          | Name of the company that offers the job                            |
| dateApplied   | Number |          | Date of job application in number of milliseconds since 1970/01/01 |
| currentStatus | Number |          | Current status of job application                                  |
| notes         | String | Yes      |                                                                    |

### Request example
```json
{
   "positionTitle":"Plasssjef Caverion Mosjøen",
   "location":"Vefsnvegen 5, 8656 Mosjøen",
   "company":"Caverion",
   "dateApplied":1591833600000,
   "currentStatus":1,
   "notes":"",
   "linkToPosting":"https://www.finn.no/job/fulltime/ad.html?finnkode=181771560"
}
```

### Returns
- A object with the job id for the job.

### Response example
```json
{
   "jobId":"5ee2357f230fdf6d4a7fe1f7"
}
```

## Update specific job
`PUT /api/job/<id>`

Update a specific job by id.

### Parameters
| Parameter     | Type   | Optional | Description                                                        |
| :------------ | :----- | :------- | :----------------------------------------------------------------- |
| positionTitle | String |          | Title of the applied position                                      |
| location      | String |          | Location of job's working place                                    |
| linkToPosting | String |          | Link to the job posting for reference                              |
| company       | String |          | Name of the company that offers the job                            |
| dateApplied   | Number |          | Date of job application in number of milliseconds since 1970/01/01 |
| currentStatus | Number |          | Current status of job application                                  |
| notes         | String | Yes      |                                                                    |

### Request example
```json
{
   "positionTitle":"Plasssjef Caverion Mosjøen",
   "location":"Vefsnvegen 5, 8656 Mosjøen",
   "company":"Caverion",
   "dateApplied":1591833600000,
   "currentStatus":3,
   "notes":"",
   "linkToPosting":"https://www.finn.no/job/fulltime/ad.html?finnkode=181771560"
}
```

### Returns
- Nothing.

### Response example

## Delete specific job
`DELETE /api/job/<id>`

Delete a specific job by id.

### Parameters
- No parameters.

### Returns
- A object with a success flag and id of the job deleted.

### Response example
```json
{
   "success":true,
   "jobId":"5ee2357f230fdf6d4a7fe1f7"
}
```
