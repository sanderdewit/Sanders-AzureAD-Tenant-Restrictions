# Sanders-EntraID-Tenant-Restrictions
This is about an Edge extension that will do the following.
It uses the declarativeNetRequest API which is a bit more privacy friendly than the webrequest API.

Updated to leverage tenant restrictions v2.

It will inject headers for:

- login.microsoftonline.com, login.microsoft.com, login.windows.net, login.live.com
  - sec-Restrict-Tenant-Access-Policy:  [tenant-id]:[policy-guid]
  
  More information regarding azuread tenant restriction v2
  [https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/tenant-restrictions](https://learn.microsoft.com/en-us/azure/active-directory/external-identities/tenant-restrictions-v2)
  
  Please note, this only resolves the issue for the Edge browser.
  Please use the policies (GPO/Settings catalog) to limit OneDrive, Outlook, Teams etc to a single tenant.
  This extension is not enabled by default for InPrivate/Incognito session. Disable InPrivate/InCognito if that's a requirement.
