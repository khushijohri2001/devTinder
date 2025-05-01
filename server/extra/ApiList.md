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
- POST /request/send/:status/:userId  (interested or ignored) ✅
- PATCH /request/send/edit/:userId

- POST /request/review/:status/:userId  (accepted or rejected) ✅
- PATCH /request/review/remove/:userId


### userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed
- GET explore/category

