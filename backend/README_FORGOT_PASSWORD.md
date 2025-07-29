# Forgot Password Setup Guide

## Overview
The forgot password system now supports real SMS and email verification codes. Users can choose to receive verification codes via email or phone number.

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file in the backend directory with the following variables:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio Configuration (SMS)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2. Gmail Setup (for Email)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password":
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in `EMAIL_PASS`

### 3. Twilio Setup (for SMS)
1. Create a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token from the Twilio Console
3. Get a Twilio phone number for sending SMS
4. Add these credentials to your `.env` file

### 4. Database Requirements
Make sure your User model has these fields:
- `email` (for email verification)
- `phone` (for SMS verification)
- `password` (for storing hashed passwords)

### 5. API Endpoints

#### Send Verification Code
```
POST /api/forgot-password/send-code
Body: {
  "contactType": "email" | "phone",
  "contactValue": "user@example.com" | "+1234567890"
}
```

#### Verify Code
```
POST /api/forgot-password/verify-code
Body: {
  "contactValue": "user@example.com" | "+1234567890",
  "verificationCode": "123456"
}
```

#### Reset Password
```
POST /api/forgot-password/reset-password
Body: {
  "contactValue": "user@example.com" | "+1234567890",
  "verificationCode": "123456",
  "newPassword": "newpassword123"
}
```

## Features

### ✅ Real SMS/Email Verification
- Sends actual verification codes via SMS or email
- 6-digit numeric codes
- 10-minute expiration time

### ✅ Security Features
- Codes are stored in memory (use Redis in production)
- Automatic code expiration
- Password hashing with bcrypt
- Input validation and sanitization

### ✅ User Experience
- Multi-step process (contact → code → password)
- Resend functionality with countdown
- Responsive design
- Error handling and user feedback

### ✅ Demo Mode
If you don't want to set up real SMS/email services, the system will work with:
- Any valid email format for email verification
- Any valid phone number format for SMS verification
- Any 6-digit code will be accepted for verification

## Testing

### Test with Real Services
1. Set up Gmail and Twilio credentials
2. Create a user account with email/phone
3. Test the forgot password flow

### Test in Demo Mode
1. Use any valid email format (e.g., test@example.com)
2. Use any valid phone format (e.g., +1234567890)
3. Enter any 6-digit code for verification

## Troubleshooting

### Email Not Sending
- Check Gmail app password is correct
- Ensure 2-factor authentication is enabled
- Check if "Less secure app access" is enabled (if using older method)

### SMS Not Sending
- Verify Twilio credentials are correct
- Check if the phone number is in the correct format
- Ensure you have sufficient Twilio credits

### Backend Errors
- Check if all dependencies are installed: `npm install`
- Verify database connection
- Check server logs for detailed error messages

## Production Considerations

1. **Use Redis** instead of in-memory storage for verification codes
2. **Rate limiting** to prevent abuse
3. **Environment-specific** email/SMS providers
4. **Monitoring and logging** for failed attempts
5. **HTTPS** for all API calls
6. **Input validation** and sanitization 