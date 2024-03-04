# useTsAnalytics Hook

**NOT PUBLISHED - UNDER DEVELOPMENT**

The `useTsAnalytics` is a custom hook that makes it easy to integrate TsAnalytics into your React components. It provides an instance of TsAnalytics, allowing you to track events easily and efficiently in your application.

## Installation

To install `ts-analytics` and use `useTsAnalytics` in your React project, run the following command:

```bash

npm install ts-analytics

```

or

```bash

yarn add ts-analytics

``` 

## Usage

To get started with useTsAnalytics, import and call it in any React component where you want to track events. Here's an example of how to use it in a Profile component:

### AnalyticsProvider Component
The AnalyticsProvider component is a React component designed to simplify the integration of analytics tools into your application. It manages the addition and removal of listeners for important events such as page scrolling and user exit, making it easier to track analytical data.

Wrap the part of your application that you want to track with the AnalyticsProvider component. Provide the necessary analytics information, such as the URL of the analytics server, as props to the component.

```typescript

import { AnalyticsProvider } from 'ts-analytics';

function App() {
  return (
    <AnalyticsProvider analytics={{ url: 'ws://localhost:8080' }}>
      {/* Your application components */}
    </AnalyticsProvider>
  );
}

```

### Props
analytics: Object containing information about analytics, such as the: URL of the analytics server and additional data to be tracked.

### Features
- Automatically adds and removes listeners for important events such as page access, scrolling and page exit.
- Tracks analytics data efficiently and accurately.
- Helps prevent memory leaks and other lifecycle-related issues.

```typescript

'use client';

import React from 'react';
import { useTsAnalytics } from 'ts-analytics';

export default function Page() {

    const analytic = useTsAnalytics('ws://localhost:8080');

    const handleClick = () => {
        analytic.track({ eventName: 'clicked', data: { echo: 'hello' } });
    };

    return (
        <div>
            <h1>Item Page</h1>
            <button onClick={handleClick}>Track Event</button>
        </div>
    )
}

```


## Item Page

On click to buy, send info about item

```typescript

'use client';

import React from 'react';
import { useTsAnalytics } from 'ts-analytics';

export default function ItemPage() {

    const analytic = useTsAnalytics('ws://localhost:8080');

    const buyClick = () => {
        analytic.itemLoad({
            data: { 
                itemId: '001', 
                itemName: 'my item', 
                itemPrice: 'U$ 4.52',
                itemShipping: 'U$ 2.11'
            }
        });
    }

    return (
        <div>
            <h1>Item Page</h1>
            <button onClick={buyClick}>Buy Item</button>
        </div>
    )
}

```
