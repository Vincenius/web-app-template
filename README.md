# Web App Template

[Demo](https://web-app-template-six.vercel.app/)

🔒 Authentication logic using next-auth/react

📈 User creation stored in MongoDB

🎨 A landing page, authentication pages and a logged in view created with MaterialUI

✉️ Reset password logic and email sending with nodemailer

## Setup

- install all dependencies with `npm install`

- set the neccessary environment variables by creating a file `.env.local` with following contents

```
NEXTAUTH_URL=http://localhost:3000 # or your url
NEXTAUTH_SECRET=some-secret # for authentication
SALT_ROUNDS=10 # for hashing the passwords

MONGODB_USER=mongouser # mongodb username
MONGODB_PASSWORD=password # mongodb password
MONGODB_DATABASE=database # mongodb database
MONGODB_COLLECTION=users # mongodb collection

EMAIL_USERNAME=you@webapp.com # email sender
EMAIL_PASSWORD=yourpassword # email sender password
```


## License
[MIT](https://choosealicense.com/licenses/mit/)


---


*created by [Vincent Will](https://twitter.com/wweb_dev)*
