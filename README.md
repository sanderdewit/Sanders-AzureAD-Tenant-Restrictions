# Sanders-EntraID-Tenant-Restrictions
### Edge version: [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/sanders-entraid-tenant-re/gccmeeiieginkomhjdjaecdfnheadigo)

### Chrome version: [Google Chrome Webstore](https://chrome.google.com/webstore/detail/sanders-entraid-tenant-re/pdhbkciflmjaidfjlanomanbimnbpimj?hl=en)

This is a browser extension that leverage Microsoft EntraID Tenant Restrictions V2
It uses the declarativeNetRequest API which is more privacy friendly than the webrequest API.

The extension got updated to leverage [tenant restrictions v2](https://learn.microsoft.com/en-us/azure/active-directory/external-identities/tenant-restrictions-v2)

What does this extension do?

It injects a header into the following URLs, just like a break-inspect proxy would do, only it does this via a browser extension.
- login.microsoftonline.com, login.microsoft.com, login.windows.net, login.live.com
  - sec-Restrict-Tenant-Access-Policy:  [tenant-id]:[policy-guid]

This header controls to which tenants users are allowed to authenticate. Cross-Tenant Access Settings offers 3 type of configurations:
* inbound access, users incoming to your tenant (guest users in your tenant)
* outbound access, users using the corporate identity going towards other tenants (guest users in the other tenants)
* tenant restrictions, users signing in with non-corporate credentials to other tenants. This extension targets this option, as the other settings are already controlled natively via EntraID.

  More information regarding [azuread tenant restriction v2](https://learn.microsoft.com/en-us/azure/active-directory/external-identities/tenant-restrictions-v2)
  
  Please note, this only resolves the issue for the Edge/Chrome browser.
  To control this for applications (without a proxy), please use the relevant GPO/Policies settings available for Teams, OneDrive, Outlook etc.
  This extension is not enabled by default for InPrivate/Incognito session. Block InPrivate/InCognito if you want to enforce this.


## ChangeLog
V0.27
- Fixed a bug that if no options were set, it would inject the header with undefined:undefined. 
- added the options screen when clicking on the extension for easier access.
- updated the ADMX to support both Edge & Chrome
- added plist files to enforce policies for MacOS

## Instructions
### Setting up EntraID
To set-up Tenant Restrictions V2:
-	Go to entraID (https://entra.microsoft.com), select External Identities, Cross-tenant access settings. Default settings and select Tenant restrictions (preview). Edit tenant restrictions preview) – tenant restrictions settings or use [this direct link](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantRestrictions.ReactView/isDefault~/true/name//id/).
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/0fa485a1-0406-4237-a0f9-63081e887efe)
Take a note of the tenantID and policyGUID displayed as we need them to set-up the policy

### Setting up Intune
#### Windows
Go to into intune.microsoft.com and to devices.
There select configuration under managed devices and select import admx.
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/dcfcf39f-a1a4-4676-b57a-76002ac9fc26)

Import windows.admx (with windows.adml) if you don’t have it available, download it here;
Download Administrative Templates (.admx) for Windows 11 2022 Update (22H2) from Official Microsoft Download Center
It’s installs in C:\Program Files (x86)\Microsoft Group Policy\Windows 11 September 2022 Update (22H2)\PolicyDefinitions
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/52841f1f-cf05-4a61-8a1f-6543e062036c)

As this is a prerequisite for SandersEntraID.admx
The upload will take a while.
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/71f65128-3f81-4754-b02c-9ef273479666)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/cc9a5cc3-ec48-4bdc-aa3c-f6d7312aee0a)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/6c897a3f-827b-4a74-a415-7b7d8ba57b71)
After this, do the same for SandersEntraID.admx & adml.
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/8726ba05-0d38-4443-a7b1-9fcb1ee2bbd1)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/236c334d-5b0a-4550-b53a-77ef73610f30)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/87733a62-37da-4bd2-958f-490869564096)
 
Now create a now policy under Configuration, Policies, Create profile, Win10 and later, Templates, Imported Administrative templates (preview)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/22d71341-a77e-455e-a215-4aedd9f66095)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/2554cf1c-b42f-4a72-a82f-1cb959ae45d9)

Go to user configuration
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/9a92b4f3-aba9-4d8f-9fb8-99abd1654d61)
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/52ce72b3-516d-4f87-a206-c303e3932d30)
 
Set policyGUID and tenantID policies
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/edf108fd-f723-40da-b2f9-458f7fd59dc7)

Assign it to users;
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/ac53c406-a368-4568-9681-4cdbe6c7afc7)

And it will be configured and enforced
![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/bed134a5-daf1-44b1-a597-c99eaed89f92)

#### MacOS

Go to Intune, MacOS, Templates, Preference file.
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/6e781fc8-f79b-411a-9703-dbc83497299d)

Download the edge.plist & chrome.plist and modify it;
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/2bc1292d-b583-4525-bb4f-b692cdbc062f)

Modify the entries under string to reflect the tenantID & policyGUID.
Save the file and upload it.
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/0aab27a3-e826-46f0-a71b-2d5629f8821a)

The preference domain name for edge is: com.microsoft.Edge.extensions.gccmeeiieginkomhjdjaecdfnheadigo (case sensitive)
And for Chrome is:
com.microsoft.Chrome.extensions.pdhbkciflmjaidfjlanomanbimnbpimj (case sensitive)
After the upload, please assign it to users.

### FAQ.
1.	Does this work in Inprivate?
No it does not due to the way Chromium handles extensions.
So make sure to disable inPrivate and incognito for the browsers if you want it to be enforced.

2.	Will it work outside the browser?
As it’s a browser extension, it will only work from within the browser. Policies can be set to aut install and enforce this extension. To have similar protection outside of the browser, please refer to Tenant Restrictions proxy TLS break-inspect methods which opens the EntraID authentication traffic and inject the header there. The Windows based injection option is currently possible, but will be discontinued as it causes issues with .NET applications.

3.	Will this work on MacOS?
Yes it does work on MacOS, please follow the instructions for Plist files, so that the browser can enforce these.

4.	Do you collect any data?
I’m not collecting any data from this add-on, the source code is openly available on Github.

6.	I don’t want to block my users, will this still add value?
Yes, once you enabled this extension, your EntraID audit logs will also show other m365 tenant for sign-ins.
 ![image](https://github.com/sanderdewit/Sanders-AzureAD-Tenant-Restrictions/assets/30201578/52f255cc-d488-401c-9720-b30a888a9e70)

It will be available in the EntraID workbooks and specifically the Tenant restriction insights, as you can see in the screenshot above. 

6.	I’m using this extension, however my users can still logon with their corporate accounts to external tenants.
This is expected behaviour, as this is configured in the outbound access settings under the cross-tenant settings. This extensions addresses authentication towards M365 environments with other than your own corporate credentials.

7. Why not just use the Windows integration that is native to tenant restrictions v2?
Microsoft has discontinued this and it does not work on other operating systems.

### Setting up GPO
just upload the ADMX & ADML in the policydefinitions folder and configure accordingly.
