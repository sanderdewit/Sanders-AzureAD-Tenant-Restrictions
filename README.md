# Sanders-EntraID-Tenant-Restrictions
Edge version: [https://microsoftedge.microsoft.com/addons/detail/sanders-entraid-tenant-re/gccmeeiieginkomhjdjaecdfnheadigo]

Chrome version: [https://chrome.google.com/webstore/detail/sanders-entraid-tenant-re/pdhbkciflmjaidfjlanomanbimnbpimj?hl=en]


This is a browser extension that leverage Microsoft EntraID Tenant Restrictions V2
It uses the declarativeNetRequest API which is more privacy friendly than the webrequest API.

The extension got updated to leverage tenant restrictions v2.

It will inject headers for:

- login.microsoftonline.com, login.microsoft.com, login.windows.net, login.live.com
  - sec-Restrict-Tenant-Access-Policy:  [tenant-id]:[policy-guid]
  
  More information regarding azuread tenant restriction v2
  [https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/tenant-restrictions](https://learn.microsoft.com/en-us/azure/active-directory/external-identities/tenant-restrictions-v2)
  
  Please note, this only resolves the issue for the Edge/Chrome browser.
  Please use the policies (GPO/Settings catalog) to limit OneDrive, Outlook, Teams etc to a single tenant.
  This extension is not enabled by default for InPrivate/Incognito session. Disable InPrivate/InCognito if that's a requirement.

Please see the extensions_instructions.pdf on how to set-up the central policies. Once you have policies configured, they override the local settings.
I'm working on an webapp that will set it up for you.


V0.27
- Fixed a bug that if no options were set, it would inject the header with undefined:undefined
- added the options screen when clicking on the extension for easier access.
- updated the ADMX to support both Edge & Chrome
- added plist files to enforce policies for MacOS
