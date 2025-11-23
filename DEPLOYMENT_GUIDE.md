# 🚀 PixelForge Studio - Supabase Deployment Guide

Complete guide to deploying your migrated Supabase full-stack application.

---

## 📋 Pre-Deployment Checklist

Before you begin, ensure you have:

- ✅ Supabase account (free tier works)
- ✅ Resend account for email (free tier: 100 emails/day)
- ✅ Existing ImageKit account credentials
- ✅ Database backup files in `db_backup/` folder
- ✅ Node.js 18+ installed
- ✅ Git repository ready

---

## 🎯 Step-by-Step Deployment

### **Step 1: Create Supabase Project**

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name:** PixelForge Studio
   - **Database Password:** (generate a strong password and save it)
   - **Region:** Choose closest to your users (e.g., Mumbai for India)
4. Wait for project creation (~2 minutes)

### **Step 2: Set Up Database Schema**

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click "New Query"
4. Copy the entire contents of `supabase/migrations/20250123_initial_schema.sql`
5. Paste into the SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`
7. Verify success:
   - Check **Table Editor** → You should see 4 tables: `users`, `categories`, `products`, `inquiries`
   - Check **Database** → **Functions** → You should see `get_products_with_category`, `generate_inquiry_reference`

**Troubleshooting:**
- If you see "extension uuid-ossp does not exist", run: `CREATE EXTENSION "uuid-ossp";`
- If RLS errors occur, ensure you're running as the project owner

### **Step 3: Install Dependencies**

```bash
npm install
```

This will install:
- `@supabase/supabase-js@^2.48.1` - Supabase client
- `tsx@^4.19.2` - TypeScript execution for migration script

### **Step 4: Configure Environment Variables**

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Get your Supabase credentials:
   - Go to **Project Settings** → **API**
   - Copy **Project URL** → Set as `VITE_SUPABASE_URL`
   - Copy **anon/public key** → Set as `VITE_SUPABASE_ANON_KEY`
   - Copy **service_role key** → Set as `SUPABASE_SERVICE_ROLE_KEY` (for migration only)

3. Add your ImageKit credentials:
   - Get from [https://imagekit.io/dashboard/developer/api-keys](https://imagekit.io/dashboard/developer/api-keys)
   - Set `VITE_IMAGEKIT_PUBLIC_KEY`
   - Set `VITE_IMAGEKIT_URL_ENDPOINT`
   - Set `IMAGEKIT_PRIVATE_KEY`

4. Your `.env` should look like:
   ```env
   VITE_SUPABASE_URL=https://abc123xyz.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   VITE_IMAGEKIT_PUBLIC_KEY=public_abc123
   VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/178765/
   IMAGEKIT_PRIVATE_KEY=private_xyz789
   ```

### **Step 5: Migrate Data from MongoDB**

Run the migration script to transfer your existing data:

```bash
npm run migrate
```

**Expected Output:**
```
🚀 Starting PixelForge Studio Data Migration
==========================================
Supabase URL: https://your-project.supabase.co

📁 Migrating categories...
✅ Migrated 4 categories
   - Photo Magnets (active)
   - Fridge Magnets (inactive)
   - Retro Prints (active)
   - Calender (active)

📦 Migrating products...
✅ Migrated 6 products
   - Ganpati Magnets (₹500) - 5 images
   - Wedding Magnets (₹129) - 4 images
   ...

👥 Migrating users...
✅ Migrated user: admin@pfs.in (ADMIN)
✅ Migrated user: sp@gmail.com (USER)
...

🔍 Verifying migration...
✅ Categories: 4 records
✅ Products: 6 records
✅ Users: 4 records

✅ Product-Category relationships verified:
   - Ganpati Magnets → Photo Magnets
   - Wedding Magnets → Calender
   ...

==========================================
✅ Migration completed successfully!
```

**Troubleshooting:**
- **Error: Missing environment variables** → Check your `.env` file
- **Error: Failed to create auth user** → Check service role key permissions
- **Error: Foreign key violation** → Categories must be migrated before products

**Important Notes:**
- Users will have temporary passwords and need to reset them
- ImageKit URLs remain unchanged (no image migration needed)
- Reference the Supabase dashboard to verify all data

### **Step 6: Set Up Email Service (Resend)**

1. Sign up at [https://resend.com](https://resend.com)
2. Get your API key from [https://resend.com/api-keys](https://resend.com/api-keys)
3. Add to Supabase Edge Functions secrets:
   ```bash
   # Install Supabase CLI first (if not installed)
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Link to your project
   supabase link --project-ref your-project-ref

   # Set secrets
   supabase secrets set RESEND_API_KEY=re_abc123xyz789
   supabase secrets set ADMIN_EMAIL=admin@pfs.in
   supabase secrets set FROM_EMAIL=support@pixelforgestudio.in
   ```

**Alternatively, set via Dashboard:**
1. Go to **Project Settings** → **Edge Functions** → **Secrets**
2. Add:
   - `RESEND_API_KEY`: your Resend API key
   - `ADMIN_EMAIL`: admin@pfs.in
   - `FROM_EMAIL`: support@pixelforgestudio.in

### **Step 7: Deploy Edge Function**

**Option A: Using Supabase CLI (Recommended)**

```bash
# Deploy the email function
supabase functions deploy send-inquiry-email

# Test the function
supabase functions invoke send-inquiry-email \
  --body '{"inquiry":{"first_name":"Test","last_name":"User","email":"test@example.com","subject":"Test","message":"This is a test message","reference_id":"INQ-20250123-1234"}}'
```

**Option B: Using Supabase Dashboard (2025 Feature)**

1. Go to **Edge Functions** in your Supabase dashboard
2. Click "Create Function"
3. Name: `send-inquiry-email`
4. Copy contents of `supabase/functions/send-inquiry-email/index.ts`
5. Paste into the editor
6. Click "Deploy Function"
7. Test using the built-in function tester

**Verify Deployment:**
- You should see the function listed in **Edge Functions**
- Status should be "Active"
- Test with the built-in tester to ensure emails send

### **Step 8: Configure Email Domain (Optional but Recommended)**

For production email delivery:

1. **Add Domain to Resend:**
   - Go to [https://resend.com/domains](https://resend.com/domains)
   - Add your domain (e.g., `pixelforgestudio.in`)
   - Add the DNS records shown to your domain provider
   - Verify domain

2. **Update FROM_EMAIL:**
   ```bash
   supabase secrets set FROM_EMAIL=noreply@yourdomain.com
   ```

Without a verified domain, emails will be sent from Resend's test domain (limited to 100/day).

### **Step 9: Test the Application Locally**

```bash
# Start development server
npm run dev
```

**Test these features:**
1. ✅ Homepage loads with categories
2. ✅ Gallery shows products
3. ✅ Product detail page loads
4. ✅ Contact form submits successfully
5. ✅ Email notifications received

**Check Developer Console:**
- No Supabase connection errors
- API calls complete successfully
- No CORS errors

### **Step 10: Deploy Frontend**

**For Vercel:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
# Project Settings → Environment Variables:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_IMAGEKIT_PUBLIC_KEY
# - VITE_IMAGEKIT_URL_ENDPOINT
```

**For Netlify:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify Dashboard
# Site Settings → Environment Variables
```

**For other platforms:**
- Ensure environment variables are set
- Build command: `npm run build`
- Output directory: `build`

### **Step 11: Update CORS Settings (if needed)**

If you encounter CORS errors:

1. Go to **Project Settings** → **API** → **CORS Configuration**
2. Add your domain: `https://yourdomain.com`
3. Save changes

### **Step 12: Set Up Row Level Security (RLS) Testing**

Test RLS policies to ensure data security:

1. **Test Public Access (No Auth):**
   - Visit gallery page → Products should load
   - Visit product detail → Should load
   - Submit contact form → Should work

2. **Test Admin Access (Optional - if implementing auth):**
   - Login as admin
   - Should see all products (including locked)
   - Should be able to manage data

### **Step 13: Monitor and Verify**

1. **Check Supabase Dashboard:**
   - **Database** → **Table Editor** → Verify data is present
   - **Edge Functions** → Check invocation logs
   - **Logs** → Monitor for errors

2. **Check Email Delivery:**
   - Submit a test inquiry
   - Verify admin receives notification
   - Verify customer receives confirmation
   - Check Resend dashboard for delivery status

3. **Performance Monitoring:**
   - **API** → **Performance** → Check query times
   - **Edge Functions** → **Metrics** → Check invocation times

---

## 🔐 Security Best Practices

### **Protect Your Keys:**
- ✅ **NEVER** commit `.env` to Git
- ✅ **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ✅ **NEVER** expose `IMAGEKIT_PRIVATE_KEY` to frontend
- ✅ Only use `VITE_*` prefixed variables in frontend code

### **Row Level Security:**
- ✅ All tables have RLS enabled
- ✅ Public can read products and categories
- ✅ Only admins can modify data
- ✅ Anyone can submit inquiries

### **API Security:**
- ✅ Use anon key for frontend (has RLS protection)
- ✅ Service role key only for server-side operations
- ✅ Edge Functions validate input data
- ✅ CORS configured for your domain only

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Gallery displays all products
- [ ] Product detail pages work
- [ ] Contact form submits successfully
- [ ] Admin receives inquiry emails
- [ ] Customer receives confirmation emails
- [ ] Images load from ImageKit
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] Performance is acceptable (< 3s load time)

---

## 🆘 Troubleshooting

### **Issue: "Missing Supabase environment variables"**
**Solution:** Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in `.env`

### **Issue: "Failed to fetch products"**
**Solution:**
1. Check Supabase connection in dashboard
2. Verify RLS policies are correct
3. Check browser console for errors
4. Verify data exists in Table Editor

### **Issue: "Email not sending"**
**Solution:**
1. Check Edge Function logs in Supabase dashboard
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard for errors
4. Verify email addresses are valid

### **Issue: "CORS error"**
**Solution:**
1. Add your domain to CORS configuration in Supabase
2. Verify frontend is using correct Supabase URL
3. Check that you're using anon key (not service role key) in frontend

### **Issue: "Row Level Security violation"**
**Solution:**
1. Check that RLS policies were created correctly
2. Verify user permissions in database
3. Test queries in SQL Editor to debug

### **Issue: "Images not loading"**
**Solution:**
1. Verify ImageKit credentials are correct
2. Check that image URLs in database are valid
3. Test ImageKit URL directly in browser

---

## 📈 Performance Optimization

### **Database Optimization:**
- Indexes created on frequently queried columns
- Use `select` to fetch only needed fields
- Implement pagination for large datasets

### **Edge Functions:**
- Functions are stateless and auto-scale
- Cold start time: ~300ms (2025 improvement: 300% faster)
- Keep function code minimal

### **Frontend:**
- Use React.lazy() for code splitting
- Implement image lazy loading
- Cache API responses where appropriate

---

## 🔄 Rollback Plan

If migration fails, you can rollback:

1. **Keep FastAPI backend running** during transition period
2. **Switch `.env` back:**
   ```env
   VITE_API_BASE_URL=https://pfs-backend-3v9p.onrender.com
   ```
3. **Revert `app/lib/api.ts`** to use FastAPI endpoints
4. **Redeploy frontend**

---

## 📞 Support

If you encounter issues:

1. Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Check Resend documentation: [https://resend.com/docs](https://resend.com/docs)
3. Review `SUPABASE_MIGRATION_GUIDE.md` for detailed technical info
4. Contact support or community forums

---

## ✅ Migration Complete!

Congratulations! Your PixelForge Studio app is now running on Supabase.

**Next Steps:**
1. Monitor performance and errors for first few days
2. Send password reset emails to existing users
3. Set up automated backups (Supabase does this automatically)
4. Consider implementing authentication for admin features
5. Decommission FastAPI backend after verification period

**Benefits You Now Have:**
- ✅ No backend server to maintain
- ✅ Auto-scaling database
- ✅ Built-in authentication (when you need it)
- ✅ Real-time capabilities (future feature)
- ✅ Automatic backups
- ✅ Better developer experience
- ✅ Cost savings

---

Generated for: **PixelForge Studio**
Date: **January 23, 2025**
Migration Type: **MongoDB + FastAPI → Supabase Full-Stack**
