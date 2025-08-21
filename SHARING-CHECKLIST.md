
# Code Sharing Security Checklist

Before sharing this repository with external parties, ensure:

## ✅ Environment & Secrets
- [ ] All sensitive environment variables moved to GitHub Secrets
- [ ] `.env` files are gitignored and not committed
- [ ] Database URLs and API keys are removed from code

## ✅ Data Protection
- [ ] No real user data in repository
- [ ] Database backups are excluded from git
- [ ] Security logs are removed or sanitized

## ✅ Personal Information
- [ ] No personal email addresses in commit history
- [ ] No personal API keys or credentials
- [ ] No internal company references

## ✅ Security Code
- [ ] IP tracking code is sanitized or replaced with placeholders
- [ ] Security event logging is anonymized
- [ ] User behavior analytics are removed

## ✅ File Cleanup
- [ ] Run `npm run sanitize-for-sharing` script
- [ ] Check `.gitignore` is comprehensive
- [ ] Verify no sensitive files are tracked

## Safe to Share ✅

Once all items are checked, the repository is safe to share with external collaborators.
</new_str>
