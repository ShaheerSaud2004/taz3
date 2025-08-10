# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to make your contact form functional and send emails to Majidtaseen@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. **Add Email Service:**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose "Gmail" (or your preferred email provider)
   - Connect your Gmail account
   - Note down the **Service ID** (e.g., `service_abc123`)

2. **Alternative: Use Gmail SMTP:**
   - If you prefer, you can use Gmail SMTP
   - Service ID will be something like `gmail`

## Step 3: Create Email Template

1. **Go to Email Templates:**
   - In your dashboard, click "Email Templates"
   - Click "Create New Template"

2. **Template Content:**
   - **Name:** Contact Form Template
   - **Subject:** New Contact Form Submission from {{name}}
   - **Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    
    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Company:</strong> {{company}}</p>
    <p><strong>Project Type:</strong> {{projectType}}</p>
    
    <h3>Message:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><em>This message was sent from your website contact form.</em></p>
</body>
</html>
```

3. **Save Template:**
   - Click "Save"
   - Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. **Go to Account:**
   - In your dashboard, click on your profile/account
   - Go to "API Keys"
   - Copy your **Public Key** (e.g., `user_abc123def456`)

## Step 5: Update Your Code

1. **Open `script.js`**
2. **Find these lines:**
```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

3. **Replace with your actual values:**
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your actual template ID
const EMAILJS_PUBLIC_KEY = 'user_abc123def456'; // Your actual public key
```

## Step 6: Test Your Form

1. **Open your website**
2. **Fill out the contact form**
3. **Submit the form**
4. **Check your email** (Majidtaseen@gmail.com)
5. **Check the browser console** for any error messages

## Troubleshooting

### Common Issues:

1. **"EmailJS not loaded" error:**
   - Make sure the EmailJS script is loading properly
   - Check your internet connection

2. **"Failed to send message" error:**
   - Verify your Service ID, Template ID, and Public Key
   - Check if your email service is properly connected
   - Look at the browser console for detailed error messages

3. **Emails not received:**
   - Check your spam folder
   - Verify the email template is correct
   - Make sure your email service is active

### Testing:

1. **Use the EmailJS dashboard to send test emails**
2. **Check the EmailJS logs for delivery status**
3. **Verify your email service connection**

## Security Notes

- **Public Key:** This is safe to expose in your frontend code
- **Service ID & Template ID:** These are also safe to expose
- **Rate Limits:** Free accounts have limits (200 emails/month)
- **Spam Protection:** EmailJS includes built-in spam protection

## Alternative Solutions

If EmailJS doesn't work for you, consider:

1. **Formspree:** Simple form handling service
2. **Netlify Forms:** If hosting on Netlify
3. **Backend API:** Custom backend solution
4. **Google Forms:** Embed Google Forms

## Support

- **EmailJS Documentation:** [docs.emailjs.com](https://docs.emailjs.com/)
- **EmailJS Support:** Available in your dashboard
- **Community:** EmailJS has an active community forum

---

**Important:** After setting up EmailJS, your contact form will send real emails to Majidtaseen@gmail.com. Make sure to test thoroughly before going live! 