# Fam-Photos Client

React application hosted on AWS S3.

## How to deploy

Navigate to local git repo and run the following commands:

```
npm run build
aws s3 sync build s3://paulslev.in
```
