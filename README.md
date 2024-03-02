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


## Main Page

```typescript

'use client';

import React from 'react';
import { useTsAnalytics } from 'ts-analytics';

export default function Home() {

    const analytic = useTsAnalytics('ws://localhost:8080');

    analytic.trackAppAccess({
        appName: 'portfolio',
        data: { itemId: '001', itemName: 'project-001' }
    });

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleClick}>Track Access</button>
        </div>
    )
}

```
