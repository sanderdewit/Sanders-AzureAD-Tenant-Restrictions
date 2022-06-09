# Sanders-AzureAD-Tenant-Restrictions
This is about an Edge extension that will do the following.
It uses the declarativeNetRequest API which is a bit more privacy friendly than the webrequest API.


It will inject headers for:

- login.microsoftonline.com, login.microsoft.com, login.windows.net
  - Restrict-Access-To-Tenants:  [tenant-id], [tenant id] etc... This list the tenants that the user is allowed to authenticate too.
  you can leverage contoso.com,fabrikam.onmicrosoft.com,72f988bf-86f1-41af-91ab-2d7cd011db47 as possible types of values. I do recommend using the tenant-id. (whatismytenantid.com)
  - Restrict-Access-Context: [tenant-id] This tells which tenant is setting the tenant restrictions. This enables the signin logs into the tenant.
- login.live.com
  - sec-Restrict-Tenant-Access-Policy: restrict-msa. This tells the Microsoft account platform to not allow users to sign in to consumer applications.
  
  
  More information regarding azuread tenant restriction
  https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/tenant-restrictions
  
  Please note, this only resolves the issue for the Edge browser.
  Please use the policies (GPO/Settings catalog) to limit OneDrive, Outlook, Teams etc to a single tenant.
  
 
Requirements:
  Modern authentication needs to be enabled!
