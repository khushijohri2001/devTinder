# devTinder

### authRouter
- POST /signup ✅
- POST /login ✅
- POST /logout ✅

### profileRouter
- PATCH /profile/edit ✅
- GET /profile/view ✅
- DELETE /profile/remove ✅
- PATCH /profile/password ✅

### connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- PATCH /request/send/edit/:userId
- POST /request/receive/accepted/:userId
- POST /request/receive/rejected/:userId
- PATCH /request/receive/remove/:userId


### userRouter
- GET /user/feed
- GET explore/category
- GET /user/connections
- GET /user/requests/recieved
