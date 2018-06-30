# Top level endpoints

All api endpoints will be found under /api. Ex. https://domain.com/api/user

- auth
- user
- drawing

All api calls will return with a `status` property. The status property will
contain "Ok" if there are no errors. Otherwise, `status` will return a string of
the description of the error.

## User Endpoint

### GET /user/search: 

Parameters:

| Name   | Type   | Description                                                                       |
|:-------|:-------|:----------------------------------------------------------------------------------|
| q      | string | **Required**. Search by persons name                                              |
| sort   | string | methods to sort users                                                             |
| order  | string | The sort order if `sort` parameter is provided. One of asc or desc. Default: desc |
| limit  | number | Number of users to return. Default: 10. Max: 100                                  |
| offset | number | Number of users to offset. Default: 0                                             |

Response:

```
{
  status: string;
  totalCount: number;
  userCount: number;
  offset: number;
  users: [{
    name: string;
    url: string;
  }];
}
```

### GET /user

Get Current user's profile

Response:

```
{
  status: string;
  name: string;
  url: string;
  drawings: [{
    id: UUID;
    url: string;
  }]
}
```

### {POST,PATCH,PUT} /user

Input:

| Name     | type   | Description          |
|:---------|:-------|:---------------------|
| email    | string | Update user email    |
| password | string | Update user password |

Response:

```
{
  status: string;
}
```

### GET /user/{name}

Response:

```
{
  status: string;
  name: string;
  url: string;
  drawings: [{
    id: UUID;
    url: string;
  }]
}
```

## Drawing Endpoint

