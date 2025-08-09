# Google Tag Manager Setup Guide

## 🎯 Your GTM Container ID: `GTM-PTFRDGS3`

## 📋 Tags to Configure in GTM

### 1. Google Analytics 4
- **Tag Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: `G-XXXXXXXXXX` (get this from Google Analytics)
- **Trigger**: All Pages

### 2. Google Ads
- **Tag Type**: Google Ads: Conversion Tracking
- **Conversion ID**: `AW-17449356340`
- **Conversion Label**: Your conversion labels from Google Ads
- **Trigger**: Custom events (sign-ups, pricing page visits)

### 3. LinkedIn Insight Tag
- **Tag Type**: Custom HTML
- **Code**:
```html
<script type="text/javascript">
_linkedin_partner_id = "7556476";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
```
- **Trigger**: All Pages

### 4. RB2B Pixel (when you have the ID)
- **Tag Type**: Custom HTML
- **Code**: (will be provided when you have RB2B Pixel ID)
- **Trigger**: All Pages

## 🔧 How to Add Tags in GTM

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Select your container: `GTM-PTFRDGS3`
3. Click **"Tags"** in the left sidebar
4. Click **"New"** to create a new tag
5. Choose the tag type and configure as above
6. Set up triggers (All Pages, or custom events)
7. Click **"Save"**
8. Click **"Submit"** to publish changes

## 📊 Benefits of GTM

- ✅ **Centralized Management**: All tags in one place
- ✅ **Easy Updates**: No code changes needed
- ✅ **Version Control**: Track all changes
- ✅ **Preview Mode**: Test before publishing
- ✅ **Better Performance**: Optimized loading

## 🚀 Next Steps

1. Set up Google Analytics 4 and get your Measurement ID
2. Configure the tags above in GTM
3. Test with GTM Preview mode
4. Publish your container
5. Add RB2B Pixel when you have the ID

## 📞 Need Help?

- GTM Help: [support.google.com/tagmanager](https://support.google.com/tagmanager)
- Google Analytics: [support.google.com/analytics](https://support.google.com/analytics) 