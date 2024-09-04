# Certhis Tracking Script

This script enables tracking events such as clicks and page views using the Certhis API. It also captures referrer information and script parameters to send tracking data to the API.

## Features

- Automatically tracks clicks on page elements.
- Tracks page views.
- Captures information about the clicked element (ID, CSS classes, text).
- Sends events to the Certhis API with required parameters: `collectionIndex` and `providerId`.
- Records optional additional information such as wallet address and signed message.

## Installation

To use this script, add the following code to your HTML page:

```html
<script src="https://code.certhis.io/v1/tracking.js" data-collection-index="YOUR_COLLECTION_INDEX" data-provider-id="YOUR_PROVIDER_ID"></script>